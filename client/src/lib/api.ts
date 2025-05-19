import type { Item, NewItem, PaginationResult } from "./types"

// Base URL for API
const API_URL = "http://localhost:5000/api/items"

// Fetch all items and handle pagination on client side
export async function fetchItems(page = 1, limit = 10): Promise<PaginationResult> {
  try {
    const response = await fetch(`${API_URL}/all`)

    if (!response.ok) {
      // Handle specific HTTP error codes
      if (response.status === 404) {
        throw new Error("Items endpoint not found")
      } else if (response.status === 403) {
        throw new Error("Access forbidden")
      } else if (response.status === 500) {
        throw new Error("Server error occurred")
      }
      throw new Error(`Failed to fetch items: ${response.statusText}`)
    }

    const allData = await response.json()

    console.log("Fetched items:", allData)

    // Sort by createdAt descending (newest first)
    const sortedData = [...allData].sort(
      (a: Item, b: Item) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    // Calculate pagination values
    const totalItems = sortedData.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const paginatedItems = sortedData.slice(startIndex, startIndex + limit)

    return {
      items: paginatedItems,
      totalItems,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    // Re-throw the error to be handled by the component
    throw error
  }
}

// Add a new item
export async function addItem(item: NewItem): Promise<Item> {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      // Try to get error message from backend
      let errorMsg = `Failed to add item: ${response.statusText}`
      try {
        const errorData = await response.json()
        if (errorData.error) errorMsg = errorData.error
        if (errorData.message) errorMsg = errorData.message
      } catch {}
      throw new Error(errorMsg)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}

// Delete an item
export async function deleteItem(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 404) {
        throw new Error("Item not found")
      } else if (response.status === 403) {
        throw new Error("Not authorized to delete this item")
      } else if (response.status === 500) {
        throw new Error("Server error occurred")
      }
      throw new Error(`Failed to delete item: ${response.statusText}`)
    }
  } catch (error) {
    // Re-throw the error to be handled by the component
    throw error
  }
}
