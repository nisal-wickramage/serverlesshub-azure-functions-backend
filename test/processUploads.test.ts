import { MockContext } from "./mocks/mockContext";
import { readFileSync } from "fs";
import { join } from "path";
import blobTrigger from "../src/ProcessUploads";
import { mockCosmosClient } from "./mocks/mockCosmosClient";
import { CosmosClient } from "@azure/cosmos";

jest.mock("@azure/cosmos", () => {
    return {
        CosmosClient: jest.fn().mockImplementation(function(connection: string){
            return mockCosmosClient
        })
    }
});

const mockCosmosClientInstance = CosmosClient as jest.MockedClass<typeof CosmosClient>;

test("should persist the correct number of todo items to cosmos db", async ()=> {
    const mockContext = new MockContext();
    const fileBlob = readFileSync(join(__dirname, 'mocks/todoitems.csv'));

    blobTrigger(mockContext, fileBlob);

    expect(mockCosmosClientInstance).toHaveBeenCalledTimes(3);
});