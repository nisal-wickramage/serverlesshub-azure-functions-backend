import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { NewTodoItem } from "./Models/new-todo-item";
import { TodoItem } from "./Models/todo-item";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Create todo item started.');

    const todoItem = req.body as NewTodoItem;

    if(todoItem && todoItem.title && todoItem.description){
        context.res = {
            status: 200,
            body: {
                id:'dummy-id',
                title: todoItem.title,
                descrition: todoItem.description
            } as TodoItem
        }
    } else {
        context.res = {
            status: 400
        }
        context.log.error('Create todo item invalid item.', context.executionContext, JSON.stringify(todoItem));
    }
    context.done();
    context.log.info('Create todo item completed.');
};

export default httpTrigger;