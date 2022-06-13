# star-wars-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Project Setup

Installed Vue from official Website, came with a Hello World project and different libraries  like router 

Used PrimeVue library due to previous experience with the angular counterpart. I used this 

because it is suited for simple functionalities, and to get some default styling 

Used different components from Primevue: Card, ScrollPanel, InputText

Used VueUniversalModal due to the simplicity of using the portal/teleport functionality of vue with it.

Project layout

Used router for navigating between entities components

Defined a component for each entity

Define interface for each entity

Each component is very similar, this could have been a general component but for this assignment

i chose to go for the easier implementation due to time restraints, and not needed reusability in future

We use a DataService with Axios and we define a get method for every entity on the api

We define labels that change the view from List to Grid on click

We define a text Input to get the search input 

We use a for-loop in an html tag to generate cards for each entity which display some information

We use the PopupModal to display the full details of the clicked entity

Press close to exit the PopupModal  



