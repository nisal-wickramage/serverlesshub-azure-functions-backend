import { TodoItemRecord } from "../../src/Models/todo-item-record";

let todoItems = [{
    id: 'mock-id',
    userId: 'mock-user-id',
    title: 'mock-title',
    description: 'mock-description'
} as TodoItemRecord];

export const cosmosClient = {
    database: function(dbname: string) {
        return {
            container: function(container: string) {
                return {
                    items: {
                        query: function(querySpec: { query: string }) {
                            let records = [];
                            if(querySpec.query.includes('mock-user-id')) {
                                records = todoItems;
                            }

                            return {
                                fetchAll: function() {
                                    return { resources: records };
                                }
                            }
                        },
                        create: function(todoItem: TodoItemRecord) {
                            return { resources: todoItem };
                        }
                    }
                }
            }
        }
    }
}