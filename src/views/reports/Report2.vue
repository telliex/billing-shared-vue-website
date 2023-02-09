<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-06 10:24:56
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-09 06:23:43

 reference : https://www.nightprogrammer.com/vue-js/how-to-integrate-microsoft-power-bi-client-in-vue-js-example/
-->
<template>
  <div>
    <section id="container" style="height: 750px"></section>
  </div>
</template>
<script>
  import * as pbi from 'powerbi-client';

  export default {
    data() {
      return {
        embedUrl: null,
        accessToken: null,
        sampleReportUrl: 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport',
      };
    },
    mounted() {
      this.initializePowerBI().then(() => {
        const permissions = pbi.models.Permissions.All;

        const config = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: this.accessToken,
          embedUrl: this.embedUrl,
          pageView: 'fitToWidth',
          permissions: permissions,
        };

        let powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory,
        );

        const dashboardContainer = document.getElementById('container');
        const dashboard = powerbi.embed(dashboardContainer, config);

        dashboard.off('loaded');
        dashboard.off('rendered');
        dashboard.on('error', function () {
          this.dashboard.off('error');
        });
      });
    },
    methods: {
      async initializePowerBI() {
        const sampleReportUrl = this.sampleReportUrl;

        const reportConfigResponse = await fetch(sampleReportUrl);

        if (!reportConfigResponse.ok) {
          console.error('Failed to fetch config for report.');
          console.error('Status:', reportConfigResponse.status, reportConfigResponse.statusText);
          return;
        }

        const reportConfig = await reportConfigResponse.json();

        console.log('The access token is set. Loading the Power BI report');

        this.embedUrl = reportConfig.EmbedUrl;
        this.accessToken = reportConfig.EmbedToken.Token;
      },
    },
  };
</script>
