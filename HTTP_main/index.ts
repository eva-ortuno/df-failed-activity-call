import * as df from "durable-functions";
import {Context, HttpRequest} from "@azure/functions";

export const httpMain = async function (context: Context, req: HttpRequest) {
    const input = req.body;
    console.log('Starting process with input :', input);

    const client = df.getClient(context);
    await client.startNew("DO_main", undefined, input);

    return {status: 200, body: "Returning successfully!"};
};

