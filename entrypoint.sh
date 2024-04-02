#!/bin/bash
Tag="$(echo ${1} | tr '[:upper:]' '[:lower:]')"


version_without_v="${Tag#v}"

# 使用 jq命令更新 package.json文件中的 version 属性
jq --arg new_version "$version_without_v" '.version = $new_version' package.json > temp.json

# 將更新後的内容覆蓋回 package.json文件
mv temp.json package.json

# 提示更新完成
echo "版本號已更新為：$version_without_v"


# # echo ${Tag}
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 863203846708.dkr.ecr.us-west-2.amazonaws.com
docker build -t billing-shared-vue-website .
docker tag billing-shared-vue-website:latest 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-shared-vue-website:${Tag}
docker push 863203846708.dkr.ecr.us-west-2.amazonaws.com/billing-shared-vue-website:${Tag}


