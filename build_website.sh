#!/bin/bash

# 執行命令
echo "----------====目前環境 start====------------"
echo "API_MGT_REPORT:${API_MGT_REPORT}"
echo "API_MGT_ELU:${API_MGT_ELU}"
echo "OLD_MGT:${OLD_MGT}"
echo "CRS:${CRS}"
echo "CBMS:${CBMS}"
echo "ENV:${ENV}"
echo "S3_REGION:${S3_REGION}"
echo "S3_JSON:${S3_JSON}"
echo "API_MGT_PERMISSION:${API_MGT_PERMISSION}"
echo "API_SYS:${API_SYS}"
echo "API_POWERBI_LAMBDA:${API_POWERBI_LAMBDA}"
echo "S3_REPORT:${S3_REPORT}"
echo "S3_ACCOUNT_REPORT:${S3_ACCOUNT_REPORT}"
echo "S3_INVOICE_REPORT:${S3_INVOICE_REPORT}"
echo "S3_ECV_REPORT:${S3_ECV_REPORT}"
echo "API_KEY:${API_KEY}"
echo "API_JWT:${API_JWT}"
echo "API_MGT_CONTRACT:${API_MGT_CONTRACT}"
echo "APP_TITLE:${APP_TITLE}"
echo "PLATFORM:${PLATFORM}"
echo "COMPANY:${COMPANY}"
echo "----------====目前環境 end====------------"


bash build.sh ${API_MGT_REPORT} ${API_MGT_ELU} ${OLD_MGT} ${CRS} ${CBMS} ${ENV} ${S3_REGION} ${S3_JSON} ${API_MGT_PERMISSION} ${API_SYS} ${API_POWERBI_LAMBDA} ${S3_REPORT} ${S3_ACCOUNT_REPORT} ${S3_INVOICE_REPORT} ${S3_ECV_REPORT} ${API_KEY} ${API_JWT} ${API_MGT_CONTRACT} ${APP_TITLE} ${PLATFORM} ${APP_TITLE} ${PLATFORM} ${COMPANY}
pnpm build:${ENV}
cp -r dist/* ../usr/share/nginx/html 
cp -r default.conf ../etc/nginx/conf.d/default.conf 
nginx -g "daemon off;"