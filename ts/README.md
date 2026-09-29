# TodoistTasks TypeScript SDK



The TypeScript SDK for the TodoistTasks API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Task()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/ArushKhasru/todoist-tasks-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/ArushKhasru/todoist-tasks-sdk
npm install ./todoist-tasks-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { TodoistTasksSDK } from 'todoist-tasks-sdk'

const client = new TodoistTasksSDK({
  apikey: process.env.TODOIST_API_TOKEN,
})
```

### 2. List task records

`list()` resolves to an array of Task ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const tasks = await client.Task().list()

for (const task of tasks) {
  console.log(task)
}
```

### 3. Load a task

`load()` returns the entity directly and throws on failure:

```ts
try {
  const task = await client.Task().load({ id: 'example_id' })
  console.log(task)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Task ENTITY (.data() for the record)
const created = await client.Task().create({
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

// Remove
await client.Task().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const tasks = await client.Task().list()
  console.log(tasks)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = TodoistTasksSDK.test()

const task = await client.Task().list()
// task is the entity, populated with mock response data
// — call task.data() for the record itself
console.log(task)
```

You can also use the instance method:

```ts
const client = new TodoistTasksSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Task()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TodoistTasksSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TODOIST_TASKS_TEST_LIVE=TRUE
TODOIST_API_TOKEN=<your-token>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### TodoistTasksSDK

#### Constructor

```ts
new TodoistTasksSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Task(data?)` | `TaskEntity` | Create a Task entity instance. |
| `tester(testopts?, sdkopts?)` | `TodoistTasksSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TodoistTasksSDK.test(testopts?, sdkopts?)` | `TodoistTasksSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TodoistTasksSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Task

| Field | Description |
| --- | --- |
| `added_at` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | ID of the user to assign the task to. |
| `checked` | Whether the task is completed. |
| `child_order` | Position of the task among sibling tasks. |
| `completed_at` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | Number of times the task has been marked as completed. |
| `content` | Task content. |
| `day_order` | Task order for day-based views. |
| `deadline` | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | Updated deadline date in YYYY-MM-DD format. |
| `description` | Task description. |
| `due` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | Updated due date in RFC 3339 format or similar. |
| `due_datetime` | Updated due date and time. |
| `due_lang` | Updated due date language code. |
| `due_string` | Updated human-readable representation of the due date. |
| `duration` | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | Unit of time for duration. |
| `id` | String ID of the task. |
| `is_collapsed` | Whether the task is collapsed in the user's view. |
| `is_deleted` | Whether the task is deleted. |
| `labels` | Names of labels attached to the task. |
| `note_count` | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | Position of the task in the project or section |
| `order_key` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | String ID of the project that contains the task. |
| `responsible_uid` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | String ID of the user who owns the task. |

Operations: create, list, load, remove.

API path: `/api/v1/tasks/{task_id}`



## Entities


### Task

Create an instance: `const task = client.Task()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `any` | Date and time when the task was created, or `null` if unknown. |
| `added_by_uid` | `any` | String ID of the user who created the task, or `null` if unknown. |
| `assigned_by_uid` | `any` | String ID of the user who assigned the task, or `null` if unassigned. |
| `assignee_id` | `string` | ID of the user to assign the task to. |
| `checked` | `boolean` | Whether the task is completed. |
| `child_order` | `number` | Position of the task among sibling tasks. |
| `completed_at` | `any` | Date and time when the task was completed, or `null` if active. |
| `completed_by_uid` | `any` | String ID of the user who completed the task, or `null` if active. |
| `completed_count` | `number` | Number of times the task has been marked as completed. |
| `content` | `string` | Task content. |
| `day_order` | `number` | Task order for day-based views. |
| `deadline` | `any` | Deadline details for the task, or `null` when the task has no deadline. |
| `deadline_date` | `any` | Updated deadline date in YYYY-MM-DD format. |
| `description` | `string` | Task description. |
| `due` | `any` | Due date details for the task, or `null` when the task has no due date. |
| `due_date` | `string` | Updated due date in RFC 3339 format or similar. |
| `due_datetime` | `string` | Updated due date and time. |
| `due_lang` | `string` | Updated due date language code. |
| `due_string` | `string` | Updated human-readable representation of the due date. |
| `duration` | `number` | Task duration details, or `null` when the task has no duration. |
| `duration_unit` | `any` | Unit of time for duration. |
| `id` | `string` | String ID of the task. |
| `is_collapsed` | `boolean` | Whether the task is collapsed in the user's view. |
| `is_deleted` | `boolean` | Whether the task is deleted. |
| `labels` | `any[]` | Names of labels attached to the task. |
| `note_count` | `number` | **Deprecated**: only returns 0 and is marked for removal. |
| `order` | `any` | Position of the task in the project or section |
| `order_key` | `any` | Fractional-indexing order key: tasks sort by comparing keys lexicographically among siblings sharing the same project, section and parent task. |
| `parent_id` | `string` | String ID of the parent task, or `null` if this is a top-level task. |
| `postponed_count` | `number` | Number of times the task's due date has been rescheduled by the user. |
| `priority` | `number` | Task priority from 1 (normal) to 4 (urgent). |
| `project_id` | `string` | String ID of the project that contains the task. |
| `responsible_uid` | `any` | String ID of the user responsible for the task, or `null` if unassigned. |
| `section_id` | `string` | String ID of the section that contains the task, or `null` if the task is not in a section. |
| `updated_at` | `any` | Date and time when the task was last updated, or `null` if unknown. |
| `user_id` | `string` | String ID of the user who owns the task. |

#### Example: Load

```ts
const task = await client.Task().load({ id: 'task_id' })
```

#### Example: List

```ts
const tasks = await client.Task().list()
```

#### Example: Create

```ts
const task = await client.Task().create({
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

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
todoist-tasks/
├── src/
│   ├── TodoistTasksSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { TodoistTasksSDK } from 'todoist-tasks-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const task = client.Task()
await task.list()

// task.data() now returns the task data from the last `list`
// task.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
