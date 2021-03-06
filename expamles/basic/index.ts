import {
  Server,
  Service,
  Context,
  Action,
  Middleware,
  NextFn,
  GnattyErrors,
} from '../../packages/core/src';
import { Gateway } from '../../packages/gateway/src';

class MyServer extends Server {}

class TestService extends Service<MyServer> {
  public name = 'test';

  @Action('action')
  @Middleware(async (ctx: Context<{ balls: string }>, next: NextFn) => {
    ctx.data.balls = 'hello';

    await next();
  })
  public testAction(ctx: Context<any>) {
    // throw new Error('asdfasdfasdfasdfasdf');
    // throw new GnattyErrors.BadRequestError('Something', { test: 'freaking' });
    // throw new GnattyErrors.BadRequestError('Something');
    ctx.send({ awesome: 'test' });
  }
}

const serv = MyServer.create();

const start = async () => {
  await serv.start([TestService]);
};

const gateway = new Gateway();

start().then(() => {
  return gateway.start();
});
