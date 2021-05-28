import { v4 as uuid } from "uuid";
import { TodoItemRecord } from "../Models/todo-item-record";
import * as parseMultipart from "parse-multipart";
import { HttpRequestHeaders } from "@azure/functions";
import jwt_decode from "jwt-decode";

export function getUserId(headers: HttpRequestHeaders): string {
    const token = headers["authorization"].replace("Bearer ", "");
    const claims = jwt_decode(token);

    const scope = claims["scp"];
    if(scope && scope === "todo.owner") {
        return claims["sub"];
    }

    throw new Error("Unauthorized user.");
}

export function getGuid(): string {
    return uuid();
}

export function getUploadedFile(request: any, userId: string): Buffer{
    const boundary = parseMultipart.getBoundary(request.headers["content-type"]);
    if (boundary) {
        const files = parseMultipart.Parse(Buffer.from(request.body), boundary);
        const blob = setUserId(userId, files[0].data);
        return blob;
    }
    throw new Error("Upload Error");
}

export function setUserId(userId: string, blob: any): Buffer{
    const csvBuffer = Buffer.from(blob, 'ascii');

    const csvString = `${userId}\n${csvBuffer.toString('ascii')}`;

    return Buffer.from(csvString,'ascii');
}

export function getUserIdFromUpload(blob: any) {
    const csvBuffer = Buffer.from(blob);

    const csvString = csvBuffer.toString('ascii');

    return csvString.split('\n')[0];
}

export function getTodoItems(blob: any): TodoItemRecord[]{
    const userId = getUserIdFromUpload(blob);
    const csvBuffer = Buffer.from(blob);

    const csvString = csvBuffer.toString('ascii');
    
    const todoItems = csvString.split('\n').slice(1).map(row => {
        const columns = row.split(',');

        return {
            id: uuid(),
            userId,
            title: columns[0],
            description: columns[1]
        } as TodoItemRecord;
    });

    return todoItems;
}