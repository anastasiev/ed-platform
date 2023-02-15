## Requirements

- node 16.15.0
- npm 8.5.5
- docker
- kubernetes

## Local development

```shell
npm i
npm run build
npm run start
```

## Run in Kubernetes

```shell
cd nodejs-base
./build-docker.sh
cd ..
./start-k8s.sh
```

## Node app stucture

### Npm

Npm is packet manager for Node application. It is managed by configuration from ***package.json*** (you could find it in root).
Structure of ***package.json***:
```json
"dependencies": {
  "express": "^4.18.2",
 ...
}
```
dependencies section is for defining external packets we need for running application. It is loaded to ***node_modules*** directory after executing ```npm i``` command

```json
"devDependencies": {
    "@tsconfig/node16": "^1.0.2"
    ...
}
```
devDependencies section is the same as **dependencies** but here we define packets need for development only (types for typescript, formatting tools, etc.)

```json
 "scripts": {
  "start": "node dist/index.js"
  ...
}
```
in **scripts** section we define commands which we execute through **npm** using commands like ```npm run commandName```

### Typescript

Typescript (TS) is type-oriented version of javascript, ts compiler checks correctness of type usage and transpile ts code to javascript code.
All check are performed at compilation time only (not runtime). Ts compiler is controled by configuration in **tsconfig.json**.

### Express

Express is simple framework for building web applications. It works base on chain-of-responsibility pattern. 
It consists of chain of middlewares. Express creates request and response objects which goes through each middlewares, which modifies these objects. 
So request handler where we place our logic for handle requests and send responses are middleware too.
We use set of middlewares before request handler for modifying request object for easier handling. For example **bodeParser** parses string body to json object. 

### Entities structure

For following MVC principe, we place each entity to separate folder and split request handling logic to layers.
```entity.router.ts``` - here we define routs, validate requests, execute services and prepare response.
```entity.service.ts``` - here we define all business logic.
```entity.repository.ts``` - here we place logic related to external services: databases, message brokers, etc.
We should use services only from routers and use repositories only from services. 

### Error handling

For managing negative status codes, special middleware was defined - ```nodejs-base/src/middlewares/error-handler.ts```
It catches all errors, checks our custom ones and change status code if needed. So we can throw CustomError instance from any place of the app and it will be caught in error handler middleware.

### Request validation

For incoming data validation we use Joi - https://joi.dev/api/?v=17.7.0
We created ```validatePayload(obj, schema)``` function which consume incoming data and schema for validation.
Joi allows validate any type of data: email, lover/upper cased strings, different ids, ip, number ranges, use reg exp, etc.

### Dependency injection

We use **typedi** library for di. It works similar to Springs DI concept: we could just annotate as **Service** classes which should be controlled by DI container. For getting instances form DI container, you could use ```Container.get``` or constructor injection:

```typescript
@Service()
export class SomeRouter {
    constructor(
        private readonly someService: SomeService
    ) {}
}
```
and **this.someService** will be available for this example.

### Libraries

- ```express``` - web framework
- ```body-parser``` - middleware for parsing request body and query params
- ```reflect-metadata``` - required for dependency injection
- ```typedi``` - dependency injection tools
- ```express-async-handler``` - small wrapper of async request handlers for reducing boilerplate code
- ```joi``` - request validation
- ```winston``` - logger
- ```properties-file``` - convert properties file (java style) to json
#### Dev libraries:

- ```@tsconfig/node16``` - typescript config
- ```@types/node```
- ```@types/express``` 
- ```@types/joi``` - types for modules
- ```@typescript-eslint/eslint-plugin```
- ```@typescript-eslint/parser```
- ```eslint```
- ```prettier``` - format code libraries
- ```typescript``` - tolls for app building 
