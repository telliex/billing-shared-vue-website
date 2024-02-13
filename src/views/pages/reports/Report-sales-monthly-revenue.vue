<template>
  <PageWrapper dense contentFullHeight>
    <div class="p-4 powerbi-wrap" ref="wrapEl" style="background-color: #fff; height: 100%">
      <div class="container">
        <div class="controls">
          <template v-if="isEmbedded">
            <button @click="changeVisualType('columnChart')" v-if="false">columnChart type</button>
            <button @click="changeVisualType('lineChart')" v-if="false">lineChart type</button>
            <button @click="hideFilterPane(true)" v-if="false">Hide filter pane</button>
            <button @click="hideFilterPane(false)" v-if="false">Show filter pane</button>
            <button @click="setDataSelectedEvent()" v-if="false">Set event</button>
          </template>
          <template v-else>
            <button @click="embedReport()" class="embed-report">Embed Report</button>
          </template>
          <keep-alive>
            <PowerBIReportEmbed
              v-if="isEmbedded"
              :embed-config="currentReportConfig"
              :phased-embedding="phasedEmbeddingFlag"
              :css-class-name="reportClass"
              :event-handlers="eventHandlersMap"
              @report-obj="setReportObj"
            />
          </keep-alive>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup name="SalesMonthlyRevenue">
  import { ref, reactive, onMounted } from 'vue';
  import type { IEmbedConfigurationBase } from 'powerbi-models';
  import { models, Report, IReportEmbedConfiguration, Page, service, Embed } from 'powerbi-client';
  import { IHttpPostMessageResponse } from 'http-post-message';
  import 'powerbi-report-authoring';
  import { Guid } from 'js-guid';
  import { PageWrapper } from '/@/components/Page';
  import {
    GetDictionaryItems,
    GetUserPermission,
    GetUserPermissionRoleList,
    // GetPowerBIFilterValue,
  } from '/@/api/sys/system';
  import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
  import { createLocalStorage } from '/@/utils/cache';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  import { useLoading } from '/@/components/Loading';
  import axios from 'axios';
  import {
    getFinalActiveTime,
    logoutApi,
    writeFinalActiveTime,
    JWTlogoutApi,
  } from '/@/api/sys/user';
  import { checkLoginTimeout } from '/@/utils/tools';

  const wrapEl = ref<ElRef>(null);
  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: 'Loading...',
      absolute: true,
    },
  });

  const ls = createLocalStorage();
  let currentPagePermissionId = null;
  let currentPageReportName = 'sales_monthly_revenue'; // need to change
  let currentPageReportIdKey = 'POWERBI_REVENUEREPORT_REPORTId'; // need to change
  let currentPageTableNameKey = 'POWERBI_REVENUEREPORT_TABLENAME'; // need to change
  // CSS Class to be passed to the wrapper
  const reportClass = `${currentPageReportName}__container`;
  let currentUserId = ls.get('TEMP_USER_ID_KEY__');
  // Flag which specifies whether to use phase embedding or not
  const phasedEmbeddingFlag = false;

  let targetValue = [];
  let report: Report;

  // Handles the embed config response for embedding
  // export interface ConfigResponse {
  //   Id: string;
  //   EmbedUrl: string;
  //   EmbedToken: {
  //     Token: string;
  //   };
  // }

  interface IEmbedConfigurationBaseExtended extends IEmbedConfigurationBase {
    filters?: any[];
  }
  interface ReportExtended extends Report {
    config: IEmbedConfigurationBaseExtended;
  }

  // Track Report embedding status
  let isEmbedded = ref(false);

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  let currentReportConfig = reactive<IReportEmbedConfiguration>({
    type: 'report',
    id: undefined, // Report Id
    embedUrl: undefined, // Embed Url
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: undefined,
  });

  /**
   * Map of event handlers to be applied to the embedded report
   * Update event handlers for the report by redefining the map using this.eventHandlersMap
   * Set event handler to null if event needs to be removed
   * More events can be provided from here
   * https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
   */
  let eventHandlersMap = reactive(
    new Map([
      ['loaded', () => console.log('Report has loaded')],
      [
        'rendered',
        () => {
          console.log('Report has rendered');
          closeWrapLoading();
        },
      ],
      [
        'error',
        (event?: service.ICustomEvent<any>) => {
          if (event) {
            console.error(event.detail);
          }
        },
      ],
      ['visualClicked', () => console.log('visual clicked')],
      ['pageChanged', (event) => console.log(event)],
    ]),
  ) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;

  /**
   * Embeds report
   *
   * @returns Promise<void>
   */
  async function embedReport(): Promise<void> {
    openWrapLoading();

    // get user permission list
    let permissionResult = await GetUserPermission({
      trace_id: Guid.newGuid().toString(),
      BillMasterId: currentUserId,
    });

    if (!permissionResult) {
      createMessage.error('Get permission fail !');
      console.log('Get permission fail.');
      closeWrapLoading();
      return;
    }

    // check the page if the user has permission to view this report
    let isOnPermission = permissionResult[0].data.find(
      (item: any) => item.read.permissionId === currentPagePermissionId && item.read.status === 1,
    );

    if (!isOnPermission) {
      createMessage.error('You do not have permission to view this report !');
      console.log('You do not have permission to view this report.');
      closeWrapLoading();
      return;
    }

    // deal with
    let UserInfo = await getFinalActiveTime();
    if (!UserInfo || UserInfo.length === 0) {
      try {
        await logoutApi();
        await JWTlogoutApi();
      } catch {
        console.log('註銷 Token 失敗');
      }

      return;
    }

    let checkTimeout = checkLoginTimeout(UserInfo[0]);
    if (checkTimeout) {
      await writeFinalActiveTime();
    } else {
      try {
        await logoutApi();
        await JWTlogoutApi();
      } catch {
        console.log('註銷 Token 失敗');
      }
      return;
    }

    // let filterValueResult = await GetPowerBIFilterValue({
    //   userId: currentUserId,
    //   pageName: currentPageReportName,
    // }).catch((err) => {
    //   console.log(err);
    // });
    let filterValueResult: any[] = [];

    let tempRes: any = await axios({
      method: 'post',
      // url: 'https://rgoyovotjqogivdmoth4ut3dsm0jgyhl.lambda-url.us-west-2.on.aws/',
      url: import.meta.env.VITE_GLOB_POWERBI_LAMBDA_API_URL,
      data: {
        userId: currentUserId,
        pageName: currentPageReportName,
        pageIdKey: currentPageReportIdKey,
      },
    }).catch((err) => {
      createMessage.error('Lambda api error!');
      closeWrapLoading();
      console.log(err);
    });

    if (!tempRes) {
      return;
    }

    filterValueResult[0] = tempRes.data;

    if (!filterValueResult[0]?.ok) {
      console.error(`Failed to fetch PowerBI Embed Data. `);
      createMessage.error('Failed to fetch PowerBI Embed Data.');
      closeWrapLoading();
      return;
    }

    //[239,273,384]
    targetValue = filterValueResult[0].userNameList;
    let embedUrl = filterValueResult[0].embedUrl;
    let embedToken = filterValueResult[0].embedToken;
    let reportId = filterValueResult[0].reportId;

    // Update the reportConfig to embed the PowerBI report
    currentReportConfig = {
      ...currentReportConfig,
      id: reportId,
      embedUrl: embedUrl,
      accessToken: embedToken,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
      },
    };

    console.log('currentReportConfig:', currentReportConfig);
    isEmbedded.value = true;
  }

  /**
   * Change visual type
   *
   * @returns Promise<void>
   */
  async function changeVisualType(type: string): Promise<void> {
    // Check Report is available or not
    if (!reportAvailable()) {
      return;
    }

    // Get all the pages of the report
    const pages: Page[] = await report.getPages();

    // Check if the pages are available
    if (pages.length === 0) {
      console.log('No pages found.');
      createMessage.error('No pages found.');
      closeWrapLoading();
      return;
    }

    // Get active page of the report
    const activePage: Page | undefined = pages.find((page) => page.isActive);

    if (!activePage) {
      console.log('No Active page found');
      createMessage.error('No Active page found');
      closeWrapLoading();
      return;
    }

    try {
      // Change the visual type using powerbi-report-authoring
      // For more information: https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/report-authoring-overview
      // Get the visual
      const preVisual = await activePage.getVisualByName('VisualContainer6');
      const response = await preVisual.changeType(type);
      const nextVisual = await activePage.getVisualByName('VisualContainer6');
      console.log('2Visual:', nextVisual);
      console.log(`The ${preVisual.type} was updated to ${nextVisual.type}.`);
      return response;
    } catch (error) {
      if (error === 'PowerBIEntityNotFound') {
        console.log('No Visual found with that name');
        createMessage.error('No Visual found with that name');
      } else {
        console.log(error);
        createMessage.error('Please Contact Administrator');
        closeWrapLoading();
      }
    }
  }

  /**
   * Hide Filter Pane
   *
   * @returns Promise<IHttpPostMessageResponse<void> | undefined>
   */
  async function hideFilterPane(
    isHind: boolean,
  ): Promise<IHttpPostMessageResponse<void> | undefined> {
    // Check whether Report is available or not
    if (!reportAvailable()) {
      closeWrapLoading();
      return;
    }

    // New settings to hide filter pane
    let settings = {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
    };

    if (!isHind) {
      settings = {
        panes: {
          filters: {
            expanded: false,
            visible: true,
          },
        },
      };
    }

    try {
      const response: IHttpPostMessageResponse<void> = await report.updateSettings(settings);
      console.log('Filter pane is hidden.');
      console.log('response:', response);
      return response;
    } catch (error) {
      console.error(error);
      createMessage.error('Please Contact Administrator');
      closeWrapLoading();
      return;
    }
  }

  /**
   * Set data selected event
   *
   * @returns void
   */
  function setDataSelectedEvent(): void {
    eventHandlersMap = new Map<string, (event?: service.ICustomEvent<any>) => void>([
      ...eventHandlersMap,
      ['dataSelected', (event) => console.log(event)],
    ]);
    console.log('Data Selected event set successfully. Select data to see event in console.');
  }

  /**
   * Assign Embed Object from Report component to report
   * @param value
   */
  async function setReportObj(value: ReportExtended) {
    console.log('===report===');
    console.log(value);

    let tableName = await GetDictionaryItems({
      trace_id: Guid.newGuid().toString(),
      request_items: [
        {
          item_type: 'PowerBI',
          item_key: currentPageTableNameKey,
          item_key2: '',
        },
      ],
    });
    if (!tableName) {
      createMessage.error('Failed to fetch PowerBI Parameter Data.');
      closeWrapLoading();
    }

    value.config.filters = [
      {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: tableName[0].response_items[0].itemValue,
          column: 'ecloud_sales',
          report,
        },
        operator: 'In',
        values: targetValue,
        filterType: 1,
        requireSingleSelection: true,
        displaySettings: {
          isHiddenInViewMode: true,
          isLockedInViewMode: true,
        },
      },
    ];
    report = value;
  }

  /**
   * Verify whether report is available or not
   */
  function reportAvailable() {
    if (!report) {
      // Prepare status message for Error
      console.log('Report not available.');
      createMessage.error('Report not available.');
      return false;
    }
    return true;
  }

  onMounted(async () => {
    GetUserPermissionRoleList({
      trace_id: Guid.newGuid().toString(),
      BillMasterId: currentUserId,
    }).then((res) => {
      res[0].data.forEach((item) => {
        if (item.type === currentPageReportName) {
          currentPagePermissionId = item.read.permissionId;
          console.log('currentPagePermissionId:', currentPagePermissionId);
        }
      });
      embedReport();
    });
  });
</script>
<style lang="less">
  .bar-content {
    display: none;
  }

  #reportContainer {
    height: calc(100vh - 100px);
  }

  .powerbi-wrap {
    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .header {
      background: #3476ae 0 0 no-repeat padding-box;
      border: 1px solid #707070;
      color: #fff;
      font: 700 22px/27px 'Segoe UI';
      padding: 13px 13px 13px 36px;
      text-align: left;
    }

    .controls {
      margin-top: 20px;
      text-align: center;
      flex: 1;
      width: 100%;
    }

    button {
      background: #337ab7;
      border: 0;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      height: 35px;
      margin-right: 15px;
      width: 160px;
    }

    .display-message {
      align-items: center;
      display: flex;
      font: 400 18px/27px 'Segoe UI';
      height: 30px;
      justify-content: center;
      margin-top: 8px;
      text-align: center;
    }

    .position {
      margin-top: 40vh;
    }

    .embed-report {
      margin-top: 18px;
      text-align: center;
      margin-right: 0;
    }

    .footer {
      align-items: center;
      background: #f7f8fa 0 0 no-repeat padding-box;
      display: flex;
      font: 400 16px/21px 'Segoe UI';
      height: 42px;
      justify-content: center;
      width: 100%;
    }

    .footer * {
      padding: 0 3px;
    }

    .footer-icon {
      border-radius: 50%;
      height: 22px;
      vertical-align: middle;
    }

    .footer a {
      color: #3a3a3a;
      text-decoration: underline;
    }

    body {
      font-family: 'Segoe UI';
      margin: 0;
    }

    iframe {
      border: none;
    }

    .report-container {
      height: 75vh;
      margin: 8px auto;
      width: 90%;
    }
  }
</style>
