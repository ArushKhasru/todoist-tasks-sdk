"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoistTasksError = void 0;
class TodoistTasksError extends Error {
    isTodoistTasksError = true;
    sdk = 'TodoistTasks';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TodoistTasksError = TodoistTasksError;
//# sourceMappingURL=TodoistTasksError.js.map