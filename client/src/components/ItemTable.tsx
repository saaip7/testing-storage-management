"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import type { Item } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


interface ItemTableProps {
  items: Item[]
  loading: boolean
  onDelete: (id: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ItemTable({ items, loading, onDelete, currentPage, totalPages, onPageChange }: ItemTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
  }

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          <TableCell>
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell className="text-right">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse ml-auto"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )

  // Mobile card view
  const MobileCardView = () => (
    <div className="space-y-4 md:hidden">
      {loading ? (
        [...Array(3)].map((_, index) => (
          <Card key={`mobile-skeleton-${index}`} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="flex justify-end">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">No items found. Add your first item!</CardContent>
        </Card>
      ) : (
        items.map((item, index) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(item.createdAt)} at {formatTime(item.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedItem(item)}>
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Item Details</DrawerTitle>
                        <DrawerDescription>View complete item information</DrawerDescription>
                      </DrawerHeader>
                      {selectedItem && (
                        <div className="px-4 py-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Item Name</p>
                              <p className="text-lg font-medium">{selectedItem.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Quantity</p>
                              <p className="text-lg font-medium">{selectedItem.quantity}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Date Added</p>
                              <p>{formatDate(selectedItem.createdAt)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Time Added</p>
                              <p>{formatTime(selectedItem.createdAt)}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm font-medium text-gray-500">Item ID</p>
                              <p className="text-xs font-mono break-all">{selectedItem._id}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <DrawerFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleDeleteClick(selectedItem!._id)
                            ;(document.querySelector("[data-drawer-close]") as HTMLElement | null)?.click()
                          }}
                        >
                          Delete Item
                        </Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item._id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )

  return (
    <>
      {/* Mobile card view */}
      <MobileCardView />

      {/* Desktop table view */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">#</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <LoadingSkeleton />
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No items found. Add your first item!
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>{formatTime(item.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!loading && items.length > 0 && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item from the warehouse stock.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
