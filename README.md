# star-wars-project

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
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



