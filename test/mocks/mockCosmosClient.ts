import { TodoItemRecord } from "../../src/Models/todo-item-record";

export const mockCosmosClient = {
    database: function(dbname: string){
        return {
            container: function(id: string){
                return {
                    items: {
                        query: function(querySpec: {query: string}){
                            let todoItemRecords = [];
                            if(querySpec.query.includes('mock-user-id')){
                                todoItemRecords = [
                                    {
                                        id: 'mock-id',
                                        userId: 'mock-user-id',
                                        title: 'mock-title',
                                        description: 'mock-description'
                                    }
                                ] as TodoItemRecord[]
                            }
                            return {
                                fetchAll: function() {
                                    return { resources: todoItemRecords};
                                }
                            }
                        },
                        create: function (todoItemRecord:TodoItemRecord) {
                            return { resources: todoItemRecord};
                        }
                    }
                }
            }
        }
    }
}