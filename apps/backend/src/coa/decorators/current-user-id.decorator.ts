import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * شناسه کاربر جاری.
 *
 * راه‌حل موقت: از هدر `x-user-id` خوانده می‌شود.
 * پس از افزودن احراز هویت واقعی (مثلاً JWT)،
 * فقط بدنه‌ی همین تابع را تغییر بده تا از `req.user.id` بخواند؛
 * هیچ controllerی نیاز به تغییر ندارد.
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const raw = request.header('x-user-id');
    const userId = Number(raw);

    if (!raw || !Number.isInteger(userId) || userId <= 0) {
      throw new BadRequestException(
        'هدر x-user-id الزامی است و باید یک عدد صحیح مثبت باشد.',
      );
    }

    return userId;
  },
);
