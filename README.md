# sussexstudent.com

The University of Sussex Students' Union website frontend.

### Components & assets
`/src` contains frontend assets. Generally focused around a component based architecture.

#### Stying
* Post-processed via PostCSS, (largely using cssnext plugins and some custom mixins)
* BEMish
* No linting yet! :O


#### JavaScript
* TypeScript


### Comp - [sussexstudent/comp](https://github.com/sussexstudent/comp)
We've written a helper library for managing our workflow.

Comp aids in a) developing our site locally, b) deploying our site.

## Projects

### website `src/projects/website`
Our main website, sussexstudent.com.

* Entire site is built as a statically rendered React application, any component can opt in to be 'hydrated' on the client for interactivity.
* Coding splitting of 'modules' where possible
* Polyfilling via the FT's Polyfill.io service

### falmer `src/projects/falmer`
Admin management single page application for Falmer our services api ([sussexstudent/falmer](https://github.com/sussexstudent/falmer)).

### app `src/projects/app`
Toy, experiment mobile application consuming falmer's api. Uses React Native.


## Getting started

### Developing
Install dependencies with
```bash
$ yarn
```

This might take a little while as this gets everything used for the building the frontend, used in the frontend and dependencies for the generator too. 

We use Webpack to build and bundle our assets. The generator has proxying and local page capabilities. Start the development server with

```bash
$ yarn run serve
```

Woo! Have a gander at `http://localhost:3002`.

This is sussexstudent.com using locally built assets and a locally generated base template. The content is proxied from the live site.

To aid in developing pages, locally rendered pages can be accessed under the `/~/` path, for example `http://localhost:3002/~/get-involved` - this uses generators `get-involved` template to build this file.

### Deploying
**Deploying requires for your working directory to be clean** This is to ensure the release revision via git is correct.

```bash
$ yarn run deploy
```
Deploy will build the assets for production and upload them to the CDN. After the generator will run. Within the website admin, the templates should be updated as the generate instructs, automatically putting the templates on your clipboard.


