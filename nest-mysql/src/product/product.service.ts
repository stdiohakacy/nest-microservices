import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {
    }

    async getAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async getById(id: number): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    async create(productDTO: CreateProductDTO): Promise<Product> {
        return await this.productRepository.save(productDTO);
    }

    async update(id: number, productDTO: UpdateProductDTO) {
        const productUpdated = await this.productRepository.update(id, productDTO);
        if(productUpdated.affected) {
            return await this.getById(id);
        }
    }

    async delete(id: number): Promise<boolean> {
        const productDeleted = await this.productRepository.delete(id);
        return productDeleted.affected ? true : false;
    }
}
