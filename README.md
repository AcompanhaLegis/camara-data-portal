# camara-data-portal

> This is the frontend app for visualization of the acquired and processed data from "Camara dos Deputados" 

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

## Using the API

By default, during development, this project uses the api on `localhost:8000`, make sure it's running and that you have a valid user.

For the `Dados abertos da camara` use `this.$openData` for request, for the "local" API use `this.$axios` as standard for the requests, they're already both configure to use the correspondent `baseURL`.

## Development guidelines

### Commit messsages

All first lines of the commit messages should fit in 50 characters, use the second line and beyond to make any further explanations.
Use the correct emoji as the first thing on the commit message followed by the mentioned starting word (e.g. :bulb: Add my awesome feature)

* When adding a new feature/component/etc: `:bulb:` :bulb: Add ...
* When fixing a bug: `:bug:` :bug: Fix...
* For documentation: `:book:` :book: Docs (for/about/etc)...
* For improvements and updates: `:arrow_up:` :arrow_up: Upgrade/Improve...
* For CI/CD matters: `:cyclone:` :cyclone: No specific words here
* For maintenance: `:wrench:` :wrench: ?
