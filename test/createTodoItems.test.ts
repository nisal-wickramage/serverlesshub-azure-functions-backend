import httpTrigger from "../src/CreateTodoItem";
import { NewTodoItem } from "../src/Models/new-todo-item";
import { MockContext } from "./mocks/mockContext";
import * as util from "../src/Common/Utils";

test("first jest test", () => {
    const sum = 1 + 2;
    expect(sum).toBe(3);
});

jest.spyOn(util, "getUserId").mockReturnValue('mock-user-id');

test("should save and return todo item when validation succeed", async () => {
    const todoItem = {
        title: 'mock-title',
        description: 'mock-description'
    } as NewTodoItem;

    const request = {
        body: todoItem
    };

    const mockContext = new MockContext();

    await httpTrigger(mockContext, request);

    expect(mockContext.res.status).toBe(201);
    expect(mockContext.res.body.title).toBe(request.body.title);
    expect(mockContext.res.body.description).toBe(request.body.description);
    expect(mockContext.bindings.todoItemRecord.title).toBe(request.body.title);
    expect(mockContext.bindings.todoItemRecord.description).toBe(request.body.description);
});

test("should return http status 400 when validation fails", async () => {
    const todoItem = {
        title: 'mock-title'
    } as NewTodoItem;

    const request = {
        body: todoItem
    };

    const mockContext = new MockContext();

    await httpTrigger(mockContext, request);

    expect(mockContext.res.status).toBe(400);
});