import {Context} from "@azure/functions";
import {IOrchestrationFunctionContext} from "durable-functions/lib/src/iorchestrationfunctioncontext";

export const daAfterFail = async function (context: Context, input: any) {
    console.log("Executing the activity function after fail with input : ", input)
    const res = input + " _ did after fail activity";
    return res;
};


export function callDaAfterFail(context: IOrchestrationFunctionContext, input: any) {
    return context.df.callActivity("DA_after-fail", input);
}
