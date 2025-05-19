"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddItemSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string, quantity: number) => void
}

export function AddItemSheet({ open, onOpenChange, onSubmit }: AddItemSheetProps) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [errors, setErrors] = useState<{
    name?: string
    quantity?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setName("")
    setQuantity("")
    setErrors({})
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  const validateForm = () => {
    const newErrors: {
      name?: string
      quantity?: string
    } = {}

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Item name is required"
    } else if (name.length > 100) {
      newErrors.name = "Maximum 100 characters"
    }

    // Validate quantity
    if (!quantity.trim()) {
      newErrors.quantity = "Quantity is required"
    } else {
      const quantityNumber = Number(quantity)
      if (isNaN(quantityNumber)) {
        newErrors.quantity = "Quantity must be a number"
      } else if (quantityNumber <= 0 || !Number.isInteger(quantityNumber)) {
        newErrors.quantity = "Quantity must be a positive integer"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(name, Number.parseInt(quantity))
      resetForm()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Add New Item</SheetTitle>
            <SheetDescription>Add a new item to the warehouse inventory.</SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4 px-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                step="1"
                disabled={isSubmitting}
              />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Item"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
