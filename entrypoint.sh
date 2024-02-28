#!/bin/bash
Tag="$(echo ${1} | tr '[:upper:]' '[:lower:]')"


version_without_v="${Tag#v}"

# 使用 jq命令更新 package.json文件中的 version 属性
jq --arg new_version "$version_without_v" '.version = $new_version' package.json > temp.json

# 將更新後的内容覆蓋回 package.json文件
mv temp.json package.json

# 提示更新完成
echo "版本號已更新為：$version_without_v"


echo ${Tag}
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
docker build --build-arg A_ENV=dev --build-arg A_API_MGT_PERMISSION=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3002 --build-arg A_API_MGT_ELU=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3006 --build-arg A_API_SYS=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3008 --build-arg A_API_MGT_REPORT=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3008 --build-arg A_OLD_MGT=http://mgt-dev.ecv-billing-center.com --build-arg A_CRS=http://dataplatform-dev.ecv-billing-center.com --build-arg A_CBMS=http://cbms-dev.ecv-billing-center.com --build-arg A_CRS=http://mars-dev.ecv-billing-center.com --build-arg A_API_POWERBI_LAMBDA=https://rgoyovotjqogivdmoth4ut3dsm0jgyhl.lambda-url.us-west-2.on.aws/ --build-arg A_S3_ECV_REPORT=484CD16940B64F878DC9CCE2E79EA08E --build-arg A_API_JWT=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3010 -t billing-dataplatform .
docker tag billing-dataplatform:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-dataplatform:${Tag}
docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-dataplatform:${Tag}
