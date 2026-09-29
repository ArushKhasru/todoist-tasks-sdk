# Building a Todoist Tasks SDK with Voxgig

Author: Arush Khasru  
Repository: https://github.com/ArushKhasru/todoist-tasks-sdk  
API: [Todoist API v1](https://developer.todoist.com/)  
Source: [official OpenAPI specification](https://developer.todoist.com/openapi.json), scoped to task endpoints  
Environment: Windows, PowerShell, Node.js 24.18.0, npm 12.0.2  
Tools: `@voxgig/create-sdkgen@0.30.2`, TypeScript target, generated test feature

## API choice

Todoist is a task-management app with an API for tasks and other resources. I used its official OpenAPI specification and limited this SDK to task endpoints. The task list is a useful generator check because it returns a page object with `results` and `next_cursor`, rather than an array at the top level. A personal API token also allowed a read-only authentication check.

## Result

I generated an unofficial TypeScript SDK for Todoist's task endpoints with Voxgig's tools. The standard `npm test` command now runs 203 tests: **202 pass, one is skipped, and none fail**. I also made an authenticated read-only request to Todoist. The account had no tasks, so that request confirmed authentication and connectivity but did not exercise a non-empty live task list.

The most useful test failure during development came from Todoist's paginated list response. The generator initially treated the whole response object as the task array. A one-task definition fixture returned zero SDK records. A guide override that selects `body.results` fixed that test and survives regeneration. Cursor handling is still not exposed by `Task().list()`, so the client currently returns only the requested page's records.

## Verification

| Check | Result |
| --- | --- |
| TypeScript build and full offline suite | `cd ts && npm test`: 202 passed, 0 failed, 1 skipped |
| Definition test for `GET /api/v1/tasks` | Passes after the guide override |
| README examples | Compile or run successfully in generated test mode |
| SDK `Task().list({ limit: 1 })` with a real token | Returned an empty array for the empty account |
| Separate read-only `GET /api/v1/tasks?limit=1` | HTTP 200, with `results: []` and `next_cursor: null` |

I did not make live create, update or delete requests. Non-empty responses and cursor traversal remain untested against Todoist. The initial GitHub CI and documentation workflows passed after the repository was published. Only the TypeScript target was generated; success in other language jobs should not be read as validation of SDKs that are not present.

## What worked

The generated offline tests did more than check that the code compiled. Their one-task fixture caught the list mapping bug that the empty live account could not reveal. The generated model also gave me a place to correct the mapping without editing SDK runtime code. README examples are exercised as part of the suite, which helped check the token example after I changed it.

## Generator observations

### Paginated response mapping

The original definition failure was:

```text
list read 0 records where the definition example holds 1
```

Todoist returns `{ results: [...], next_cursor: ... }`. The generated list operation originally selected `body`, while its runtime expects an array. I added `body.results` in `.sdk/model/guide/guide.aontu` and regenerated. The definition test now passes. The generator could detect common response envelopes and offer a way to expose the cursor along with the records.

### Windows setup

The first scaffold attempt failed with `Failed to start npm: spawn npm ENOENT`. Manual dependency installation allowed setup to continue. Model generation then could not resolve `api/api-info.aontu`, although that file existed. I changed local includes in `.sdk/model/sdk.aontu` to `./model/...`; the same adjustment was needed for `.sdk/test/test.aontu`. I have not isolated the root cause of the path resolution failure.

The generated TypeScript build also used Unix `rm -rf`, while its test command used single quotes around a glob. On Windows, the first stopped the build and the second could report success with zero tests. I changed the package component in `.sdk/src/cmp/ts/Package_ts.ts` to use Node for cleanup, force TypeScript to rebuild after cleanup, and pass the test glob without single quotes. I checked the test count as well as the exit status.

A Windows run of the scaffold, model and generated tests would catch these problems earlier. The model error would be easier to diagnose if it printed the intended include base directory and a recovery command.

### Authentication and documentation

The upstream OpenAPI document did not declare its Bearer security scheme. I added HTTP Bearer authentication to the scoped specification and documented how to pass `TODOIST_API_TOKEN` to the generated `apikey` option. The missing declaration came from the source specification; a generator warning would have made it easier to spot.

Generation also prints `require-missing` warnings for `ReadmeFeatures_ts` and `AgentGuide_ts`. It still completes. I could not establish whether any documentation is missing, so the warning should say whether these components are optional.

## Project changes

| Change | File |
| --- | --- |
| Restrict the spec to two task paths and add Bearer authentication | `scripts/prepare-spec.cjs`, `specs/todoist.tasks.json` |
| Preserve a copy of the official source spec | `specs/todoist.upstream.json` |
| Set the SDK name, repository owner and author | `.sdk/model/sdk.aontu`, `.sdk/model/project.aontu` |
| Correct the list response mapping | `.sdk/model/guide/guide.aontu` |
| Make generated build and test scripts work on Windows | `.sdk/src/cmp/ts/Package_ts.ts` |
| Preserve the MIT copyright holder on regeneration | `.sdk/scripts/postgenerate.cjs` |
| Clarify the Todoist token example | `README.md`, `ts/README.md` |

The catalogue check covered 802 public `voxgig-sdk` repositories on 29 September 2026 and found no Todoist or Doist match in their names, descriptions or homepages. This SDK covers `GET` and `POST /api/v1/tasks`, plus `GET`, `POST` and `DELETE /api/v1/tasks/{task_id}`. It is not a complete Todoist SDK.

The source specification's SHA-256 is `c720d271ad4d4fc6bd4e435fb27f48c1c3e806728dc983a4bdf710418289d40d`.

## Time and AI use

API research and account setup took an estimated 5-7 minutes. The first assisted implementation and report draft spanned about 20 minutes by local file timestamps, giving an initial elapsed estimate of 25-27 minutes. Human time and automated execution were not recorded separately. The later report revisions and publication work happened after that initial estimate; I have not timed those separately.

I used AI assistance to compare APIs, prepare the scoped specification, troubleshoot the generator, run checks and draft this report. I checked the model output, the full test count and the live read-only responses described above.
