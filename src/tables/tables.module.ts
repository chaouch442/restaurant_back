import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { TableRepository } from './repositories/table.repository';
import { TableEntity } from './entities/table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([TableEntity]) , AuthModule,UserModule],
  controllers: [TablesController],
  providers: [TablesService,TableRepository],
  exports: [TablesService,TableRepository],
})
export class TablesModule {}
