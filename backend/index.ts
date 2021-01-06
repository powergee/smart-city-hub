const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log("Starting...");
    const started = new Date();
    await next();
    const ended = new Date();
    console.log(ended.getTime() - started.getTime() + 'ms');
});

app.use(ctx => {
    ctx.body = "Hello, Koa!"
})

app.listen(4000, () => {
    console.log("Listening to http://0.0.0.0:4000")
})