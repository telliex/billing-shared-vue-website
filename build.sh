#!/bin/bash

# ================================================================================= #
# Copyright 2021 (c) eCloudvalley Digital Technology Co., Ltd. All Rights Reserved. #
# ================================================================================= #


# main process
main_process() {
    REPORT_API_URL=$1
    ELU_API_URL=$2
    OLD_MGT_URL=$3
    MARS_URL=$4
    CBMS_URL=$5
    ENV="$(echo ${6} | tr '[:upper:]' '[:lower:]')"
    S3_REGION_URL=$7
    S3_JSON_URL=$8
    PERMISSION_API_URL=$9
    SYS_API_URL=${10}
    POWERBI_LAMBDA_API_URL=${11}
    S3_REPORT_URL=${12}
    S3_ACCOUNT_REPORT_URL=${13}
    S3_INVOICE_REPORT_URL=${14}
    S3_ECV_REPORT_URL=${15}
    API_KEY=${16}
    JWT_API_URL=${17}
    CONTRACT_API_URL=${18}
    APP_TITLE=${19}
    PLATFORM=${20}
    COMPANY=${21}

    ENV_TEMPLATE_NAME=".env.template"
    NEGIEX_CONFIG_TEMPLATE="default.template.conf"
    NEGIEX_CONFIG_TARGET="default.conf"
    TARGET_ENV_FILE_NAME=".env.$ENV"

    echo '-------------------------'
    echo "oREPORT_API_URL:$REPORT_API_URL"
    echo "oELU_API_URL:$ELU_API_URL"
    echo "oOLD_MGT_URL:$OLD_MGT_URL"
    echo "oMARS_URL:$MARS_URL"
    echo "oCBMS_URL:$CBMS_URL"
    echo "oENV:$ENV"
    echo "oS3_REGION_URL:$S3_REGION_URL"
    echo "oS3_JSON_URL:$S3_JSON_URL"
    echo "oPERMISSION_API_URL:$PERMISSION_API_URL"
    echo "oSYS_API_URL:$SYS_API_URL"
    echo "oPOWERBI_LAMBDA_API_URL:$POWERBI_LAMBDA_API_URL"
    echo "oS3_REPORT_URL:$S3_REPORT_URL"
    echo "oS3_ACCOUNT_REPORT_URL:$S3_ACCOUNT_REPORT_URL"
    echo "oS3_INVOICE_REPORT_URL:$S3_INVOICE_REPORT_URL"
    echo "oS3_ECV_REPORT_URL:$S3_ECV_REPORT_URL"
    echo "oAPI_KEY:$API_KEY"
    echo "oJWT_API_URL:$JWT_API_URL"
    echo "oCONTRACT_API_URL:$CONTRACT_API_URL"
    echo "oAPP_TITLE:$APP_TITLE"
    echo "oPLATFORM:$PLATFORM"
    echo "oCOMPANY:$COMPANY"
    echo '-------------------------'
    
    cat $ENV_TEMPLATE_NAME | \
    sed -e 's|{{CONTRACT_API_URL}}|'$CONTRACT_API_URL'|g' | \
    sed -e 's|{{REPORT_API_URL}}|'$REPORT_API_URL'|g' | \
    sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | \
    sed -e 's|{{CBMS_URL}}|'$CBMS_URL'|g' | \
    sed -e 's|{{OLD_MGT_URL}}|'$OLD_MGT_URL'|g' | \
    sed -e 's|{{MARS_URL}}|'$MARS_URL'|g' | \
    sed -e 's|{{S3_REGION_URL}}|'$S3_REGION_URL'|g' | \
    sed -e 's|{{S3_JSON_URL}}|'$S3_JSON_URL'|g' | \
    sed -e 's|{{PERMISSION_API_URL}}|'$PERMISSION_API_URL'|g' | \
    sed -e 's|{{SYS_API_URL}}|'$SYS_API_URL'|g' | \
    sed -e 's|{{POWERBI_LAMBDA_API_URL}}|'$POWERBI_LAMBDA_API_URL'|g' | \
    sed -e 's|{{S3_REPORT_URL}}|'$S3_REPORT_URL'|g' | \
    sed -e 's|{{S3_ACCOUNT_REPORT_URL}}|'$S3_ACCOUNT_REPORT_URL'|g' | \
    sed -e 's|{{S3_INVOICE_REPORT_URL}}|'$S3_INVOICE_REPORT_URL'|g' | \
    sed -e 's|{{S3_ECV_REPORT_URL}}|'$S3_ECV_REPORT_URL'|g' | \
    sed -e 's|{{JWT_API_URL}}|'$JWT_API_URL'|g' | \
    sed -e 's|{{API_KEY}}|'$API_KEY'|g' | \
    sed -e 's|{{APP_TITLE}}|'$APP_TITLE'|g' | \
    sed -e 's|{{PLATFORM}}|'$PLATFORM'|g' | \
    sed -e 's|{{COMPANY}}|'$COMPANY'|g' >| "$TARGET_ENV_FILE_NAME"

    cat $NEGIEX_CONFIG_TEMPLATE | \
    sed -e 's|{{CONTRACT_API_URL}}|'$CONTRACT_API_URL'|g' | \
    sed -e 's|{{REPORT_API_URL}}|'$REPORT_API_URL'|g' | \
    sed -e 's|{{ELU_API_URL}}|'$ELU_API_URL'|g' | \
    sed -e 's|{{SYS_API_URL}}|'$SYS_API_URL'|g' | \
    sed -e 's|{{PERMISSION_API_URL}}|'$PERMISSION_API_URL'|g' | \
    sed -e 's|{{JWT_API_URL}}|'$JWT_API_URL'|g'  >| "$NEGIEX_CONFIG_TARGET"
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