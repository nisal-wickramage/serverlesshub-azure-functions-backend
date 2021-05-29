import httpTrigger from '../src/GetTodoItems';
import { TestContext } from './Mocks/testContext';
import { CosmosClient } from "@azure/cosmos"
import * as util from "../src/Common/Utils";
import { cosmosClient } from './Mocks/cosmosClient';

jest.mock("@azure/cosmos", () => {
    return {
        CosmosClient: jest.fn().mockImplementation((connectionString: string) => {
            return cosmosClient
        })
    };
});

const CosmosClientMock = CosmosClient as jest.MockedClass<typeof CosmosClient>;

beforeEach(() => {
    CosmosClientMock.mockClear();
})

it('should return 200 when todo items exists', async () => {
    jest.spyOn(util, 'getUserId').mockReturnValue('mock-user-id');
    const context = new TestContext();
    const request = {};
    
    await httpTrigger(context, request);
    expect(context.res.status).toBe(200);
    expect(CosmosClientMock).toHaveBeenCalledTimes(1);
})

it('should return 204 when todo items does not exists', async () => {
    jest.spyOn(util, 'getUserId').mockReturnValue('mock-user2-id');
    const context = new TestContext();
    const request = {};

    await httpTrigger(context, request);
    expect(context.res.status).toBe(204);
    expect(CosmosClientMock).toHaveBeenCalledTimes(1);
})