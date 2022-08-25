const df = require("durable-functions");

const RETRY = 5;
let attempt = 1;

module.exports = df.orchestrator(function* (context) {
    console.log(`Orchestrator execution attempt ${attempt} over ${RETRY} allowed`);
    try {
        yield callDaFail(context);
    } catch (e) {
        console.log("error caught - continue ...");

        yield callDaAfterFail(context);

        const currentDate = context.df.currentUtcDateTime;
        const nextDate = new Date(currentDate.getTime() + 5 * 1e3);
        const timer = context.df.createTimer(nextDate);

        if (attempt < RETRY) {
            console.log("Waiting for 5 seconds before resuming orchestrator");
            yield timer;
            attempt ++;
            context.df.continueAsNew();
        }
    }

    return;
});

function callDaAfterFail(context) {
    return context.df.callActivity("DA_after-fail");
}

function callDaFail(context) {
    return context.df.callActivity("DA_fail");
}