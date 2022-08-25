import * as df from "durable-functions";
import {callDaFail} from "../DA_fail/index";
import {callDaAfterFail} from "../DA_after-fail/index";
import {IOrchestrationFunctionContext} from "durable-functions/lib/src/iorchestrationfunctioncontext";

const RETRY = 5;
let attempt = 1;

export const doSuborch = df.orchestrator(function* (context) {
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
            context.df.continueAsNew(undefined);
        }
    }

    return;
});

export function startSuborchestrate(context: IOrchestrationFunctionContext) {
    return context.df.callSubOrchestrator("DO_suborch");
}
