export interface Item {
  _id: string
  name: string
  quantity: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface NewItem {
  name: string
  quantity: number
}

export interface PaginationResult {
  items: Item[]
  totalItems: number
  totalPages: number
  currentPage: number
}

