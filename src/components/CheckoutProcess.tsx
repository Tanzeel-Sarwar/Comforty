import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CheckoutProcess() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  if (!isSignedIn) {
    return (
      <div className="space-y-4">
        <h2 className="text-base text-center font-medium">Sign in to proceed with checkout</h2>
        <div className="grid grid-cols-2 space-x-4">
          <SignInButton mode="modal">
            <Button className="w-full bg-[#007580] text-white  py:3 rounded-full hover:bg-[#25595e] transition-colors">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full py:3 rounded-full transition-colors" variant="outline">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={() => router.push("/checkout")}
      className="w-full bg-[#007580] text-white py-3 rounded-full hover:bg-[#25595e] transition-colors"
    >
      Proceed to Payment
    </Button>
  )
}

