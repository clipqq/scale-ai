## About the App 

This app runs a test for background color conformity on Annotation boxes and identifies whether boxes are correctly annotated with the correct label given its background color. Using the `color-results.json` file, it is immediately actionable to provide the client with feedback on which Annotations to review and why.

## How to Use

Visiting the `/api` endpoint will automatically make a GET request to the Scale API with credentials specified in the `.env` file. If different API headers or parameters are required, they can be adjusted in the `.env`.

Once the response from Scale API is received, the `color-test-handler.js` module will run a test to check whether the background color of `traffic_control_sign` annotation labels matches `other`. It will output the `color-results.json` file for review.


## Reflection

With additional time and resources, I would implement additional similar tests for all known cases of sign label and their expected background colors. For example, `construction_sign` should probably be orange in most cases but this was not an absolute rule, so may be sorted into a different category of "minor warning". `policy_sign` labels also appear to be predominantly white background colors, but I am unclear as to whether this is absolutely their expected color; this might be sorted into "minor warning" as well. `non_visible_face` should always be `not_applicable` but there were no cases where this was an issue. It would likely be another "guranteed" error that could be tested. One Task also had a large Annotation at the bottom left that was obviously incorrect; a sign that takes up such a large space on the image would most likely have a clear background color. I would like to write a test that did something like analyze background color if the size is some percentage of the total image size. If the background color was `other` or `not_applicable` this would indicate an issue that should be reviewed.

## Local Set up

Complete the following steps to run the App locally:

1. Clone this repository to your local machine with `git clone`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Run tests `npm test`