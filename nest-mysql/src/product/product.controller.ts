import { Product } from './product.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @Get()
    async getAll(): Promise<Product[]> {
        return await this.productService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.productService.getById(id);
    }

    @Post()
    async create(@Body() productDTO: CreateProductDTO): Promise<Product> {
        return await this.productService.create(productDTO);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() productDTO: UpdateProductDTO) {
        return await this.productService.update(id, productDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<boolean> {
        return await this.productService.delete(id);
    }
}
