# Configuration

## Setting your Falmer API token

Some scripts and other development stuff require authenticated access to Falmer.

Once you have the correct permissions set on your Falmer account you can generate an API token from Falmer itself.

Add the token as an environment variable to your profile like so:

```shell
  export FALMER_TOKEN="YOUR_TOKEN"
```

## AWS Credentials

You will need an AWS secret and key with the permissions to upload to S3.

This should be setup with s3cmd.

