const df = require("durable-functions");

module.exports = async function (context, req) {
    console.log('JavaScript HTTP trigger function processed a request.');

    const client = df.getClient(context);
    await client.startNew("DO_main");

    return {status: 200, body: "Returning successfully!"};
}