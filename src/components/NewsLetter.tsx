import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsLetter() {
    return (
        <section className="bg-gray-50 py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 sm:mb-6 md:mb-8">
                    Or Subscribe To The Newsletter
                </h2>
                <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input
                        type="email"
                        placeholder="Email Address..."
                        className="flex-1 bg-white border-gray-200"
                    />
                    <Button
                        className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 transition-transform duration-300 hover:scale-105"
                    >
                        SUBMIT
                    </Button>
                </div>
            </div>
        </section>
    )
}
