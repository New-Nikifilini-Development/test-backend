
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    getOrders(page?: Nullable<number>): OrdersResponse | Promise<OrdersResponse>;
    order(number: string): Nullable<Order> | Promise<Nullable<Order>>;
    productStatuses(): Nullable<ProductStatus>[] | Promise<Nullable<ProductStatus>[]>;
    orderStatuses(): Nullable<OrderStatus>[] | Promise<Nullable<OrderStatus>[]>;
    deliveryTypes(): Nullable<DeliveryType>[] | Promise<Nullable<DeliveryType>[]>;
}

export interface OrdersResponse {
    orders: Nullable<Order>[];
    pagination: Pagination;
}

export interface Pagination {
    limit: number;
    totalCount: number;
    currentPage: number;
    totalPageCount: number;
}

export interface OrderItemOffer {
    externalId?: Nullable<string>;
    displayName?: Nullable<string>;
    article?: Nullable<string>;
}

export interface OrderItem {
    id: number;
    status: string;
    quantity: number;
    offer?: Nullable<OrderItemOffer>;
    comment: string;
}

export interface Order {
    number: string;
    id: number;
    site: string;
    createdAt: string;
    status: string;
    delivery?: Nullable<OrderDelivery>;
    items: Nullable<OrderItem>[];
}

export interface OrderDelivery {
    code?: Nullable<string>;
}

export interface DeliveryType {
    code: string;
    name: string;
}

export interface ProductStatus {
    code: string;
    name: string;
}

export interface OrderStatus {
    code: string;
    name: string;
}

type Nullable<T> = T | null;
