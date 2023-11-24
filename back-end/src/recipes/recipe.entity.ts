import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @Column()
  instruction: string;
}
