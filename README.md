# Instana Eum in Angular

## Capabilities

### Error Reporting

JavaScript errors can be reported to the backend (see [documentation](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#error-tracking)). To enable this feature, add a custom error handler to the Angular module. See [app.module.ts](./src/app/app.module.ts) for an implementation. This approach will catch all errors `ineum` has access to. See the [documentation](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#excluding-errors-from-tracking) on how to exclude errors and how to integrate errors from third party libraries.

### Catch Page Transitions

By default, `ineum` will only catch the first page loading event. For a single page application, subsequent page changes must be reported manually by running

```ts
ineum('page', pageName);
```

The easiest way to implement this, is to use `NavigationEvents` of the Angular router (see [`instana.service.ts`](./src/app/instana.service.ts) for an implementation for an implementation). **Make sure that you do not report secrets to the Instana backend.** You can [redact secrets from query parameters](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#redacting-secrets-from-urls) or [exclude entire URLs](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#excluding-urls-from-tracking) by using regular expressions.

Page loads have an ID which can be used to correlate activities in the backend manually. Use `const pageLoadId = ineum('getPageLoadId');` to get the id (see [documentation](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#retrieving-the-page-load-id)). Also, see [this article on backend correlation](https://www.ibm.com/docs/en/obi/current?topic=websites-backend-correlation) for further details.

### Track Users

> It is your responsibility to make sure that user tracking is compliant with applicable rules (i.e. GDPR).

There are two ways to track user specific information with Instana EUM:
- track sessions: sessions are started when calling `ineum('trackSessions')` and are stopped after a given timeout. In addition they can be stopped manually by running `ineum('terminateSession')`. See the [documentation](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#session-tracking) for details. Sessions do not include user specific information.
- set users: users can be individually identified by running `ineum('setUser', ...)`. You can set `userId`, `userName` and `userEmail` (all optional).

See [`instana.service.ts`](./src/app/instana.service.ts) for an implementation.

### Set Metadata

Metadata can be used to annotate page loads and ajax calls. Note that they are added to all subsequent requests (see [documentation](https://www.ibm.com/docs/en/obi/current?topic=websites-javascript-agent-api#metadata)). Metadata can be set by running `ineum('metadata', <key>, <value>)` (both, `key` and `value` of type `string`). See [`instana.service.ts`](./src/app/instana.service.ts) for an implementation.

### Report Events

Events can be reported to the Instana backend by running `ineum('reportEvent', <event name>, <event data>)`. The following data can be associated to the event:
- `timestamp`: defaults to now
- `duration`: in milliseconds
- `backendTraceId`: provide this if the event is related to a trace in the backend (see [documentation](https://www.ibm.com/docs/en/obi/current?topic=websites-backend-correlation) on how to get this trace id)
- `error`: JavaScript error object related to the event (see also error reporting)
- `componentStack`: string representing component hierarchy
- `meta`: metadata sent along with this event. In contrast to _Set Metadata_ this is only used for this event. The object can only take `string` as values.

## Build

See [Dockerfile](./Dockerfile)

## Todo

- [ ] example on custom backend correlation
- [ ] integration of User-Timing API

