import { CosmosClient } from "@azure/cosmos";
import { TodoItemRecord } from "../Models/todo-item-record";

function getCosmosDbContainer() {
    const cosmosDbConnectionString = process.env["shdevdb_DOCUMENTDB"];

    const client = new CosmosClient(cosmosDbConnectionString);
    const database = client.database("todocontainer");
    const container = database.container("todoItems");

    return container;
}

export async function getAllTodoItems(userId: string): Promise<TodoItemRecord[]> {
    const querySpec = {
        query: `SELECT * from c WHERE c.userId = '${userId}'` 
      };
      
    const container = getCosmosDbContainer();
    const { resources: todoItems } = await container.items
        .query(querySpec)
        .fetchAll();

    return todoItems.map(item => {
        return {
            id: item.id,
            userId: item.userId,
            title: item.title,
            description: item.description
        } as TodoItemRecord;
    });
}

export async function deleteTodoItem(id: string, userId: string): Promise<any> {
    const container = getCosmosDbContainer();
    const { resource: result } = await container.item(id, userId).delete();
    return result;
}

export async function editTodoItem(id: string, userId: string, todoItem: TodoItemRecord): Promise<TodoItemRecord> {
    const container = getCosmosDbContainer();
    const { resource: updatedItem } = await container
                                        .item(id, userId)
                                        .replace(todoItem);
    return updatedItem;
}