import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { Order, OrdersFilter, OrdersResponse, RetailPagination } from '../retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}
  
  @Query(() => OrdersResponse, { name: 'getAllOrders'})
  async getAllOrders(@Args() args: OrdersFilter): Promise<OrdersResponse> {
    return await this.retailService.orders(args)
  }

  @Query(() => Order, { name: 'order'})
  async order(@Args('number') id: string): Promise<Order> {
    return await this.retailService.findOrder(id)
  }
}
