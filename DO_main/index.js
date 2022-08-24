/* const df = require("durable-functions");
const callDaFail = require("DA_fail");
const callDaAfterFail = require("DA_after-fail");*/
// import {orchestrator} from "durable-functions";

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    try {
        yield callDaFail(context);
    } catch (e) {
        console.log("error caught - continue ...");

        yield callDaAfterFail(context);
    }

    return;
});

function callDaAfterFail(context) {
    return context.df.callActivity("Da_after-fail");
}

function callDaFail(context) {
    return context.df.callActivity("Da_fail");
}