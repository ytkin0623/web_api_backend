import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from 'koa-passport';

import { router as articles } from "./routes/articles";
import { router as special } from './routes/special';
import { router as cats } from './routes/cats';

import serve from 'koa-static-folder';
import cors from "@koa/cors"
  
const app: Koa = new Koa();
//const router: Router = new Router();

/*const welcomeAPI = async (ctx: RouterContext, next:any) => {
  ctx.body = {message: "Welcome to the blog API!"};
  await next();
}

router.get('/api/v1', welcomeAPI);*/
// For Document:
app.use(serve('./docs'));

app.use(logger());
app.use(json());
app.use(cors());
app.use(passport.initialize());
//app.use(router.routes());
app.use(articles.middleware());
app.use(special.middleware());
app.use(cats.middleware());



app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    console.log(ctx.status)
    if(ctx.status === 404){
      ctx.body = {err: "Resource not found"};
    }
  } catch(err: any) {
    ctx.body = {err: err};
  }
  
});

app.listen(10888);