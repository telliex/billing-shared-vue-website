# 基於 Ubuntu 映像構建 Docker 容器
FROM ubuntu:20.04 as build-stage

ARG DEBIAN_FRONTEND=noninteractive
# 更新 Ubuntu 的套件庫
# 安裝 Node.js 和 NPM
# 安裝 Nginx
# 安裝 Node.js 和 Nginx
RUN apt-get update && \
    apt-get install -y curl gnupg2 && \
    apt-get install -y awscli

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs nginx

# 將 Nginx 預設設定檔案刪除
RUN rm /etc/nginx/sites-enabled/default

WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .

ARG A_ENV
ARG A_API_MGT_REPORT
ARG A_API_MGT_PERMISSION
ARG A_API_MGT_ELU
ARG A_API_SYS
ARG A_OLD_MGT
ARG A_MARS
ARG A_CBMS
ARG A_COMPANY
ARG A_S3_REGION
ARG A_S3_JSON
ARG A_API_POWERBI_LAMBDA
ARG A_S3_REPORT
ARG A_S3_ACCOUNT_REPORT
ARG A_S3_INVOICE_REPORT
ARG A_S3_ECV_REPORT
ARG A_API_KEY
ARG A_API_JWT
ARG A_API_MGT_CONTRACT

ENV ENV $A_ENV
ENV REGION us-west-2
ENV API_MGT_REPORT $A_API_MGT_REPORT
ENV API_MGT_PERMISSION $A_API_MGT_PERMISSION
ENV API_MGT_ELU $A_API_MGT_ELU
ENV API_SYS $A_API_SYS
ENV OLD_MGT $A_OLD_MGT
ENV MARS $A_MARS
ENV CBMS $A_CBMS
ENV COMPANY ECV
ENV S3_REGION us-west-2
ENV S3_JSON billing-dev-website-resource
ENV API_POWERBI_LAMBDA $A_API_POWERBI_LAMBDA
ENV S3_REPORT billing-dev-sync-data-test
ENV S3_ACCOUNT_REPORT billing-dev-accounting-report
ENV S3_INVOICE_REPORT billing-dev-bill-invoice
ENV S3_ECV_REPORT billing-dev-sync-data
ENV API_KEY $A_API_KEY
ENV API_JWT $A_API_JWT
ENV API_MGT_CONTRACT $A_API_MGT_CONTRACT

# 開啟監聽端口，以便外部流量可以到達 Nginx
EXPOSE 80

RUN chmod +x build_website.sh
CMD ["./build_website.sh"]
