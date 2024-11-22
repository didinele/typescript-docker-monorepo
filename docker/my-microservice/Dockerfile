FROM node:22-alpine
LABEL name "project my-microservice builder"

WORKDIR /opt/build

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl git python3 alpine-sdk

COPY . .

RUN yarn --immutable

RUN yarn run build && yarn workspaces focus --production

FROM node:22-alpine
LABEL name "project my-microservice"
LABEL version "0.1.0"

WORKDIR /usr/my-microservice

COPY --from=0 /opt/build ./

CMD ["node", "--enable-source-maps", "services/my-microservice/dist/index.js"]
