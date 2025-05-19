import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Link from "next/link"

export default function LogoutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">You Have Logged Out</h1>
        <p className="mb-6 text-center text-gray-600">
          Thank you for using the Warehouse Stock Management System. You have been successfully logged out.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">
              <LogIn className="mr-2 h-4 w-4" />
              Log In Again
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
