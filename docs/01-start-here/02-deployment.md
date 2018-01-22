# Deployment
**Deploying requires for your working directory to be clean** This is to ensure the release revision via git is correct.

```bash
$ yarn run deploy
```

Deploy will build the assets for production and upload them to the S3. After the generator will run. Within the website admin, the templates should be updated as the generate instructs, automatically putting the templates on your clipboard.
