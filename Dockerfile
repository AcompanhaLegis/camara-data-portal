FROM node:12

ENV NODE_ENV=development
ENV HOST=0.0.0.0

WORKDIR /opt/acompanha_legis

COPY . .

RUN yarn install

CMD ["yarn", "dev"]
