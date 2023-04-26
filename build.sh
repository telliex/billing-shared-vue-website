#!/bin/bash

# ================================================================================= #
# Copyright 2021 (c) eCloudvalley Digital Technology Co., Ltd. All Rights Reserved. #
# ================================================================================= #


# main process
main_process() {
    REPORT_API_URL=$1
    ELU_API_URL=$2
    OLD_MGT_URL=$3
    DATAPLATFORM_URL=$4
    CBMS_URL=$5
    ENV="$(echo ${6} | tr '[:upper:]' '[:lower:]')"

    ENV_TEMPLATE_NAME=".env.template"
    NEGIEX_CONFIG_TEMPLATE="default.template.conf"
    NEGIEX_CONFIG_TARGET="default.conf"
    TARGET_ENV_FILE_NAME=".env.$ENV"

  
    echo $REPORT_API_URL
    echo $ELU_API_URL
    echo $OLD_MGT_URL
    echo $DATAPLATFORM_URL
    echo $CBMS_URL
    echo '-------------------------'

    cat $ENV_TEMPLATE_NAME | sed -e 's|{{REPORT_API_URL}}|'$REPORT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | sed -e 's|{{CBMS_URL}}|'$CBMS_URL'|g' | sed -e 's|{{OLD_MGT_URL}}|'$OLD_MGT_URL'|g' | sed -e 's|{{DATAPLATFORM_URL}}|'$DATAPLATFORM_URL'|g' >| "$TARGET_ENV_FILE_NAME"
    cat $NEGIEX_CONFIG_TEMPLATE | sed -e 's|{{REPORT_API_URL}}|'$REPORT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g'  >| "$NEGIEX_CONFIG_TARGET"
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


main_process $*
