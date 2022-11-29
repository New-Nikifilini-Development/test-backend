import { Type } from 'class-transformer';

export type RetailPagination = {
  limit: number; // 20 | 50 | 100 | 250
  totalCount: number;
  currentPage: number;
  totalPageCount: number;
};
export type OrdersFilter = {
  page?: number;
  limit?: 20 | 50 | 100 | 250;
  filter?: {
    numbers?: string[];
    ids?: number[];
    extendedStatus?: string[];
    deliveryTypes?: string[];
    createdAtFrom?: string;
    createdAtTo?: string;
  };
};

export class CrmType {
  name: string;
  code: string;
}

export type OrderItemProperty = {
  code: string;
  name: string;
  value: string;
};

export class OrderItemOffer {
  externalId?: string;
  displayName?: string;
  article?: string;
}

export class OrderItem {
  id: number;
  status: string;
  quantity: number;
  @Type(() => OrderItemOffer)
  offer?: OrderItemOffer;
  comment: string;
}

export class OrderDelivery {
  code?: string;
}

export class Order {
  id: number;
  number: string;
  createdAt: string;
  @Type(() => OrderDelivery)
  delivery?: OrderDelivery;
  @Type(() => OrderItem)
  items: OrderItem[];
  site?: string;
  orderType: string;
  status: string;
}

export class OrdersResponse {
  orders?: Order[] | null;
  pagination?: RetailPagination;
}
