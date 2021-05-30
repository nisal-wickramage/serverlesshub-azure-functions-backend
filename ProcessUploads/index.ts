import { AzureFunction, Context } from "@azure/functions"
import { getTodoItems } from "../Common/Utils";
import { createTodoItem } from "../DataAccess/todo-item-repository";

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log.info("Process todo items started.");
    context.log.info("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");

    const todoItems = getTodoItems(myBlob);
    todoItems.forEach(async item => {
        await createTodoItem(item);
    });

    context.log.info("Process todo items completed.");
    context.done();
};

export default blobTrigger;
