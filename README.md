## Purpose

A proof of concept on how test results could be delivered through Slack on demand. An integration between the customer’s ML platform (ScaleAI) and Slack will both trigger the analysis tests and output the results as downloadable JSON files through Slack.

## Dev Notes

Workspace channel:
https://ta-project-workspace.slack.com/archives/C02DR34KL0P

The following slash commands are available in the above channel:
    `/overlap-test`
    `/color-test`
    `/time-test`

Slack App:
https://api.slack.com/apps/A02EVFEQ8C8


## Local Set up

Complete the following steps to run the App locally:

1. Clone this repository to your local machine with `git clone`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Run tests `npm test`