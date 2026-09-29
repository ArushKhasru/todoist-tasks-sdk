import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "task",
    "accessor": "Task",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/tasks",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/tasks",
    "args": [],
    "select": {
      "cursor": "v1",
      "ids": "v1",
      "label": "v1",
      "limit": "v1",
      "parent_id": "v1",
      "project_id": "v1",
      "section_id": "v1"
    },
    "headers": [],
    "query": [
      "project_id",
      "section_id",
      "parent_id",
      "label",
      "ids",
      "cursor",
      "limit"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "results": [
        {
          "added_at": "x",
          "added_by_uid": "x",
          "assigned_by_uid": "x",
          "checked": true,
          "child_order": 1,
          "completed_at": "x",
          "completed_by_uid": "x",
          "completed_count": 1,
          "content": "x",
          "day_order": 1,
          "deadline": {},
          "description": "x",
          "due": {},
          "duration": {},
          "id": "x",
          "is_collapsed": true,
          "is_deleted": true,
          "labels": [
            "x"
          ],
          "note_count": 1,
          "order_key": "x",
          "parent_id": "x",
          "postponed_count": 1,
          "priority": 1,
          "project_id": "x",
          "responsible_uid": "x",
          "section_id": "x",
          "updated_at": "x",
          "user_id": "x"
        }
      ],
      "next_cursor": "x"
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {
      "public_key": "v1"
    },
    "headers": [],
    "query": [
      "public_key"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "user_id": "x",
      "id": "x",
      "project_id": "x",
      "section_id": "x",
      "parent_id": "x",
      "added_by_uid": "x",
      "assigned_by_uid": "x",
      "responsible_uid": "x",
      "labels": [
        "x"
      ],
      "deadline": {},
      "duration": {},
      "is_collapsed": true,
      "checked": true,
      "is_deleted": true,
      "added_at": "x",
      "completed_at": "x",
      "completed_by_uid": "x",
      "updated_at": "x",
      "due": {},
      "priority": 1,
      "child_order": 1,
      "order_key": "x",
      "content": "x",
      "description": "x",
      "note_count": 1,
      "day_order": 1,
      "completed_count": 1,
      "postponed_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "task",
    "accessor": "Task",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
