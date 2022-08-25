import * as df from "durable-functions";
import {Context} from "@azure/functions";

export const httpMain = async function (context: Context, req: Request) {
    console.log('JavaScript HTTP trigger function processed a request.');

    const client = df.getClient(context);
    await client.startNew("DO_main");

    return {status: 200, body: "Returning successfully!"};
};

