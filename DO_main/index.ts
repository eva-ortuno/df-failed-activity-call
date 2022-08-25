import * as df from "durable-functions";
import {startSuborchestrate} from "../DO_suborch/index";

export const doMain = df.orchestrator(function* (context) {
    yield startSuborchestrate(context);
    return "Finished sub orchestrator";
});

