import { BindingDefinition, Context, ContextBindingData, ContextBindings, ExecutionContext, HttpRequest, Logger, TraceContext } from "@azure/functions";


export class TestContext implements Context {
    invocationId: string;
    executionContext: ExecutionContext;
    bindings: ContextBindings = getBindings();
    bindingData: ContextBindingData = getContextBindingData();
    traceContext: TraceContext;
    bindingDefinitions: BindingDefinition[];
    done(err?: string | Error, result?: any): void {
    }
    log: Logger = getLogger();
    req?: HttpRequest;
    res?: { [key: string]: any; };
}

function getBindings(): ContextBindings {
    return {
        todoItemRecord: null
    } as ContextBindings;
}

function getContextBindingData(): ContextBindingData {
    return {
        name: 'todo-items.csv'
    } as ContextBindingData;
}

function getLogger(): Logger {
    return {
        info: function(...args: any[]) { },
        error: function(...args: any[]) { }
    } as Logger;
}