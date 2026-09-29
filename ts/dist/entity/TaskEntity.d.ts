import { TodoistTasksEntityBase } from '../TodoistTasksEntityBase';
import type { TodoistTasksSDK } from '../TodoistTasksSDK';
import type { Control } from '../types';
import type { Task, TaskLoadMatch, TaskListMatch, TaskCreateData, TaskRemoveMatch } from '../TodoistTasksTypes';
declare class TaskEntity extends TodoistTasksEntityBase<Task> {
    constructor(client: TodoistTasksSDK, entopts: any);
    make(this: TaskEntity): TaskEntity;
    load(this: any, reqmatch?: TaskLoadMatch, ctrl?: Control): Promise<TaskEntity>;
    list(this: any, reqmatch?: TaskListMatch, ctrl?: Control): Promise<TaskEntity[]>;
    create(this: any, reqdata?: TaskCreateData, ctrl?: Control): Promise<TaskEntity>;
    remove(this: any, reqmatch?: TaskRemoveMatch, ctrl?: Control): Promise<TaskEntity>;
}
export { TaskEntity };
