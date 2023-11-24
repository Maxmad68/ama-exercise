import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformDataModule } from './transform-data/transform-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RecipesModule,
    TransformDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
