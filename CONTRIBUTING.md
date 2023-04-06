# Project description

This project uses open data from the brazilian Camara dos Deputados, including politicians data, laws propositions, meetings, events and further data 
result of the processing done by the [API]('https://gitlab.com/https://gitlab.com/acompanhalegis/acompanha_legis').

It links the data in an easy way to you can narrow down the information from almost anywhere inside the application.

The project uses `NuxtJS`.

:sparkles: Contributions are welcomed!


## Highlights on our internal libs

Here we list some of the libraries we use, so you can get familiar with them:

- [Vue + NuxtJS](https://nuxtjs.org/) - VueJS with SSR and a lot of handy plugins
- [axios](https://github.com/axios/axios) - HTTP client (for requesting data)
- [ant-design-vue](https://www.antdv.com/docs/vue/introduce/) - UI component library
- [MomentJS](https://momentjs.com/) - Date/time utils


## Get to know the data

The data is extracted from: https://dadosabertos.camara.leg.br/

They also provide the endpoints on a [Swagger interface](https://dadosabertos.camara.leg.br/swagger/api.html#api),
take at look these endpoints, each one has a good description of what it should retrieve and a "Try it" button.

For this project, we always use the JSON format.

The `openData` plugin (implements `this.$openData` for Nuxt), sends the request
to the following endpoint directly: `https://dadosabertos.camara.leg.br/api/v2`. It means that
every time you need to make a request to this source, just use `this.$openData('/endpoint')`.

To send requests for the AcompanhaLegis API, use the default `this.$axios`.


## Commit messages

We follow this convention to add make the commit messages standard:

All first lines of the commit messages should fit in 50 (70 if you REALLY need it) characters, use the second line and beyond to make any further explanations.
Use the correct emoji as the first thing on the commit message followed by the mentioned starting word (e.g. :bulb: Add my awesome feature)

* When adding a new feature/component/etc: `:bulb:` :bulb: Add ...
* When fixing a bug: `:bug:` :bug: Fix...
* For documentation: `:book:` :book: Docs (for/about/etc)...
* For improvements and updates: `:arrow_up:` :arrow_up: Upgrade/Improve...
* For CI/CD matters: `:cyclone:` :cyclone: No specific words here
* For maintenance: `:wrench:` :wrench: ?
* For removing code: `:fire:` :fire: Remove...

## Issues

When opening issues, try to make your self clear, give examples and/or code snippets. You can either write it in English (preferred) or Portguese, if there's further interest of people that can only understand one of these languages, let us know on the issue and we will try to translate it.

> If you would like to suggest some templates, go ahead, we didn't make time for it yet.

You can suggest implementations approaches, fixes, etc. Sometimes we need to make tough decisions on either implement something or not, but since the
project is open source, you can have your own fork within your more urgent or "refused" ideas.

:warning: Overall, be respectful while discussing the issues, it should be a friendly environment for anyone interested on the project.

## License MIT

Copyright 2020 AcompanhaLegis Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
