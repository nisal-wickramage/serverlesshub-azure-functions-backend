import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserId } from "../Common/Utils";
import { editTodoItem } from "../DataAccess/todo-item-repository";
import { TodoItem } from "../Models/todo-item";
import { TodoItemRecord } from "../Models/todo-item-record";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Edit todo item started.');
    
    const id = context.bindingData.id;
    const userId = getUserId(req.headers);

    const todoItem = req.body as TodoItem;

    if(todoItem && todoItem.title && todoItem.description) {
        const todoItemRecord = {
            id: id,
            userId: userId,
            title: todoItem.title,
            description: todoItem.description
        } as TodoItemRecord;

        try{
            await editTodoItem(id, userId,todoItemRecord);
            context.res = {
                status: 200,
                body: todoItemRecord
            };
        }catch(error){
            if(error.message.includes("Entity with the specified id does not exist in the system")){
                context.res = {
                    status:404
                };
            } else {
                throw error;
            }
        }
    } else {
        context.res = {
            status: 400
        };
    }
    context.log.info('Edit todo item completed.');
    context.done();
};

export default httpTrigger;