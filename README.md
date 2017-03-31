# sussexstudent.com

The University of Sussex Students' Union website frontend.

A set of components used for building pages, along with prebuilt pages and templates that can be generated.

## Source
`/src` contains frontend assets:
* PostCSS styles in components via BEM
* React Components where needed for interactivity such as the society search & filtering (*coming soon*)

## Generator
See `/generator`

To ease the use of components, they are pre-built as React components are rendered to static markup in a number of ways. The generator can be used to build full pages and kept inside of git, for example the Homepage. Our docs also include a Composer to create pages of components visually on the fly without any need of writing markup, handy for societies to use in their microsites.

## Developing
Install dependencies with
```bash
$ yarn
```

This might take a little while as this gets everything used for the building the frontend, used in the frontend and dependencies for the generator too. 

We use Webpack to build and bundle our assets. The generator has proxying and local page capabilites. Start the development server with

```bash
$ yarn run serve
```

Woo! Have a gander at `http://localhost:3002`.

This is sussexstudent.com using locally built assets and a locallly generated base template. The content is proxied from the live site.

To aid in developing pages, locally rendered pages can be accessed under the `/~/` path, for example `http://localhost:3002/~/get-involved` - this uses generators `get-involved` template to build this file.

## Docs
Documentation for the components and more lives in `/docs`. Within the docs lives a composer application for building pages from components visually.

## Deploying
```bash
$ yarn run deploy
```
Deploy will build the assets for production and upload them to the CDN. After the generator will run. Within the website admin, the templates should be updated as the generate instructs, automatically putting the templates on your clipboard.

