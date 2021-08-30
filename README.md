## About the App 

This app runs a test for "overlaps" on Annotation boxes and identifies whether boxes are truncating/occluding other boxes.

With additional time and resources, a feature enhancement with percentage overlap and  comparisons to the Occlusion/Truncation percentages could be useful as well as more well-designed JSON output method/format and a front-end or CLI from which to specify API parameters to call other Scale Accounts and Tasks.

## How to Use

Visiting the `/api` endpoint will automatically make a GET request to the Scale API with credentials specified in the `.env` file. If different API headers or parameters are required, they can be adjusted in the `.env`.

Once the response from Scale API is received, the `overlap-test-handler.js` module will will the overlap test and output a JSON file to the root directory to specify which Tasks and Annotation UUIDs have an overlap with another Annotation.

## Local Set up

Complete the following steps to run the App locally:

1. Clone this repository to your local machine with `git clone`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Run tests `npm test`