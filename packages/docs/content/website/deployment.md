**Deploying requires for your working directory to be clean.** This is to ensure the release revision via git is correct.

```bash
$ yarn run deploy
```

Deploy will:

- build the frontend assets for production
- upload generated assets to S3.
- run the comp generator
	 
The comp generator will build the application and pre-render the MSL templates and any pages that have changed.

The generator will walk you through the changes, placing the markup automatically on your clipboard to paste in to the MSL Website Admin.
