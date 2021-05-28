import blobTrigger from '../src/ProcessUploads';
import { TestContext } from './Mocks/testContext';
import { TodoItemRecord } from '../src/Models/todo-item-record';
import { CosmosClient } from "@azure/cosmos"
import { mocked } from 'ts-jest/utils';
import * as fs from "fs";
import * as path from "path";

jest.mock("@azure/cosmos", () => {
    return {
        CosmosClient: jest.fn().mockImplementation((connectionString: string) => {
            return {
                database: function(dbname: string) {
                    return {
                        container: function(container: string) {
                            return {
                                items: {
                                    create: function(todoItem: TodoItemRecord) {
                                        return { resources: todoItem };
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

const MockedCosmosClient = mocked(CosmosClient, true);

beforeEach(() => {
    MockedCosmosClient.mockClear();
})

it('should insert correct number of items to db', async () => {
    const context = new TestContext();

    const blob = fs.readFileSync(path.join(__dirname, 'testFiles/todo-items.csv'));
    
    await blobTrigger(context, blob);
    expect(context.res).toBe(undefined);
    expect(MockedCosmosClient).toHaveBeenCalledTimes(3);
});