import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicesModule } from './modules/services/services.module';
import { ServicesMiddleware } from './modules/services/services.middleware';
import { ServicesController } from './modules/services/services.controller';
import { EmployeesModule } from './modules/employees/employees.module';
import { TypeServicesModule } from './modules/type_services/type_services.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [
    ServicesModule,
    EmployeesModule,
    TypeServicesModule,
    HelpersModule,
    AdminModule,
    LoginModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ServicesMiddleware).forRoutes(ServicesController);
  }
}
