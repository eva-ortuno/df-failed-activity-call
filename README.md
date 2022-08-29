# df-failed-activity-call

This repository is a minimal working veresion reproducing a bug witnessed while upgrading `durable-function` to version 2 : https://github.com/Azure/azure-functions-durable-js/releases/tag/2.0.2

The original bug happened when a durable activity failed and threw an error. After that the orchestrator that called it was blocked right after the execution of the failing activity function and all durable calls coming after where not processed despite being in a `try/catch` pattern. 

With this repository, we tried to reproduce the bug in a simpler environment. 

### Set-up 
