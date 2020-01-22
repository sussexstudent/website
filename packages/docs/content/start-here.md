---
title: Quick start
---

Prerequisites:
<!-- add some installation pre requisites here -->

1) Clone website repository
```bash
$ git clone https://github.com/sussexstudent/website.git
```

1) Navigate to website root folder and install dependencies with
```bash
$ yarn
```

1) Setup a few things using
```bash
$ yarn setup
```

1) We've built `comp` to manage our build process. To start comp with the development server. Navigate to `website/packages/website` and run the following command:
```bash
$ yarn serve
```

Woo! Have a gander at `http://localhost:3002`.

This is sussexstudent.com using locally built assets and a locally generated base template. The content is proxied from the live site.

You can go along and clone the msl-deploy and falmer repository as well, as you may use them in the future.
