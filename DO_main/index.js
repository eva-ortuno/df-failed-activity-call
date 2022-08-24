const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    try {
        yield context.df.callActivity("DA_fail");
    } catch (e) {
        console.log("error caught - continue ...");

        yield context.df.callActivity("DA_after-fail");
    }

    return;
});