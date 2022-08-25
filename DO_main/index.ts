import * as df from "durable-functions";
import {startSuborchestrate} from "../DO_suborch/index";

export const doMain = df.orchestrator(function* (context) {
    const input = context.df.getInput();

    yield startSuborchestrate(context, input);
    return "Finished sub orchestrator";
});

