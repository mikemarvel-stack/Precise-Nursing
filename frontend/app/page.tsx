import { NursingDocumentsList } from '@/components/nursing-documents-list'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Pricing } from '@/components/pricing'
import { TrustSignals } from '@/components/trust-signals'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustSignals />
      <Features />
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/10 to-orange-300/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-sm font-medium mb-4 text-blue-600">
              🎆 Premium Collection
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured Nursing Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated nursing solutions crafted by expert professionals
            </p>
          </div>
          <NursingDocumentsList featured={true} limit={6} />
        </div>
      </section>
      <Pricing />
      <Testimonials />
    </div>
  )
}