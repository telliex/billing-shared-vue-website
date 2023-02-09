<template>
  <div class="container" id="container">
    <div class="controls">
      <template v-if="isEmbedded">
        <label class="display-message">{{ displayMessage }}</label>
      </template>
      <template v-else>
        <label class="display-message position">{{ displayMessage }}</label>
        <button @click="embedReport()" class="embed-report">Embed Report</button>
      </template>

      <TestPowerBIReportEmbed
        v-if="isEmbedded"
        :embed-config="sampleReportConfig"
        :phased-embedding="phasedEmbeddingFlag"
        :css-class-name="reportClass"
        :event-handlers="eventHandlersMap"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, markRaw } from 'vue';
  import { models, IReportEmbedConfiguration, service, Embed } from 'powerbi-client';
  import 'powerbi-report-authoring';

  import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
  let TestPowerBIReportEmbed = markRaw(PowerBIReportEmbed);
  export default defineComponent({
    components: {
      TestPowerBIReportEmbed,
    },
    setup() {
      // Track Report embedding status
      const isEmbedded = ref(false);

      // Flag which specifies whether to use phase embedding or no

      const phasedEmbeddingFlag = ref(false);

      // CSS Class to be passed to the wrapper
      const reportClass = ref('report-container');
      // Overall status message of embedding
      const displayMessage = ref(
        'The report is bootstrapped. Click Embed Report button to set the access token.',
      );

      // Pass the basic embed configurations to the wrapper to bootstrap the report on first load
      // Values for properties like embedUrl, accessToken and settings will be set on click of button
      let sampleReportConfig = reactive({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
      }) as IReportEmbedConfiguration;

      /**
       * Map of event handlers to be applied to the embedded report
       * Update event handlers for the report by redefining the map using this.eventHandlersMap
       * Set event handler to null if event needs to be removed
       * More events can be provided from here
       * https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
       */

      const eventHandlersMap = reactive(
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

      // let report: Report = ref();

      async function embedReport(): Promise<void> {
        console.log('Embed Report clicked');

        // Get the embed config from the service and set the reportConfigResponse
        const reportConfigResponse: Response = await fetch(
          'https://aka.ms/CaptureViewsReportEmbedConfig',
        );

        if (!reportConfigResponse?.ok) {
          console.error(
            `Failed to fetch config for report. Status: ${reportConfigResponse.status} ${reportConfigResponse.statusText}`,
          );
          return;
        }

        const reportConfig: ConfigResponse = await reportConfigResponse.json();
        console.log(reportConfig);
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

      // function setReportObj(value: Report) {
      //   report.value = value;
      // }

      return {
        embedReport,
        // setReportObj,
        isEmbedded,
        displayMessage,
        sampleReportConfig,
        eventHandlersMap,
        phasedEmbeddingFlag,
        reportClass,
        // report,
      };
    },
  });

  // Handles the embed config response for embedding
  export interface ConfigResponse {
    Id: string;
    EmbedUrl: string;
    EmbedToken: {
      Token: string;
    };
  }
</script>

<style>
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
</style>
