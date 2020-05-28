# Server-template 搭建所遇见的问题及解决方案

## Problem 1

### Error Tip

```js
server-template\node_modules\koa\lib\application.js
const onerror = err => ctx.onerror(err);
                               ^
TypeError: ctx.onerror is not a function
```



### solve problem

```js
// app.js

...
/* Deal data format */
app.use(bodyParser) /* before */
app.use(bodyParser()) /* after */
...
```

## Problem 2
### Error Tip

```js
Reached the max retries per request limit (which is 20). Refer to
"maxRetriesPerRequest" option for details.
```

### solve problem

```js
必须开启 Redis 服务,客户端 bash 中输入命令: redis-server
```
