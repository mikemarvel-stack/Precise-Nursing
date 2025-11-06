import { Shield, Download, Clock, CreditCard } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your privacy is protected with enterprise-grade security',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Download,
      title: 'Instant Downloads',
      description: 'Access your solutions immediately after payment',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it from our support team',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with Stripe',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-blue-600">
            ✨ Why Choose Precise Nursing?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Excellence in Every Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide the highest quality nursing solutions and assignments to help you succeed in your academic journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}