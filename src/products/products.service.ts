import { ProductDto } from './dto/product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async insertProduct(productDto: ProductDto) {
    const product = await this.prisma.product.create({
      data: {
        title: productDto.title,
        description: productDto.description,
        price: productDto.price,
      },
    });
    return product;
  }

  getProducts() {
    return this.prisma.product.findMany();
  }

  getSingleProduct(productId: number) {
    const id = +productId;
    console.log(id);
    const product = this.prisma.product.findFirst({
      where: { id },
    });
    console.log(product);
    if (!product) throw new NotFoundException('Not Found');
    return product;
  }

  async updateProduct(productId: number, productDto: ProductDto) {
    const id = +productId;
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        title: productDto.title,
        description: productDto.description,
        price: productDto.price,
      },
    });

    return product;
  }

  async deleteProduct(prodId: number) {
    const id = +prodId;
    const product = await this.prisma.product.delete({
      where: { id },
    });
    return 'Success';
  }
}
