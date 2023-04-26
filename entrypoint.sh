#!/bin/bash
Tag="$(echo ${1} | tr '[:upper:]' '[:lower:]')"

echo ${Tag}
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
docker build --build-arg A_ENV=dev --build-arg A_API_MGT_ELU=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3006 --build-arg A_API_MGT_CONTRACT=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3007 --build-arg A_OLD_MGT=http://mgt-dev.ecv-billing-center.com --build-arg A_DATAPLATFORM=http://dataplatform-dev.ecv-billing-center.com -t billing-mgt-v2 .
# docker build --build-arg A_ENV=dev --build-arg A_API_MGT_ELU=http://internal-billing-uat-api-alb-1343906613.us-west-2.elb.amazonaws.com:3006 --build-arg A_API_MGT_CONTRACT=http://internal-billing-uat-api-alb-1343906613.us-west-2.elb.amazonaws.com:3007 --build-arg A_OLD_MGT=http://mgt-uat.ecv-billing-center.com --build-arg A_DATAPLATFORM=http://dataplatform-uat.ecv-billing-center.com -t billing-mgt-v2 .
docker tag billing-mgt-v2:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:${Tag}
docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:${Tag}
