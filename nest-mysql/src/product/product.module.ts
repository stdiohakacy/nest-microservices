import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://admin:admin@172.29.0.3:5672`],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),
],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
