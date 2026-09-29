import { Context } from './Context';
declare class TodoistTasksError extends Error {
    isTodoistTasksError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TodoistTasksError };
