"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'TodoistTasks',
        slug: "todoist-tasks",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://api.todoist.com/",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            task: {},
        }
    };
    entity = {
        "task": {
            "fields": [
                {
                    "name": "added_at",
                    "title": "Added At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was created, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "added_by_uid",
                    "title": "Added By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who created the task, or `null` if unknown."
                },
                {
                    "name": "assigned_by_uid",
                    "title": "Assigned By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who assigned the task, or `null` if unassigned."
                },
                {
                    "name": "assignee_id",
                    "title": "Assignee Id",
                    "type": "`$STRING`",
                    "short": "ID of the user to assign the task to."
                },
                {
                    "name": "checked",
                    "title": "Checked",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is completed."
                },
                {
                    "name": "child_order",
                    "title": "Child Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "Position of the task among sibling tasks."
                },
                {
                    "name": "completed_at",
                    "title": "Completed At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was completed, or `null` if active.",
                    "format": "date-time"
                },
                {
                    "name": "completed_by_uid",
                    "title": "Completed By Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user who completed the task, or `null` if active."
                },
                {
                    "name": "completed_count",
                    "title": "Completed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of times the task has been marked as completed."
                },
                {
                    "name": "content",
                    "title": "Content",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Task content."
                },
                {
                    "name": "day_order",
                    "title": "Day Order",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "Task order for day-based views."
                },
                {
                    "name": "deadline",
                    "title": "Deadline",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Deadline details for the task, or `null` when the task has no deadline."
                },
                {
                    "name": "deadline_date",
                    "title": "Deadline Date",
                    "type": "`$ANY`",
                    "short": "Updated deadline date in YYYY-MM-DD format.",
                    "format": "date"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Task description."
                },
                {
                    "name": "due",
                    "title": "Due",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Due date details for the task, or `null` when the task has no due date."
                },
                {
                    "name": "due_date",
                    "title": "Due Date",
                    "type": "`$STRING`",
                    "short": "Updated due date in RFC 3339 format or similar."
                },
                {
                    "name": "due_datetime",
                    "title": "Due Datetime",
                    "type": "`$STRING`",
                    "short": "Updated due date and time."
                },
                {
                    "name": "due_lang",
                    "title": "Due Lang",
                    "type": "`$STRING`",
                    "short": "Updated due date language code."
                },
                {
                    "name": "due_string",
                    "title": "Due String",
                    "type": "`$STRING`",
                    "short": "Updated human-readable representation of the due date."
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "Task duration details, or `null` when the task has no duration."
                },
                {
                    "name": "duration_unit",
                    "title": "Duration Unit",
                    "type": "`$ANY`",
                    "short": "Unit of time for duration."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the task."
                },
                {
                    "name": "is_collapsed",
                    "title": "Is Collapsed",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether the task is collapsed in the user's view."
                },
                {
                    "name": "is_deleted",
                    "title": "Is Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether the task is deleted."
                },
                {
                    "name": "labels",
                    "title": "Labels",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Names of labels attached to the task."
                },
                {
                    "name": "note_count",
                    "title": "Note Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "**Deprecated**: only returns 0 and is marked for removal."
                },
                {
                    "name": "order",
                    "title": "Order",
                    "type": "`$ANY`",
                    "short": "Position of the task in the project or section"
                },
                {
                    "name": "order_key",
                    "title": "Order Key",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task."
                },
                {
                    "name": "parent_id",
                    "title": "Parent Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the parent task, or `null` if this is a top-level task."
                },
                {
                    "name": "postponed_count",
                    "title": "Postponed Count",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of times the task's due date has been rescheduled by the user."
                },
                {
                    "name": "priority",
                    "title": "Priority",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    },
                    "short": "Task priority from 1 (normal) to 4 (urgent)."
                },
                {
                    "name": "project_id",
                    "title": "Project Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the project that contains the task."
                },
                {
                    "name": "responsible_uid",
                    "title": "Responsible Uid",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "String ID of the user responsible for the task, or `null` if unassigned."
                },
                {
                    "name": "section_id",
                    "title": "Section Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "String ID of the section that contains the task, or `null` if the task is not in a section."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Date and time when the task was last updated, or `null` if unknown.",
                    "format": "date-time"
                },
                {
                    "name": "user_id",
                    "title": "User Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "String ID of the user who owns the task."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "task",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/tasks",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cursor",
                                        "orig": "cursor",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "ids",
                                        "orig": "ids",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "label",
                                        "orig": "label",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 50
                                    },
                                    {
                                        "name": "parent_id",
                                        "orig": "parent_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "section_id",
                                        "orig": "section_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cursor",
                                    "ids",
                                    "label",
                                    "limit",
                                    "parent_id",
                                    "project_id",
                                    "section_id"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "public_key",
                                        "orig": "public_key",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "public_key"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/v1/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "tasks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "task_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map