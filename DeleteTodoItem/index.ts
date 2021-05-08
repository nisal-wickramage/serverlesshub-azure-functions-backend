import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserId } from "../Common/Utils";
import { deleteTodoItem } from "../DataAccess/todo-item-repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Delete todo item started.');
    
    const id = context.bindingData.id;
    const userId = getUserId();

    try{
        await deleteTodoItem(id, userId);
        context.res = {
            status: 204
        };
    }catch(error){
        if(error.message.includes("Entity with the specified id does not exist in the system")){
            context.res = {
                status: 404
            };
        } else {
            throw error;
        }
    }
    context.log.info('Delete todo item completed.');
    context.done();
};

export default httpTrigger;