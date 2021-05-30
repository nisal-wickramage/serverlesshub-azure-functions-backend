import { BindingDefinition, Context, ContextBindingData, ContextBindings, ExecutionContext, HttpRequest, Logger, TraceContext } from "@azure/functions";

export class MockContext implements Context{
    invocationId: string;
    executionContext: ExecutionContext;
    bindings: ContextBindings = {
        todoItemRecord: null
    } as ContextBindings;
    bindingData: ContextBindingData;
    traceContext: TraceContext;
    bindingDefinitions: BindingDefinition[];
    log: Logger = {
        info: function(...args: any[]){},
        error: function(...args: any[]){}
    } as Logger;
    done(err?: string | Error, result?: any): void {
        
    }
    req?: HttpRequest;
    res?: { [key: string]: any; };

}