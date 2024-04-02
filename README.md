# ECV management Admin

**English** | [繁體](./README.zh-TW.md) | [简体](./README.zh-CN.md)

## Introduction

ECV management Admin is a data platform. Using the latest `vue3`, `vite2`, `TypeScript` and other mainstream technology development. The CBMS & MARS use it.

## Feature

- **State of The Art Development**：Use front-end front-end technology development such as Vue3/vite2
- **TypeScript**: Application-level JavaScript language
- **Theming**: Configurable themes
- **International**：Built-in complete internationalization program
- **Mock Server** Built-in mock data scheme
- **Authority** Built-in complete dynamic routing permission generation scheme.
- **Component** Multiple commonly used components are encapsulated twice

## Preview

## Documentation

[Document](https://ecv-atlas.atlassian.net/wiki/spaces/ActivoIntership/pages/1331593279/Gatherer)

## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui basic use
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## Install and use

- Get the project code

```bash
// CBMS
[x] git clone https://git-codecommit.us-west-2.amazonaws.com/v1/repos/billing-mgt-eterne

// MARS
[x] git clone https://git-codecommit.us-west-2.amazonaws.com/v1/repos/data-platform-front-end

// New


```

- Installation dependencies

```bash
// CBMS
cd billing-mgt-eterne
yarn install

// MARS
cd data-platform-front-end
yarn install

```

- run

```bash
yarn serve
```

- build

```bash
yarn build
```

- push docker image

```bash
// dev | uat | vX.X.X.X
bash entrypoint.sh dev
```

## Change Log

[CHANGELOG](./CHANGELOG.zh_TW.md)

## How to contribute

## Browser support

The `Chrome 80+` browser is recommended for local development

Support modern browsers, not IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Related warehouse

- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - Used for local and development environment data mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - Used for html template conversion and compression
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - Used for component library style introduction on demand
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - Used for online switching of theme colors and other color-related configurations
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - Used to pack compressed image resources
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - Used to pack input .gz|.brotil files
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - Used to quickly generate svg sprite

## Maintainer

## Discord

## License
