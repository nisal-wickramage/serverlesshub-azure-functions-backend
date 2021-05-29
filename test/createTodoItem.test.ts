import httpTrigger from '../src/CreateTodoItem';
import { NewTodoItem } from '../src/Models/new-todo-item';
import { TestContext } from './Mocks/testContext';
import * as util from "../src/Common/Utils";

jest.spyOn(util, 'getUserId').mockReturnValue('mock-user-id');

it('should set todo item record output binding when validation pass', async () => {
    const todoItem = {
        title: 'mock-title',
        description: 'mock-description'
    } as NewTodoItem;

    const request = {
        body: todoItem
    };

    const context = new TestContext();

    await httpTrigger(context, request);

    expect(context.res.status).toBe(201);
    expect(context.res.body.title).toBe(todoItem.title);
    expect(context.res.body.description).toBe(todoItem.description);
})

it('should return http status 400 for validation failures', async () => {
    const todoItem = {
        title: 'mock-title'
    } as NewTodoItem;

    const request = {
        body: todoItem
    };

    const context = new TestContext();

    await httpTrigger(context, request)

    expect(context.res.status).toBe(400);
})