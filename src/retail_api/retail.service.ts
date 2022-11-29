import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CrmType, Order, OrdersFilter, RetailPagination } from './types';
import axios, { AxiosInstance } from 'axios';
import { ConcurrencyManager } from 'axios-concurrency';
import { serialize } from '../tools';
import { plainToClass } from 'class-transformer';
import { OrdersResponse } from '../graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axios = axios.create({
      baseURL: `${this.configService.get('RETAIL_URL')}/api/v5`,
      timeout: 10000,
      headers: {
        'X-API-KEY': process.env.RETAIL_KEY
      }
    });

    this.axios.interceptors.request.use((config) => {
      console.log('config', config.url);
      return config;
    });
    this.axios.interceptors.response.use(
      (r) => {
        console.log('Result:', r.data);
        return r;
      },
      (r) => {
        console.log('Error:', r.response.data);
        return r;
      }
    );
  }

  async orders(filter?: OrdersFilter): Promise<OrdersResponse> {
    const params = serialize(filter, '');
    const resp = await this.axios.get('/orders?' + params);

    if (!resp.data) throw new Error('RETAIL CRM ERROR');

    const orders = plainToClass(Order, resp.data.orders as Array<Order>);
    const pagination: RetailPagination = resp.data.pagination;

    return {orders, pagination};
  }

  async findOrder(id: string): Promise<Order | null> {
    if (isNaN(Number(id))) {
      throw new HttpException(
        'parameter "number" is not a string',
        HttpStatus.BAD_REQUEST
      );
    }
    const {orders} = await this.orders({ filter: { ids: [Number(id)] } });
    if (!orders.length) {
      throw new NotFoundException('order is not found');
    }
    const keysForNewObj = [
      'id',
      'number',
      'createdAt',
      'status',
      'delivery',
      'items',
      'site',
      'orderType'
    ];
    const order = orders[0];
    return keysForNewObj.reduce((acc, item) => {
      if (!order.hasOwnProperty(item)) {
        return acc;
      }
      acc[item] = order[item];
      return acc;
    }, {} as Order);
  }

  // async orderStatuses(): Promise<CrmType[]> {

  // }

  // async productStatuses(): Promise<CrmType[]> {

  // }

  // async deliveryTypes(): Promise<CrmType[]> {

  // }
}
