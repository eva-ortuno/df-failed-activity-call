import {Context} from "@azure/functions";
import {IOrchestrationFunctionContext} from "durable-functions/lib/src/iorchestrationfunctioncontext";


// activity function only throwing an error
export const daFail = async function (context: Context, input: any) {

    throw new Error("The activity function DA_fail has thrown an error. This is the error message.")

    return input + "_ DA_fail finished";
};


export function callDaFail(context: IOrchestrationFunctionContext, input: any) {
    return context.df.callActivity("DA_fail", input);
}
