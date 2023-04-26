#!/bin/bash

# ================================================================================= #
# Copyright 2021 (c) eCloudvalley Digital Technology Co., Ltd. All Rights Reserved. #
# ================================================================================= #



# main process
main_process() {
    CONTRACT_API_URL=$1
    ELU_API_URL=$2
    OLD_MGT_URL=$3
    DATAPLATFORM_URL=$4
    ENV="$(echo ${5} | tr '[:upper:]' '[:lower:]')"

    ENV_TEMPLATE_NAME=".env.template"
    NEGIEX_CONFIG_TEMPLATE="default.template.conf"
    NEGIEX_CONFIG_TARGET="default.conf"
    TARGET_ENV_FILE_NAME=".env.$ENV"

  
    echo $CONTRACT_API_URL
    echo $ELU_API_URL
    echo $OLD_MGT_URL
    echo $DATAPLATFORM_URL
    echo '-------------------------'
    # bash build.sh http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3007 http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3006 http://mgt-dev.ecv-billing-center.com http://dataplatform-dev.ecv-billing-center.com
    # make config json file for current environment
    # pre_process
    # define parameters
    # TARGET_STAGE="$(echo $1 | tr '[:upper:]' '[:lower:]')"
    # TARGET_FILE_NAME="web.config.$TARGET_STAGE.json"
    # FILE_NAME="web_config"

    # if [ "$4" ]; then
    #     echo -ne "Removing temp docker .444444.. "
    #     docker image prune -f
    #     echo $4
    #     cd ..
    #     aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
    #     docker build --build-arg WHAT_ENV=$SELF -t billing-mgt-v2 .
    #     # docker build -t billing-mgt-v2 .
    #     docker tag billing-mgt-v2:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
    #     docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
    #     echo "Done"

    # elif [ -n  "$3" ]; then
    #     echo -ne "Removing temp docker .333333.. "
    #     docker image prune -f
    #     echo $3
    #     cd ..
    #     aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
    #     # docker build --build-arg WHAT_ENV=$SELF -t billing-mgt-v2 .
    #     docker build -t billing-mgt-v2 .
    #     docker tag billing-mgt-v2:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
    #     docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
    #     echo "Done"
    # fi

    cat $ENV_TEMPLATE_NAME | sed -e 's|{{CONTRACT_API_URL}}|'$CONTRACT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | sed -e 's|{{OLD_MGT_URL}}|'$OLD_MGT_URL'|g' | sed -e 's|{{DATAPLATFORM_URL}}|'$DATAPLATFORM_URL'|g' >| "$TARGET_ENV_FILE_NAME"
    cat $NEGIEX_CONFIG_TEMPLATE | sed -e 's|{{CONTRACT_API_URL}}|'$CONTRACT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g'  >| "$NEGIEX_CONFIG_TARGET"

    # pnpm build:${MYENV} 
    # cp -r dist/* ../usr/share/nginx/html 
    # cp -r default.conf ../etc/nginx/conf.d/default.conf
    # nginx -g "daemon off;"

}




USAGE="$(cat << EOF
Usage:
    build.sh [STAGE] [REGION] [TAG](Optional)

    Where [STAGE] can be one of the following:
        * dev
        * stage
        * demo
        * prod
    Where [REGION] can be one of the following:
        * us-east-1
        * us-west-2
    Where [TAG] can be one of the following:
        * dev
        * stage
        * uat
        * v1.17.X(version)
EOF
)"

# Usage checking and argument extracting
# [[ $# < 2 ]] \
#     && echo "${USAGE}" \
#     && exit 1

# ENV="$(echo ${1} | tr '[:upper:]' '[:lower:]')"
# [[ "${ENV}" == "help" ]] \
#     && echo "${USAGE}" \
#     && exit 0

# REGION="$(echo ${2} | tr '[:upper:]' '[:lower:]')"
# [[ "${REGION}" == "help" ]] \
#     && echo "${USAGE}" \
#     && exit 0

# Tag="$(echo ${3} | tr '[:upper:]' '[:lower:]')"
# [[ "${Tag}" == "help" ]] \
#     && echo "${USAGE}" \
#     && exit 0

# SELF="$(echo ${4} | tr '[:upper:]' '[:lower:]')"
# [[ "${SELF}" == "help" ]] \
#     && echo "${USAGE}" \
#     && exit 0


main_process $*
