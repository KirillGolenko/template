import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const now = Date.now();
    const ctx = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(
          `[${ctx.req.method}]: ${ctx.req.url} - ${ctx.statusCode} ${
            Date.now() - now
          }ms`,
        );
      }),
      catchError((err) => {
        this.logger.error(
          `[${ctx.req.method}]: ${ctx.req.url} - ${err.status} ${
            Date.now() - now
          }ms`,
        );

        return throwError(err);
      }),
    );
  }
}
