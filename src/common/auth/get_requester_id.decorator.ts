import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRequesterId = createParamDecorator(
  (key: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.user?._id;
  },
);
