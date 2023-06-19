import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BookmarksDto {
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
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  userId: number;
}
