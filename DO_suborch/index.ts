import * as df from "durable-functions";
import {callDaFail} from "../DA_fail/index";
import {callDaAfterFail} from "../DA_after-fail/index";
import {IOrchestrationFunctionContext} from "durable-functions/lib/src/iorchestrationfunctioncontext";

const RETRY = 5;
let attempt = 1;

export const doSuborch = df.orchestrator(function* (context) {
    let res;
    const input = context.df.getInput();
    console.log(`Orchestrator execution attempt ${attempt} over ${RETRY} allowed with input ${input}`);
    try {
        yield callDaFail(context, input);
    } catch (e) {
        console.log("error caught - continue ...");

        res = yield callDaAfterFail(context, input);

        const currentDate = context.df.currentUtcDateTime;
        const nextDate = new Date(currentDate.getTime() + 5 * 1e3);
        const timer = context.df.createTimer(nextDate);

        if (attempt < RETRY) {
            console.log("Waiting for 5 seconds before resuming orchestrator");
            yield timer;
            attempt ++;
            context.df.continueAsNew(res);
        }
    }

    console.log("Process finished with result : ", res);
    return res;
});

export function startSuborchestrate(context: IOrchestrationFunctionContext, input: unknown) {
    return context.df.callSubOrchestrator("DO_suborch", input);
}
