import { CosmosClient} from "@azure/cosmos";
import { TodoItemRecord } from '../../src/Models/todo-item-record';


export function mockCosmosClient(todoItemRecords: TodoItemRecord[]):void {
    jest.mock("@azure/cosmos", () => {
        return {
            CosmosClient: jest.fn().mockImplementation((connectionString: string) => {
                return {
                    database: function(dbname: string) {
                        return {
                            container: function(container: string) {
                                return {
                                    items: {
                                        query: function(query: string) {
                                            return {
                                                fetchAll: function() {
                                                    return { resources: todoItemRecords };
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        };
    });
}
