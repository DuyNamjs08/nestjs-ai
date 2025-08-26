import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform/transform.interceptor';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';
import { AllAuthGuard } from './all-auth/all-auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply Global Interceptor & Filter
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  app.useGlobalGuards(new AllAuthGuard(reflector, jwtService));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
