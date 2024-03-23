import { Category } from "./category"

export interface Product {
    sold: number
    images: string[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    ratingsAverage: number
    createdAt: string
    updatedAt: string
  }

