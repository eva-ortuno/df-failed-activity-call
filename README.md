# df-failed-activity-call

This repository is a minimal working veresion reproducing a bug witnessed while upgrading `durable-function` to version 2 : https://github.com/Azure/azure-functions-durable-js/releases/tag/2.0.2

The original bug happened when a durable activity failed and threw an error. After that the orchestrator that called it was blocked right after the execution of the failing activity function and all durable calls coming after where not processed despite being in a `try/catch` pattern. 

With this repository, we tried to reproduce the bug in a simpler environment. 

### Set-up 

1. Clone the repository : `git clone git@github.com:eva-ortuno/df-failed-activity-call.git`
2. Install DurableTask :  `func extensions install -p Microsoft.Azure.WebJobs.Extensions.DurableTask -v 2.5.0`
3. In the root directory of the project, `npm install`
4. To start the project, `tsc & func start` 

![image](https://user-images.githubusercontent.com/90448715/187197406-d3c5229c-9877-402e-ac46-258dc6f0b97c.png)

5. Trigger the http request `http://localhost:7071/api/HTTP_main` - use Postman or Insmnia for example

The following behaviour should be observed : the orchestrator, supposed to be retried 5 times, stops right after the failed activity function `DA_fail` and exit the orchestrator without retrying. 

![image](https://user-images.githubusercontent.com/90448715/187197332-3b5a64f8-60eb-4853-a681-3db99822c4eb.png)


### What triggered the error ? 
After many attempt, the bug was reproduced when installing the `DurableTask` extension : https://github.com/Azure/azure-functions-durable-extension The required minimum version is 2.4.1 - see log when version 1.8.0 is installed: 
![image](https://user-images.githubusercontent.com/90448715/187208900-7385fc12-fa10-4100-84aa-72f2d330b7a4.png)
From version 2.6.0 onwards, the bug is not observed anymore.
