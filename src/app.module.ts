import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicesModule } from './modules/services/services.module';
import { ServicesController } from './modules/services/services.controller';
import { EmployeesModule } from './modules/employees/employees.module';
import { TypeServicesModule } from './modules/type_services/type_services.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { AdminModule } from './modules/admin/admin.module';
import { LoginModule } from './modules/login/login.module';
import { Middleware } from './common/middleware/middleware.middleware';
import { JwtModule } from '@nestjs/jwt';
import { EmployeesController } from './modules/employees/employees.controller';
import { TypeServicesController } from './modules/type_services/type_services.controller';
import { AdminController } from './modules/admin/admin.controller';
import { ItemsModule } from './modules/items/items.module';
import { HelpersController } from './modules/helpers/helpers.controller';

@Module({
  imports: [
    ServicesModule,
    EmployeesModule,
    TypeServicesModule,
    HelpersModule,
    AdminModule,
    LoginModule,
    ItemsModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS512',
      },
      verifyOptions: {
        algorithms: ['HS512'],
        ignoreExpiration: false,
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes(
        ServicesController,
        EmployeesController,
        TypeServicesController,
        AdminController,
        HelpersController,
      );
  }
}
