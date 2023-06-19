import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  price: number;
}
