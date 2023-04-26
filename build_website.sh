#!/bin/bash
# cd /app
# bash build.sh ${API_MGT_REPORT} ${API_MGT_ELU} ${OLD_MGT} ${DATAPLATFORM} ${ENV} 
# pnpm build:${ENV} 
# cp -r dist/* ../usr/share/nginx/html 
# cp -r default.conf ../etc/nginx/conf.d/default.conf  
# echo ${ENV}
# echo ${API_MGT_REPORT}
# echo ${API_MGT_ELU}
# echo ${OLD_MGT}
# echo ${DATAPLATFORM}  


# 傳入的參數
# API_MGT_REPORT=$1
# API_MGT_ELU=$2
# OLD_MGT=$3
# DATAPLATFORM=$4
# ENV=$5



# way1 : ok to go
# 將 Nginx 設定為服務狀態
# service nginx start
# nginx -g "daemon off;"

# way2 : ok to go
# 執行命令
echo "----------======------------"
echo ${ENV}
bash build.sh ${API_MGT_REPORT} ${API_MGT_ELU} ${OLD_MGT} ${DATAPLATFORM} ${CBMS} ${ENV} 
pnpm build:${ENV}
cp -r dist/* ../usr/share/nginx/html 
cp -r default.conf ../etc/nginx/conf.d/default.conf 
nginx -g "daemon off;"
