import { Module } from '@nestjs/common';
import { TransformDataController } from './transform-data.controller';
import { TransformDataService } from './transform-data.service';

@Module({
  controllers: [TransformDataController],
  providers: [TransformDataService],
})
export class TransformDataModule {}
