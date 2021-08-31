## About the App 

This app runs a test for background color conformity on Annotation boxes and identifies whether boxes are correctly annotated with the correct label given its background color. Using the `color-results.json` file, it is immediately actionable to provide the client with feedback on which Annotations to review and why.

With additional time and resources, I would implement additional similar tests for all known cases of sign label and their expected background colors.

## How to Use

Visiting the `/api` endpoint will automatically make a GET request to the Scale API with credentials specified in the `.env` file. If different API headers or parameters are required, they can be adjusted in the `.env`.

Once the response from Scale API is received, the `color-test-handler.js` module will run a test to check whether the background color of `traffic_control_sign` annotation labels matches `other`. It will output the `color-results.json` file for review.

## Local Set up

Complete the following steps to run the App locally:

1. Clone this repository to your local machine with `git clone`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Run tests `npm test`