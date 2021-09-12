module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    APIURL: process.env.API_URL,
    APIKEY: process.env.API_KEY,
    TASK_STATUS: process.env.TASK_STATUS,
    PROJECT_NAME: process.env.PROJECT_NAME,
    CUSTOMER_REVIEW_STATUS: process.env.CUSTOMER_REVIEW_STATUS,

    SLACKAPIURL: process.env.SLACK_URL,
    SLACKAPIKEY: process.env.SLACK_KEY,
}
