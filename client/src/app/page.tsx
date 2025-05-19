"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ItemTable } from "@/components/ItemTable"
import { AddItemSheet } from "@/components/AddItemSheet"
import { fetchItems, addItem, deleteItem } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { Item } from "@/lib/types"
import { Toaster } from "@/components/ui/toaster"

export default function WarehousePage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 10
  const { toast } = useToast()

  const loadItems = async (page: number = currentPage) => {
    try {
      setLoading(true)
      const data = await fetchItems(page, itemsPerPage)
      setItems(data.items)
      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
      setCurrentPage(data.currentPage)
    } catch (error) {
      // Handle the error and show a toast
      const errorMessage = error instanceof Error ? error.message : "Failed to load items"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      // Set empty items to prevent showing stale data
      setItems([])
      setTotalPages(1)
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadItems(1) // Always start with the first page
  }, [])

  // Set up polling for data refresh (every 30 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // If we're on the first page, refresh to get latest data
      if (currentPage === 1) {
        loadItems(1)
      }
    }, 10000) // 30 seconds

    return () => clearInterval(intervalId)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    loadItems(page)
  }

  const handleAddItem = async (name: string, quantity: number) => {
    try {
      await addItem({ name, quantity })
      toast({
        title: "Success",
        description: "Item added successfully",
      })
      // Always reload the first page after adding an item to see the latest data
      await loadItems(1)
      setCurrentPage(1)
      setIsAddSheetOpen(false)
    } catch (error) {
      // Handle the error and show a toast
      const errorMessage = error instanceof Error ? error.message : "Failed to add item"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id)
      toast({
        title: "Success",
        description: "Item deleted successfully",
      })
      // Reload current page after deleting
      await loadItems(currentPage)
    } catch (error) {
      // Handle the error and show a toast
      const errorMessage = error instanceof Error ? error.message : "Failed to delete item"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Warehouse Stock Management</h1>
        <Button onClick={() => setIsAddSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <ItemTable
        items={items}
        loading={loading}
        onDelete={handleDeleteItem}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <AddItemSheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} onSubmit={handleAddItem} />

      <Toaster />
    </div>
  )
}
