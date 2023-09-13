#!/bin/bash
Tag="$(echo ${1} | tr '[:upper:]' '[:lower:]')"

echo ${Tag}
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
docker build --build-arg A_ENV=dev --build-arg A_API_MGT_PERMISSION=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3002 --build-arg A_API_MGT_ELU=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3006 --build-arg A_API_SYS=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3009 --build-arg A_API_MGT_REPORT=http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3008 --build-arg A_OLD_MGT=http://mgt-dev.ecv-billing-center.com --build-arg A_CRS=http://dataplatform-dev.ecv-billing-center.com --build-arg A_CBMS=http://cbms-dev.ecv-billing-center.com --build-arg A_CRS=http://mars-dev.ecv-billing-center.com --build-arg A_API_POWERBI_LAMBDA=https://rgoyovotjqogivdmoth4ut3dsm0jgyhl.lambda-url.us-west-2.on.aws/ -t billing-dataplatform .
docker tag billing-dataplatform:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-dataplatform:${Tag}
docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-dataplatform:${Tag}
