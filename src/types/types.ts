
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


type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
  };
  
  type LatestTransaction = {
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status: string;
  };

  

export type Stats={
  categoryCount: Record<string, number>[];
  ChangePercentage: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: LatestTransaction[];
  
}


type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};


export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  user: number[];
  product: number[];
  order: number[];
};
export type Line = {
  user: number[];
  product: number[];
  discount: number[];
  revenue: number[];
};