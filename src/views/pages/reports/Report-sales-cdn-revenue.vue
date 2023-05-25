<template>
  <div class="p-4 powerbi-wrap" ref="wrapEl">
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

        <PowerBIReportEmbed
          v-if="isEmbedded"
          :embed-config="currentReportConfig"
          :phased-embedding="phasedEmbeddingFlag"
          :css-class-name="reportClass"
          :event-handlers="eventHandlersMap"
          @report-obj="setReportObj"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { models, Report, IReportEmbedConfiguration, Page, service, Embed } from 'powerbi-client';
  import { IHttpPostMessageResponse } from 'http-post-message';
  import 'powerbi-report-authoring';
  import { Guid } from 'js-guid';
  import {
    GetPowerBIAccessToken,
    GetPowerBIEmbedInfo,
    GetPowerBIEmbedData,
    GetUserPermission,
    GetUserPermissionRoleList,
    GetPowerBIFilterValue,
  } from '/@/api/sys/system';
  import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
  import { createLocalStorage } from '/@/utils/cache';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  import { useLoading } from '/@/components/Loading';
  const wrapEl = ref<ElRef>(null);
  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: 'Loading...',
      absolute: true,
    },
  });

  const ls = createLocalStorage();
  let currentPagePermissionId = 15;
  let currentUserId = ls.get('TEMP_USER_ID_KEY__');
  const reportId = '0b553f33-d174-423a-8da8-ea72d96a404b'; // need to change
  // const tableName = 'sales-revenue-report'; // need to change

  // Flag which specifies whether to use phase embedding or not
  const phasedEmbeddingFlag = false;

  // CSS Class to be passed to the wrapper
  const reportClass = 'report-sales-cdn-revenue__container';

  let report: Report;

  // Handles the embed config response for embedding
  export interface ConfigResponse {
    Id: string;
    EmbedUrl: string;
    EmbedToken: {
      Token: string;
    };
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
    console.log(ls.get('TEMP_USER_ID_KEY__'));
    console.log('Embed Report clicked');

    // get user permission list
    let permissionResult = await GetUserPermission({
      trace_id: Guid.newGuid().toString(),
      BillMasterId: currentUserId,
    }).catch((err) => {
      console.log('err:', err);
    });

    console.log("Current User's permissionList:", permissionResult[0].data);

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

    // Get the embed config from the service and set the reportConfigResponse
    let tokenResponse = await GetPowerBIAccessToken({}).catch((err) => {
      console.log(err);
    });

    // type: 'i-want-embed-token',
    //   reportId: reportId,
    // }).catch((err) => {
    //   console.log(err);
    // });

    console.log('reportConfigResponse-accessToken:', tokenResponse[0].accessToken);

    if (!tokenResponse[0]?.ok) {
      console.error(`Failed to fetch PowerBI Token. `);
      createMessage.error('Failed to fetch PowerBI Token. ');
      closeWrapLoading();
      return;
    }
    let accessToken = tokenResponse[0].accessToken;

    let embedInfoResponse = await GetPowerBIEmbedInfo({
      accessToken: accessToken,
      reportId: reportId,
    }).catch((err) => {
      console.log(err);
    });

    console.log('embedInfoResponse:', embedInfoResponse[0]);

    if (!embedInfoResponse[0]?.ok) {
      console.error(`Failed to fetch PowerBI Embed Info. `);
      createMessage.error('Failed to fetch PowerBI Embed Info.');
      closeWrapLoading();
      return;
    }

    let datasetId = embedInfoResponse[0].datasetId;
    let embed_url = embedInfoResponse[0].embed_url;

    let embedDataResponse = await GetPowerBIEmbedData({
      accessToken: accessToken,
      reportId: reportId,
      datasetId: datasetId,
    }).catch((err) => {
      console.log(err);
    });

    console.log('embedDataResponse:', embedDataResponse[0]);

    if (!embedDataResponse[0]?.ok) {
      console.error(`Failed to fetch PowerBI Embed Data. `);
      createMessage.error('Failed to fetch PowerBI Embed Data.');
      closeWrapLoading();
      return;
    }

    let embedToken = embedDataResponse[0].embedToken;
    // let expiryTime = embedDataResponse[0].expiryTime;

    // Update the reportConfig to embed the PowerBI report
    currentReportConfig = {
      ...currentReportConfig,
      id: reportId,
      embedUrl: embed_url,
      accessToken: embedToken,
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
      return;
    }

    // Get active page of the report
    const activePage: Page | undefined = pages.find((page) => page.isActive);

    if (!activePage) {
      console.log('No Active page found');
      return;
    }

    try {
      // Change the visual type using powerbi-report-authoring
      // For more information: https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/report-authoring-overview
      // Get the visual
      const preVisual = await activePage.getVisualByName('VisualContainer6');
      console.log('1Visual:', preVisual);
      const response = await preVisual.changeType(type);
      const nextVisual = await activePage.getVisualByName('VisualContainer6');
      console.log('2Visual:', nextVisual);
      console.log(`The ${preVisual.type} was updated to ${nextVisual.type}.`);
      return response;
    } catch (error) {
      if (error === 'PowerBIEntityNotFound') {
        console.log('No Visual found with that name');
      } else {
        console.log(error);
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
  async function setReportObj(value: Report) {
    console.log('6666666666');
    console.log(value);

    let filterValueResult = await GetPowerBIFilterValue({
      userId: currentUserId,
    }).catch((err) => {
      console.log(err);
    });
    console.log('filterValueResult:', filterValueResult[0].result);

    //[239,273,384]
    let targetValue = filterValueResult[0].result;
    value.config.filters = [
      {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: 'sales-revenue-report',
          column: 'ecloud_sales',
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
    console.log(value);
    report = value;
  }

  /**
   * Verify whether report is available or not
   */
  function reportAvailable() {
    if (!report) {
      // Prepare status message for Error
      console.log('Report not available.');
      return false;
    }
    return true;
  }

  onMounted(async () => {
    GetUserPermissionRoleList({
      trace_id: Guid.newGuid().toString(),
      BillMasterId: currentUserId,
    }).then((res) => {
      console.log('====Permission List======');
      console.log('res1:', res);
    });
    setTimeout(() => {
      embedReport();
    }, 1000);
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
