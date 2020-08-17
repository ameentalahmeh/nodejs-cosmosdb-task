const querystring = require('querystring');

const getEnumController = (context, req, enumerations) => {

    // Extract Input Attributes from req.
    let reqBody = querystring.parse(req.body);

    const req_lang_code = reqBody.lang_code;
    const req_enum_code = reqBody.enum_code;

    // Check inputs value
    if (req_lang_code == "Select language" || req_enum_code == "Select enumeration") {
        context.res = {
            body: {
                success: false,
                msgErr: "You have to select the both of the inputs fields"
            }
        }
    } else {
        // Extract Pairs Of Matched Enums.
        if (req.body && req_enum_code && req_lang_code) {
            let matchedEnums = enumerations.filter(enumeration =>
                enumeration.enum_code.toLowerCase() == req_enum_code.toLowerCase() && enumeration.lang_code.toLowerCase() == req_lang_code.toLowerCase()
            );

            // Prepare Returend Enums
            let enums = [];
            matchedEnums.forEach(enumeration => {
                enums.push({
                    "Enum value code": enumeration.enum_value_code,
                    "Enum value name": enumeration.enum_value_name
                })
            })

            // Response.
            if (enums.length <= 0) {
                context.res = {
                    body: {
                        success: true,
                        enums: []
                    }
                }
            } else {
                context.res = {
                    body: {
                        success: true,
                        enums
                    }
                }
            }
        } else {
            context.res = {
                body: {
                    success: false,
                    errMsg: 'You missing some of query search parameters',
                }
            }
        }
    }
};

const checkEnumValueController = (context, req, enumerations) => {

    // Extract Input Attributes from req.
    let reqBody = querystring.parse(req.body);

    const req_enum_code = reqBody.enum_code;
    const req_enum_value_code = reqBody.enum_value_code;

    console.log(req_enum_code, req_enum_value_code);

    // Check inputs value
    if (req_enum_code == "Select enumeration" || req_enum_value_code == "") {
        context.res = {
            body: {
                success: false,
                msgErr: "You have to input the both of the inputs fields"
            }
        }
    } else {
        if (req.body && req_enum_code && req_enum_value_code) {

            // Extract Matched Enums.
            let matchedEnums = enumerations.find(enumeration => enumeration.enum_code.toLowerCase() == req_enum_code.toLowerCase() && enumeration.enum_value_code.toLowerCase() == req_enum_value_code.toLowerCase());

            // Response
            context.res = {
                body: matchedEnums ? {
                    success: true,
                    "checkResult": true,
                    "enum_code": req_enum_code,
                    "enum_value_code": req_enum_value_code,
                } : {
                        success: true,
                        "checkResult": false,
                        "enum_code": req_enum_code,
                        "enum_value_code": req_enum_value_code,
                    }
            };

        } else {
            context.res = {
                body: {
                    success: false,
                    errMsg: 'You missing some of query search parameters',
                }
            }
        }

    }
}

module.exports = { getEnumController, checkEnumValueController };

