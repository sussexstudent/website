**Deploying requires for your working directory to be clean.** This is to ensure the release revision via git is correct.

### CONFIGURATION PRE-STEPS
1. Navigate to your root folder and in the `.bash_profile` add the MSL variables along with the FALMER_TOKEN, ask website devs to provide this information.
1. Git clone the `mls-deploy` repository if you do not have it in your directory: `git clone https://github.com/sussexstudent/msl-deploy.git`, the directory structure could be something like this:
   * SU
     * mls-deploy
     * website
1. Run `yarn prepack` inside the mls-deploy folder to setup everything


### DEPLOYMENT STEPS
1. Go to the website directory inside packages: `website/packages/website`
1. Run `yarn deploy` in the terminal, this would generate a `deploy.json` file in the directory
1. From the website folder where the JSON file was written, run the following command: `../../../msl-deploy/bin/run deploy.json`
1. It would run an automatic script that will write the JSON file content into the Student Union website, if everything was successful, you will see your latest changes published on the website


### TROUBLESHOOTING
**1. Log in failed when running the deploy.json file**

Check if your username and password are correct logging in from the Student Union website, avoid using special characters for the username and do not add the _@sussexstudent.com_ at the end of the username (neither on the bash profile file), example: _msldeployeira_


Deploy will:

- build the frontend assets for production
- upload generated assets to S3.
- run the comp generator
	 
The comp generator will build the application and pre-render the MSL templates and any pages that have changed.

The generator will walk you through the changes, placing the markup automatically on your clipboard to paste in to the MSL Website Admin.
