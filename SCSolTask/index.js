const fs = require('fs');
const path = require('path');
const getEnums = require("../database/getEnumQuery");
const { getEnumController, checkEnumValueController } = require("../controllers");

module.exports = async function (context, req) {

    let { action } = req.params;
    let htmlContent = await fs.readFileSync(path.resolve(__dirname, '..', 'views', 'index.html'), 'UTF-8');

    // Query for get stored Enumerations.
    let enumerations = await getEnums();

    switch (action) {
        case undefined:
            context.res = {
                headers: {
                    "Content-Type": "text/html"
                },
                body: htmlContent,
            }
            break;
            
        case "getEnum":
            getEnumController(context, req, enumerations);
            break;

        case "checkEnumValue":
            checkEnumValueController(context, req, enumerations);
            break;

        default:
            context.res = {
                headers: {
                    "Content-Type": "text/html"
                },
                body: '<h1> Page not found !!! </h1>'
            }
            break;
    }
}