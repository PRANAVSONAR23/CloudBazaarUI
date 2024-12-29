import { Product, User } from "./types"

export type MessageResponse={
    success: boolean,
    message: string
}

export type UserResponse ={
    success: boolean,
    user: User
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
