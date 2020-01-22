---
title: Architecture Overview
---

The main website [SussexStudent](https://www.sussexstudent.com/) is hosted by [MSL](https://www.sussexstudent.com/msl) and pages are served by this provider. We host our API service we call [Falmer](https://falmer.sussexstudent.com/).

The entire front-end architecture is built with React components. The back-end architecture is built using the MSL services and our API based on Django framework.

**Database**
We do not deal with the database directly since it is all managed by MSL and we create the models to communicate with the database through the Django framework.

**CMS**
Some pages are built on Wagtail wich is a CMS service from our API, these pages render on top of the MSL pages. Our API takes the data from MSL and we use this to render the new pages on Wagtail.

### Main Technologies
We use some open source projects to aid the building of the website:

- [React](https://reactjs.org/) - Javascript library for building user interfaces. The entire front end is built with React components.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript. We use this to create React components.
- [Django Framework](https://www.djangoproject.com/) - Python Web framework, our API is built using Django.
- [Wagtail CMS](https://wagtail.io/) - A Django CMS, we use it for some of our website pages that need more complex features.
- [node.js](https://nodejs.org/en/)
- [webpack](https://webpack.js.org/) - A static module bundler for the JS app.
- [yarn](https://yarnpkg.com/lang/en/) - Package dependency management.

More details from each technology on the following sections.

