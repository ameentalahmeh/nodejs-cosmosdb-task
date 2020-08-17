// @ts-check

const config = {
    endpoint: "https://scstask-cosmosdb.documents.azure.com:443/",
    key: "Yhw3Tc2gpwAGKJtwT5jlEl9hLKQunbzNnOfiRlrthBShfFosQzFiVqi62g5PPd0ycMFgPDw11QZxfy3HodIfdw==",
    databaseId: "enumerationDB",
    containerId: "enums",
    partitionKey: { kind: "Hash", paths: ["/id"] }
};

module.exports = config;
