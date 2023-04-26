#!/bin/bash

# ================================================================================= #
# Copyright 2021 (c) eCloudvalley Digital Technology Co., Ltd. All Rights Reserved. #
# ================================================================================= #

pre_process() {
    # define template file name
    WEB_CONFIG_TEMPLATE="web.config.template.json"
    # define config file name
    TARGET_FILE_NAME="web.config.$ENV.json"
    PARAMETERS_FILE_NAME="parameters.$ENV.json"
    ENV_TEMPLATE_NAME="../.env.template"
    NEGIEX_CONFIG_TEMPLATE="../default.template.conf"
    NEGIEX_CONFIG_TARGET="default.conf"
    TARGET_ENV_FILE_NAME=".env.$ENV"
    CONTRACT_API_URL=""
    ELU_API_URL=""
    OLD_MGT_URL=""
    DATAPLATFORM_URL=""
    # make config file
    cat $WEB_CONFIG_TEMPLATE | sed -e "s/{{ENV}}/${ENV^}/g" > "$TARGET_FILE_NAME"
    # get parameter path
    PARAMETERS_PATH=$(echo $(jq '.parameters_path' $TARGET_FILE_NAME)| sed -e "s/\"//g");
    # make parameter file
    aws ssm get-parameters-by-path --path "$PARAMETERS_PATH"  --recursive > "$PARAMETERS_FILE_NAME" --region $REGION
    for key in $(jq '.Parameters | keys[]' $PARAMETERS_FILE_NAME); do 
        name=$(jq -r '.Parameters['$key'].Name' $PARAMETERS_FILE_NAME)
        value=$(jq -r '.Parameters['$key'].Value' $PARAMETERS_FILE_NAME)
        if grep -q "$name" "$TARGET_FILE_NAME"; then
          if [[ $name == *"/${ENV^}/Billing/API/contract"* ]]; then
              CONTRACT_API_URL=$value
          fi
          if [[ $name == *"/${ENV^}/Billing/API/elu"* ]]; then
              ELU_API_URL=$value
          fi
          if [ $name == "/${ENV^}/Billing/WebSite/mgt/domain" ]; then
              OLD_MGT_URL=$value
          fi
          if [[ $name == *"/${ENV^}/Billing/WebSite/dataplatform"* ]]; then
              DATAPLATFORM_URL=$value
          fi
          sed -i 's|'$name\#'|'$value'|g' "$TARGET_FILE_NAME"
        fi
    done
    cat $ENV_TEMPLATE_NAME | sed -e 's|{{CONTRACT_API_URL}}|'$CONTRACT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | sed -e 's|{{OLD_MGT_URL}}|'$OLD_MGT_URL'|g' | sed -e 's|{{DATAPLATFORM_URL}}|'$DATAPLATFORM_URL'|g' >| "../$TARGET_ENV_FILE_NAME"
    cat $NEGIEX_CONFIG_TEMPLATE | sed -e 's|{{CONTRACT_API_URL}}|'$CONTRACT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g'  >| "../$NEGIEX_CONFIG_TARGET"
}

# main process
main_process() {
    # make config json file for current environment
    pre_process
    # define parameters
    # TARGET_STAGE="$(echo $1 | tr '[:upper:]' '[:lower:]')"
    # TARGET_FILE_NAME="web.config.$TARGET_STAGE.json"
    # FILE_NAME="web_config"

    if [ "$4" ]; then
        echo -ne "Removing temp docker .444444.. "
        docker image prune -f
        echo $4
        cd ..
        aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
        docker build --build-arg WHAT_ENV=$SELF -t billing-mgt-v2 .
        # docker build -t billing-mgt-v2 .
        docker tag billing-mgt-v2:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
        docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
        echo "Done"

    elif [ -n  "$3" ]; then
        echo -ne "Removing temp docker .333333.. "
        docker image prune -f
        echo $3
        cd ..
        aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
        # docker build --build-arg WHAT_ENV=$SELF -t billing-mgt-v2 .
        docker build -t billing-mgt-v2 .
        docker tag billing-mgt-v2:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
        docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-mgt-v2:$3
        echo "Done"
    fi
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
[[ $# < 2 ]] \
    && echo "${USAGE}" \
    && exit 1

ENV="$(echo ${1} | tr '[:upper:]' '[:lower:]')"
[[ "${ENV}" == "help" ]] \
    && echo "${USAGE}" \
    && exit 0

REGION="$(echo ${2} | tr '[:upper:]' '[:lower:]')"
[[ "${REGION}" == "help" ]] \
    && echo "${USAGE}" \
    && exit 0

Tag="$(echo ${3} | tr '[:upper:]' '[:lower:]')"
[[ "${Tag}" == "help" ]] \
    && echo "${USAGE}" \
    && exit 0

SELF="$(echo ${4} | tr '[:upper:]' '[:lower:]')"
[[ "${SELF}" == "help" ]] \
    && echo "${USAGE}" \
    && exit 0


main_process $*
