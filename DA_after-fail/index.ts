import {Context} from "@azure/functions";
import {IOrchestrationFunctionContext} from "durable-functions/lib/src/iorchestrationfunctioncontext";

export const daAfterFail = async function (context: Context) {
    console.log("Executing the activity function after fail!")
    return "DA_after-fail finished";
};


export function callDaAfterFail(context: IOrchestrationFunctionContext) {
    return context.df.callActivity("DA_after-fail");
}
