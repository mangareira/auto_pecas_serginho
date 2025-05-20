import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicesModule } from './modules/services/services.module';
import { ServicesMiddleware } from './modules/services/services.middleware';
import { ServicesController } from './modules/services/services.controller';
import { EmployeesModule } from './modules/employees/employees.module';
import { EmployeesMiddleware } from './modules/employees/employees.middleware';
import { EmployeesController } from './modules/employees/employees.controller';

@Module({
  imports: [ServicesModule, EmployeesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServicesMiddleware).forRoutes(ServicesController);
    consumer.apply(EmployeesMiddleware).forRoutes(EmployeesController);
  }
}
