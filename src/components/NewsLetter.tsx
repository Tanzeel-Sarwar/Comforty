import { useState } from "react"
import { toast } from "react-hot-toast"

export default function NewsLetter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!")
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-[rgb(30,40,50,0.105)] w-full ">
      <div className="container  mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Or Subscribe To The Newsletter</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-grow px-0 py-2 rounded-sm bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-8 py-2 rounded-sm bg-transparent border-b-2 focus:outline-none border-gray-900 transition-colors uppercase text-sm tracking-wider hover:bg-gray-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

