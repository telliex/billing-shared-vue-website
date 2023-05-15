<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 06:25:45
 * @LastEditors: Telliex
 * @LastEditTime: 2023-01-06 03:10:54
-->
<template>
  <div class="p-4 powerbi-wrap">
    <div class="container">
      <div class="controls">
        <template v-if="isEmbedded">
          <button @click="changeVisualType('columnChart')">columnChart type</button>
          <button @click="changeVisualType('lineChart')">lineChart type</button>
          <button @click="hideFilterPane(true)">Hide filter pane</button>
          <button @click="hideFilterPane(false)">Show filter pane</button>
          <button @click="setDataSelectedEvent()">Set event</button>
          <label class="display-message">{{ displayMessage }}</label>
        </template>
        <template v-else>
          <label class="display-message position">{{ displayMessage }}</label>
          <button @click="embedReport()" class="embed-report">Embed Report</button>
        </template>

        <PowerBIReportEmbed
          v-if="isEmbedded"
          :embed-config="sampleReportConfig"
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
  // import { GetPowerBIToken } from '/@/api/sys/system';

  import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
  const reportUrl = 'https://aka.ms/CaptureViewsReportEmbedConfig';

  // Flag which specifies whether to use phase embedding or not
  const phasedEmbeddingFlag = false;

  // CSS Class to be passed to the wrapper
  const reportClass = 'report-container';

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

  // Overall status message of embedding
  let displayMessage = ref(
    'The report is bootstrapped. Click Embed Report button to set the access token.',
  );

  // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
  // Values for properties like embedUrl, accessToken and settings will be set on click of button
  let sampleReportConfig = reactive<IReportEmbedConfiguration>({
    type: 'report',
    embedUrl: undefined,
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
      ['rendered', () => console.log('Report has rendered')],
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
    console.log('Embed Report clicked');

    // Get the embed config from the service and set the reportConfigResponse
    const reportConfigResponse: Response = await fetch(reportUrl);
    if (!reportConfigResponse?.ok) {
      console.error(
        `Failed to fetch config for report. Status: ${reportConfigResponse.status} ${reportConfigResponse.statusText}`,
      );
      return;
    }

    const reportConfig: ConfigResponse = await reportConfigResponse.json();

    // Update the reportConfig to embed the PowerBI report
    sampleReportConfig = {
      ...sampleReportConfig,
      id: reportConfig.Id,
      embedUrl: reportConfig.EmbedUrl,
      accessToken: reportConfig.EmbedToken.Token,
    };

    isEmbedded.value = true;

    // Update the display message
    displayMessage.value =
      'Use the buttons above to interact with the report using Power BI Client APIs.';
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
      displayMessage.value = 'No pages found.';
      return;
    }

    // Get active page of the report
    const activePage: Page | undefined = pages.find((page) => page.isActive);

    if (!activePage) {
      displayMessage.value = 'No Active page found';
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
      displayMessage.value = `The ${preVisual.type} was updated to ${nextVisual.type}.`;
      console.log(displayMessage.value);
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
      displayMessage.value = 'Filter pane is hidden.';
      console.log(displayMessage.value);
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

    displayMessage.value =
      'Data Selected event set successfully. Select data to see event in console.';
  }

  /**
   * Assign Embed Object from Report component to report
   * @param value
   */
  function setReportObj(value: Report) {
    report = value;
  }

  /**
   * Verify whether report is available or not
   */
  function reportAvailable() {
    if (!report) {
      // Prepare status message for Error
      displayMessage.value = 'Report not available.';
      console.log(displayMessage.value);
      return false;
    }
    return true;
  }

  // get power-bi report function
  // step1: get powerbi token function

  // step2: get powerbi report

  async function getPowerbiToken() {
    const clientId = '0679d8b5-000c-4b4b-8a4c-d8d60cbd6242';
    const username = 'ecv-billing@ecloudvalley.com';
    const password = 'X=wB9a62+tAd';

    const resource = 'https://analysis.windows.net/powerbi/api';
    const grantType = 'password';

    // let token = await GetPowerBIToken({
    //   clientId,
    //   password,
    //   username,
    //   resource,
    //   grantType,
    // });

    // console.log('token:', token);

    const response = await fetch('https://login.microsoftonline.com/common/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=${grantType}&client_id=${clientId}&username=${username}&pasword=${password}&resource=${resource}`,
    });
    const data = await response.json();
    return data.token;
  }
  onMounted(async () => {
    // const token = await getPowerbiToken();
    // console.log(token);
  });
</script>
<style lang="less">
  .powerbi-wrap {
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
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
