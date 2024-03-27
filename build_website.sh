#!/bin/bash
###
 # @Description: 
 # @Anthor: Telliex
 # @Date: 2023-04-26 00:42:34
 # @LastEditors: Telliex.Chiu Telliex.Chiu@ecliudvalle.com.tw
 # @LastEditTime: 2023-06-26 22:04:15
### 
# cd /app
# bash build.sh ${API_MGT_REPORT} ${API_MGT_ELU} ${OLD_MGT} ${CRS} ${ENV} 
# pnpm build:${ENV} 
# cp -r dist/* ../usr/share/nginx/html 
# cp -r default.conf ../etc/nginx/conf.d/default.conf  
# echo ${ENV}
# echo ${API_MGT_REPORT}
# echo ${API_MGT_ELU}
# echo ${OLD_MGT}
# echo ${CRS}  


# 傳入的參數
# API_MGT_REPORT=$1
# API_MGT_ELU=$2
# OLD_MGT=$3
# CRS=$4
# CBMS=$5
# ENV=$6
# S3_REGION=$7
# S3_JSON=$8
# API_MGT_PERMISSION=$9
# API_SYS=${10}
# API_POWERBI_LAMBDA=${11}


# way1 : ok to go
# 將 Nginx 設定為服務狀態
# service nginx start
# nginx -g "daemon off;"

# way2 : ok to go
# 執行命令
echo "----------====目前環境====------------"
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
echo "COMPANY:${COMPANY}"

bash build.sh ${API_MGT_REPORT} ${API_MGT_ELU} ${OLD_MGT} ${CRS} ${CBMS} ${ENV} ${S3_REGION} ${S3_JSON} ${API_MGT_PERMISSION} ${API_SYS} ${API_POWERBI_LAMBDA} ${S3_REPORT} ${S3_ACCOUNT_REPORT} ${S3_INVOICE_REPORT} ${S3_ECV_REPORT} ${API_KEY} ${API_JWT} ${COMPANY}
pnpm build:${ENV}
cp -r dist/* ../usr/share/nginx/html 
cp -r default.conf ../etc/nginx/conf.d/default.conf 
nginx -g "daemon off;"