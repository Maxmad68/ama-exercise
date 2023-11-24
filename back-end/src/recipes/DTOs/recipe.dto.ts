import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class RecipeDTO {
  @ApiProperty({ type: Number, description: 'Recipe identifier', example: 42 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: String, description: 'Recipe name', example: 'Pizza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Recipe description',
    example: 'A delicious pizza',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: [String],
    description: 'Recipe ingredients',
    example: ['Dough', 'Tomato sauce', 'Cheese'],
  })
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @ApiProperty({ description: 'Recipe instruction', example: 'Cook it' })
  @IsString()
  @IsNotEmpty()
  instruction: string;
}
