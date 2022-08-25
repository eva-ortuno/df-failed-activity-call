import {Context} from "@azure/functions";
import {IOrchestrationFunctionContext} from "durable-functions/lib/src/iorchestrationfunctioncontext";


// activity function only throwing an error
export const daFail = async function (context: Context) {
    throw new Error("The activity function DA_fail has thrown an error. This is the error message.")

    return "DA_fail finished";
};


export function callDaFail(context: IOrchestrationFunctionContext) {
    return context.df.callActivity("DA_fail");
}
