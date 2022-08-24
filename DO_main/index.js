const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];

    const input = context.df.getInput();
    console.log(input);

    // Replace "Hello" with the name of your Durable Activity Function.
    outputs.push(yield context.df.callActivity("DA_fail", "Tokyo"));

    // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
    return outputs;
});