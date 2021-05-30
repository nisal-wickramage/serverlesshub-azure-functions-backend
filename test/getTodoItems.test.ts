import httpTrigger from "../src/GetTodoItems";
import { MockContext } from "./mocks/mockContext";
import * as util from "../src/Common/Utils";
import { mockCosmosClient } from "./mocks/mockCosmosClient";


jest.mock("@azure/cosmos", () => {
    return {
        CosmosClient: function(connection: string){
            return mockCosmosClient
        }
    }
});

test("should return http status 200 when todo items exists", async () => {
    jest.spyOn(util, "getUserId").mockReturnValue('mock-user-id');
    const request = {};

    const mockContext = new MockContext();

    await httpTrigger(mockContext, request);

    expect(mockContext.res.status).toBe(200);
    expect(mockContext.res.body.length).toBe(1);
});

test("should return http status 204 when no todo items exist", async () => {
    jest.spyOn(util, "getUserId").mockReturnValue('mock-user2-id');
    const request = {};

    const mockContext = new MockContext();

    await httpTrigger(mockContext, request);

    expect(mockContext.res.status).toBe(204);
});