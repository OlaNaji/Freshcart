export interface UserData {
}
export interface UserData {
    name: string,
    email:string,
    password:string,
    phone:string,
    orders:any,
    addresses:any
}

export interface order {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: UserData
    createdAt: string
    updatedAt: string
    id: number
    __v: number
    paidAt?: string
  }

  export interface ShippingAddress {
    details: string
    phone: string
    city: string
  }