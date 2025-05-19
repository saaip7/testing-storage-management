import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Inventory Page</h1>
        <p className="mb-6 text-center text-gray-600">
          This is the Inventory page. Here you would manage your warehouse inventory items.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
