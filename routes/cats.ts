import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/cats";
import { validateArticle } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";

const cats = [
  {title: 'Hello article', fullText: 'some text to fill the body'},
  {title: 'another article', fullText: 'again here is some text here to fill'},
  {title: 'coventry university', fullText: 'some news about coventry university'},
  {title: 'smart campus', fullText: 'smart campus is coming to IVE'}
];

const router = new Router({prefix: '/api/v1/cats'});

const getAll = async (ctx: RouterContext, next: any) => {
  //ctx.body = cats;
  let cats = await model.getAll();
  if(cats.length) {
    ctx.body = cats;
  } else {
    ctx.body = {};
  }
  await next();
}

const createCats = async (ctx: RouterContext, next: any) => {
  /*let c: any = ctx.request.body;
  let title = c.title;
  let fullText = c.fullText;
  let newArticle = {title: title, fullText: fullText};
  cats.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;*/
  const body = ctx.request.body;
  let result = await model.add(body);
  if(result.status==201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = {err: "insert data failed"};
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  /*if((id < cats.length +1) && (id>0)){
    ctx.body = cats[id-1];
  } else {
    ctx.status = 404;
  }*/
  let article = await model.getById(id);
  if(article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
  }
  await next();
}

const updateCats = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  //let {title, fullText} = ctx.request.body;
  let c: any = ctx.request.body;
  let title = c.title;
  let fullText = c.fullText;
  if ((id < cats.length+1) && (id > 0)) {
    cats[id-1].title = title;
    cats[id-1].fullText = fullText;
    ctx.status = 200;    
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
}

const deleteCats = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if((id < cats.length+1) && (id > 0)) {
    cats.splice(id-1, 1);
    ctx.status = 200;
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
}

router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateArticle, createCats);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), updateCats);
router.delete('/:id([0-9]{1,})', basicAuth, deleteCats);

export { router };
