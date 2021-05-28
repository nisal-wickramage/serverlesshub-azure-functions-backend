import httpTrigger from '../src/GetTodoItems';
import { TestContext } from './Mocks/testContext';
import { TodoItemRecord } from '../src/Models/todo-item-record';
import { CosmosClient } from "@azure/cosmos"
import { mocked } from 'ts-jest/utils';

let todoItems = [{
    id: 'mock-id',
    userId: 'mock-user-id',
    title: 'mock-title',
    description: 'mock-description'
} as TodoItemRecord];

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
                                                
                                                return { resources: todoItems };
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

const MockedCosmosClient = mocked(CosmosClient, true);

beforeEach(() => {
    MockedCosmosClient.mockClear();
})

it('should return 200 when todo items exists', async () => {
    const context = new TestContext();
    const request = {};
//processUploads.test.ts
    await httpTrigger(context, request);
    expect(context.res.status).toBe(200);
    expect(MockedCosmosClient).toHaveBeenCalledTimes(1);
})

it('should return 204 when todo items does not exists', async () => {
    const context = new TestContext();
    const request = {};
    todoItems = [];

    await httpTrigger(context, request);
    expect(context.res.status).toBe(204);
    expect(MockedCosmosClient).toHaveBeenCalledTimes(1);
})