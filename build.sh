#!/bin/bash

# ================================================================================= #
# Copyright 2021 (c) eCloudvalley Digital Technology Co., Ltd. All Rights Reserved. #
# ================================================================================= #


# main process
main_process() {
    REPORT_API_URL=$1
    ELU_API_URL=$2
    OLD_MGT_URL=$3
    CRS_URL=$4
    CBMS_URL=$5
    ENV="$(echo ${6} | tr '[:upper:]' '[:lower:]')"
    S3_REGION_URL=$7
    S3_JSON_URL=$8
    PERMISSION_API_URL=$9
    SYS_API_URL= ${10}

    ENV_TEMPLATE_NAME=".env.template"
    NEGIEX_CONFIG_TEMPLATE="default.template.conf"
    NEGIEX_CONFIG_TARGET="default.conf"
    TARGET_ENV_FILE_NAME=".env.$ENV"

    echo $REPORT_API_URL
    echo $PERMISSION_API_URL
    echo $ELU_API_URL
    echo $OLD_MGT_URL
    echo $CRS_URL
    echo $CBMS_URL
    echo $SYS_API_URL
    echo '-------------------------'

    cat $ENV_TEMPLATE_NAME | sed -e 's|{{REPORT_API_URL}}|'$REPORT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | sed -e 's|{{CBMS_URL}}|'$CBMS_URL'|g' | sed -e 's|{{OLD_MGT_URL}}|'$OLD_MGT_URL'|g' | sed -e 's|{{CRS_URL}}|'$CRS_URL'|g' | sed -e 's|{{S3_REGION_URL}}|'$S3_REGION_URL'|g' | sed -e 's|{{S3_JSON_URL}}|'$S3_JSON_URL'|g' | sed -e 's|{{PERMISSION_API_URL}}|'$PERMISSION_API_URL'|g' | sed -e 's|{{SYS_API_URL}}|'$SYS_API_URL'|g' >| "$TARGET_ENV_FILE_NAME"
    cat $NEGIEX_CONFIG_TEMPLATE | sed -e 's|{{REPORT_API_URL}}|'$REPORT_API_URL'|g' | sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | sed -e 's|{{SYS_API_URL}}|'$SYS_API_URL'|g' | sed -e 's|{{PERMISSION_API_URL}}|'$PERMISSION_API_URL'|g'  >| "$NEGIEX_CONFIG_TARGET"
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
