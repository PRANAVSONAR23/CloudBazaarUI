import { Bar, CartItem, Line, Order, Pie, Product, ShippingType, Stats, User } from "./types"

export type MessageResponse={
    success: boolean,
    message: string
}

export type UserResponse ={
    success: boolean,
    user: User
}

export type AllUsersResponse={
    success: boolean,
    users: User[]
}


export type AllProductResponse={
    success: boolean,
    products: Product[]
}

export type CategoriesResponse={
    success:boolean,
    categories:string[]
}

export type SearchProductResponse={
    success:boolean,
    products:Product[],
    totalPages:number
}

export type SearchProductRequest={
    search?:string,
    sort?:string,
    price?:number,
    category?:string,
    page?:number
}

export type NewProductRequest={
    id:string,
    formData:FormData
}


export type ProductType={
    success:boolean,
    product:Product
}

export type UpdateProductRequest={
    userId:string,
    productId:string,
    formData:FormData
}

export type DeleteProductRequest={
    userId:string,
    productId:string,
}


export type NewOrderRequest = {
    shippingInfo: ShippingType;
    orderItems: CartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
  };

export type AllOrdersResponse={
    success:boolean,
    orders:Order[]
}  

export type OrderDetailsResponse={
    success:boolean,
    order:Order
}  


export type UpdateOrderRequest={
    userId:string,
    orderId:string,
}


export type DeleteUserRequest={
    userId:string,
    adminUserId:string,
}


export type StatsResponse={
    success:boolean,
    stats:Stats
}

export type PieResponse={
    success:boolean,
    pieChart:Pie
}

export type BarResponse={
    success:boolean,
    barChart:Bar
}

export type LineResponse={
    success:boolean,
    lineChart:Line
}