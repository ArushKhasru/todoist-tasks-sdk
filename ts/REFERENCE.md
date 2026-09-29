# TodoistTasks TypeScript SDK Reference

Complete API reference for the TodoistTasks TypeScript SDK.


## TodoistTasksSDK

### Constructor

```ts
new TodoistTasksSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TodoistTasksSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TodoistTasksSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TodoistTasksSDK` instance in test mode.


### Instance Methods

#### `Task(data?: object)`

Create a new `Task` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TaskEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TodoistTasksSDK.test()`.

**Returns:** `TodoistTasksSDK` instance in test mode.


---

## TaskEntity

```ts
const task = client.Task()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `any` | Yes | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | Yes | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | Yes | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `string` | No | ID of the user to assign the task to. |
| `checked` | `boolean` | Yes | Whether the task is completed. |
| `child_order` | `number` | Yes | Position of the task among sibling tasks. |
| `completed_at` | `any` | Yes | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | Yes | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `number` | Yes | Number of times the task has been marked as completed. |
| `content` | `string` | Yes | Task content. |
| `day_order` | `number` | Yes | Task order for day-based views. |
| `deadline` | `any` | Yes | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `any` | No | Updated deadline date in YYYY-MM-DD format. |
| `description` | `string` | Yes | Task description. |
| `due` | `any` | Yes | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `string` | No | Updated due date in RFC 3339 format or similar. |
| `due_datetime` | `string` | No | Updated due date and time. |
| `due_lang` | `string` | No | Updated due date language code. |
| `due_string` | `string` | No | Updated human-readable representation of the due date. |
| `duration` | `number` | Yes | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `any` | No | Unit of time for duration. |
| `id` | `string` | Yes | String ID of the task. |
| `is_collapsed` | `boolean` | Yes | Whether the task is collapsed in the user's view. |
| `is_deleted` | `boolean` | Yes | Whether the task is deleted. |
| `labels` | `any[]` | Yes | Names of labels attached to the task. |
| `note_count` | `number` | Yes | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `any` | No | Position of the task in the project or section |
| `order_key` | `any` | Yes | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | Yes | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `number` | Yes | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `number` | Yes | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | Yes | String ID of the project that contains the task. |
| `responsible_uid` | `any` | Yes | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | Yes | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Yes | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | Yes | String ID of the user who owns the task. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `added_at` | - | - | - | - |
| `added_by_uid` | - | - | - | - |
| `assigned_by_uid` | - | - | - | - |
| `assignee_id` | - | - | - | - |
| `checked` | - | - | - | - |
| `child_order` | - | - | Yes | - |
| `completed_at` | - | - | - | - |
| `completed_by_uid` | - | - | - | - |
| `completed_count` | - | - | - | - |
| `content` | - | - | Yes | - |
| `day_order` | - | - | Yes | - |
| `deadline` | - | - | - | - |
| `deadline_date` | - | - | - | - |
| `description` | - | - | Yes | - |
| `due` | - | - | - | - |
| `due_date` | - | - | - | - |
| `due_datetime` | - | - | - | - |
| `due_lang` | - | - | - | - |
| `due_string` | - | - | - | - |
| `duration` | - | - | Yes | - |
| `duration_unit` | - | - | - | - |
| `id` | - | - | - | - |
| `is_collapsed` | - | - | Yes | - |
| `is_deleted` | - | - | - | - |
| `labels` | - | - | Yes | - |
| `note_count` | - | - | - | - |
| `order` | - | - | - | - |
| `order_key` | - | - | - | - |
| `parent_id` | - | - | Yes | - |
| `postponed_count` | - | - | - | - |
| `priority` | - | - | Yes | - |
| `project_id` | - | - | Yes | - |
| `responsible_uid` | - | - | - | - |
| `section_id` | - | - | Yes | - |
| `updated_at` | - | - | - | - |
| `user_id` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Task().create({
  id: 'example_id',
  added_at: 'example_added_at',
  added_by_uid: 'example_added_by_uid',
  assigned_by_uid: 'example_assigned_by_uid',
  checked: true,
  child_order: 1,
  completed_at: 'example_completed_at',
  completed_by_uid: 'example_completed_by_uid',
  completed_count: 1,
  content: 'example_content',
  day_order: 1,
  deadline: 'example_deadline',
  description: 'example_description',
  due: 'example_due',
  duration: 1,
  is_collapsed: true,
  is_deleted: true,
  labels: [],
  note_count: 1,
  order_key: 'example_order_key',
  parent_id: 'example_parent_id',
  postponed_count: 1,
  priority: 1,
  project_id: 'example_project_id',
  responsible_uid: 'example_responsible_uid',
  section_id: 'example_section_id',
  updated_at: 'example_updated_at',
  user_id: 'example_user_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Task().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Task().load({ id: 'task_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Task().remove({ id: 'task_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `TodoistTasksSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new TodoistTasksSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

