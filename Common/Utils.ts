import { v4 as uuid } from "uuid";

export function getUserId(): string {
    return 'dummy-userId';
}

export function getGuid(): string {
    return uuid();
}