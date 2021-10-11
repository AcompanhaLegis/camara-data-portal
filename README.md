# camara-data-portal

> This is the frontend app for visualization of the acquired and processed data from "Camara dos Deputados" 

It also needs the following project running under port 8000 locally: https://github.com/AcompanhaLegis/acompanha-legis-api

# Live Version:

http://acompanhalegis.info/

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Docker

This is for development purposes only :)

```bash
$ docker build . -t camara-data-portal

$ docker run -p 3000:3000 -v "${PWD}:/opt/acompanha_legis" -t camara-data-portal yarn dev 
```


## Development guidelines

Check our [CONTRIBUTING.md](CONTRIBUTING.md)
