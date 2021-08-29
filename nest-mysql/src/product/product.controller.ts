import { Product } from './product.entity';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService,
        @Inject("PRODUCT_SERVICE") private readonly client: ClientProxy,
    ) {}
    
    @Get()
    async getAll(): Promise<Product[]> {
        this.client.emit("hello", "data test");
        return await this.productService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.productService.getById(id);
    }

    @Post()
    async create(@Body() productDTO: CreateProductDTO): Promise<Product> {
        const product = await this.productService.create(productDTO);
        this.client.emit("product_created", product);
        return product;
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() productDTO: UpdateProductDTO) {
        const product = await this.productService.update(id, productDTO);
        this.client.emit("product_updated", product);
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<boolean> {
        const isDeleted = await this.productService.delete(id);
        this.client.emit("product_deleted", id);        
        return isDeleted;
    }
}
