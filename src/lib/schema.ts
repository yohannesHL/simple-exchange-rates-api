import { Context } from "koa";

export const validateSchema = async (ctx: Context, schema: any, data: any) => {
  let errors;

    try {
      await schema.validate(data, {abortEarly: false})
    return true
  } catch (e: any) {
      errors = e.errors;
      console.info({e})
  }

ctx.body = {
     ok: false,
     errors
  }
 
 return false;
}
