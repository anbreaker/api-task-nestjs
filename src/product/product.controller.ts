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
  Query,
  HttpCode,
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

  @Delete('/delete')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteProduct(@Query('productId') productId) {
    const productDeleted = await this.productService.deleteProduct(productId);

    if (!productDeleted) throw new NotFoundException('Product not Found');

    return {
      message: 'Product Deleted Succesfully',
      productDeleted,
    };
  }

  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productId') productId,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      createProductDTO,
    );

    if (!updatedProduct) throw new NotFoundException('Product not Found');

    // TODO repair bug... sending put
    console.log(updatedProduct, 'por aqui<--------------');
    return {
      message: 'Product Updated Succesfully',
      updatedProduct,
    };
  }
}
