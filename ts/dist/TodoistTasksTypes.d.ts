export interface Task {
    added_at: any;
    added_by_uid: any;
    assigned_by_uid: any;
    assignee_id?: string;
    checked: boolean;
    child_order: number;
    completed_at: any;
    completed_by_uid: any;
    completed_count: number;
    content: string;
    day_order: number;
    deadline: any;
    deadline_date?: any;
    description: string;
    due: any;
    due_date?: string;
    due_datetime?: string;
    due_lang?: string;
    due_string?: string;
    duration: number;
    duration_unit?: any;
    id: string;
    is_collapsed: boolean;
    is_deleted: boolean;
    labels: any[];
    note_count: number;
    order?: any;
    order_key: any;
    parent_id: string;
    postponed_count: number;
    priority: number;
    project_id: string;
    responsible_uid: any;
    section_id: string;
    updated_at: any;
    user_id: string;
}
export interface TaskLoadMatch {
    id: string;
    public_key?: any;
}
export interface TaskListMatch {
    cursor?: any;
    ids?: any;
    label?: string;
    limit?: number;
    parent_id?: string;
    project_id?: string;
    section_id?: string;
}
export interface TaskCreateData {
    id: string;
    added_at: any;
    added_by_uid: any;
    assigned_by_uid: any;
    assignee_id?: string;
    checked: boolean;
    child_order: number;
    completed_at: any;
    completed_by_uid: any;
    completed_count: number;
    content: string;
    day_order: number;
    deadline: any;
    deadline_date?: any;
    description: string;
    due: any;
    due_date?: string;
    due_datetime?: string;
    due_lang?: string;
    due_string?: string;
    duration: number;
    duration_unit?: any;
    is_collapsed: boolean;
    is_deleted: boolean;
    labels: any[];
    note_count: number;
    order?: any;
    order_key: any;
    parent_id: string;
    postponed_count: number;
    priority: number;
    project_id: string;
    responsible_uid: any;
    section_id: string;
    updated_at: any;
    user_id: string;
}
export interface TaskRemoveMatch {
    id: string;
}
