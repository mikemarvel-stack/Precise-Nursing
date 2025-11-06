import { CustomOrderForm } from '@/components/custom-order-form'

export default function CustomOrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Modern Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              ✨ Custom Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get Your
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Custom Solution
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
              Tell us your requirements and get a personalized nursing solution crafted by our expert writers
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <CustomOrderForm />
      </div>
    </div>
  )
}