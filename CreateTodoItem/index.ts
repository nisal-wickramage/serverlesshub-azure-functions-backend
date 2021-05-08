import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getGuid, getUserId } from "../Common/Utils";
import { NewTodoItem } from "../Models/new-todo-item";
import { TodoItem } from "../Models/todo-item";
import { TodoItemRecord } from "../Models/todo-item-record";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Create todo item started.');

    const newItem = req.body as NewTodoItem;

    if(newItem && newItem.title && newItem.description){
        const todoItem = {
            id: getGuid(),
            title: newItem.title,
            description: newItem.description
        } as TodoItem;

        const todoItemRecord = {
            userId: getUserId(),
            ...todoItem
        } as TodoItemRecord;

        context.bindings.todoItemRecord = todoItemRecord;

        context.res = {
            status:201,
            body: todoItem
        };
    } else {
        context.res = {
            status: 400
        };
        context.log.error('Create todo item invalid input.', context.invocationId, JSON.stringify(newItem));
    }
    context.log.info('Create todo item completed.');
    context.done();
};

export default httpTrigger;