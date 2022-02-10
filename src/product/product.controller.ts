import {
  Controller,
  Post,
  Put,
  Delete,
  Res,
  Get,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interfaces';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);

    return res
      .status(HttpStatus.OK)
      .json({ msg: 'Product Successfully Created', product });
  }

  @Get('/')
  async getProducts(@Res() res): Promise<Product[]> {
    const products = await this.productService.getProducts();

    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:productId')
  async getProduct(@Res() res, @Param('productId') productId: string) {
    const product = await this.productService.getProduct(productId);

    if (!product) throw new NotFoundException('Product not Found');

    return res.status(HttpStatus.OK).json(product);
  }
}
