
export type User={
    _id:string,
    name:string,
    email:string,
    photo:string,
    role:string,
    gender:string,
    dob:string
}

export type Product={
    _id:string,
    name:string,
    price:number,
    stock:number,
    category:string,
    photo:string,
}


export type ShippingType={
    address:string;
    city:string;
    state:string;
    country:string;
    pinCode:string;
}


export type CartItem={
    productId:string;
    photo:string;
    name:string;
    price:number;
    quantity:number;
    stock:number;
}


export type OrderItem={
    productId:string;
    photo:string;
    name:string;
    price:number;
    quantity:number;
    _id:string
}

export type Order={
    shippingInfo:ShippingType,
    orderItems:OrderItem[],
    user:User,
    subtotal:number,
    tax:number,
    shippingCharges:number,
    discount:number,
    total:number,
    status:string,
    _id:string
}
