const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    yield startSuborchestrate(context);
    return "Finished sub orchestrator";
});

function startSuborchestrate(context) {
    return context.df.callSubOrchestrator("DO_suborch");
}