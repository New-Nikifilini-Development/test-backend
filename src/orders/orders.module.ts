import { Module } from '@nestjs/common'
import { OrdersResolver } from './orders.resolver'
import { RetailService } from '../retail_api/retail.service'

@Module({
  imports: [],
  providers: [OrdersResolver, RetailService],
})
export class OrdersModule {}
