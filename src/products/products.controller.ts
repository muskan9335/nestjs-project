import { ProductDto } from './dto/product.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(@Body() productDto: ProductDto) {
    return this.productsService.insertProduct(productDto);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: number) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Put(':id')
  updateProduct(@Param('id') prodId: number, @Body() productDto: ProductDto) {
    return this.productsService.updateProduct(prodId, productDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: number) {
    return this.productsService.deleteProduct(prodId);
  }
}
