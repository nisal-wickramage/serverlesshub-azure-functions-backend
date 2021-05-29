import blobTrigger from '../src/ProcessUploads';
import { TestContext } from './Mocks/testContext';
import { CosmosClient } from "@azure/cosmos"
import * as fs from "fs";
import * as path from "path";
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

it('should insert correct number of items to db', async () => {
    const context = new TestContext();

    const blob = fs.readFileSync(path.join(__dirname, 'testFiles/todo-items.csv'));
    
    await blobTrigger(context, blob);
    expect(context.res).toBe(undefined);
    expect(CosmosClientMock).toHaveBeenCalledTimes(3);
});