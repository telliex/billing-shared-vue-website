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

ENV ENV dev
ENV REGION us-west-2
ENV API_MGT_REPORT http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3008
ENV API_MGT_PERMISSION http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3002
ENV API_MGT_ELU http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3006
ENV API_SYS http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3008
ENV OLD_MGT http://mgt-dev.ecv-billing-center.com
ENV MARS http://mars-dev.ecv-billing-center.com
ENV CBMS http://cbms-dev.ecv-billing-center.com
ENV COMPANY ECV
ENV S3_REGION us-west-2
ENV S3_JSON billing-dev-website-resource
ENV API_POWERBI_LAMBDA https://rgoyovotjqogivdmoth4ut3dsm0jgyhl.lambda-url.us-west-2.on.aws/
ENV S3_REPORT billing-dev-sync-data-test
ENV S3_ACCOUNT_REPORT billing-dev-accounting-report
ENV S3_INVOICE_REPORT billing-dev-bill-invoice
ENV S3_ECV_REPORT billing-dev-sync-data
ENV API_KEY 484CD16940B64F878DC9CCE2E79EA08E
ENV API_JWT http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3010
ENV API_MGT_CONTRACT http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3007

# 開啟監聽端口，以便外部流量可以到達 Nginx
EXPOSE 80

RUN chmod +x build_website.sh
CMD ["./build_website.sh"]
