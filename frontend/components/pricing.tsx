'use client'

import { Check, Download, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

const pricingPlans = [
  {
    name: "Basic Documents",
    price: "$15-25",
    description: "Perfect for individual assignments",
    features: [
      "Care Plans & Case Studies",
      "Instant Download",
      "24/7 Support",
      "Money-Back Guarantee"
    ],
    icon: Download,
    popular: false
  },
  {
    name: "Custom Orders",
    price: "$20-50",
    description: "Personalized nursing solutions",
    features: [
      "Custom Written Content",
      "Your Specifications",
      "Expert Writers",
      "Unlimited Revisions",
      "Priority Support"
    ],
    icon: Clock,
    popular: true
  },
  {
    name: "Premium Package",
    price: "$100+",
    description: "Complete academic support",
    features: [
      "Multiple Documents",
      "Research Papers",
      "Thesis Support",
      "1-on-1 Consultation",
      "Extended Support"
    ],
    icon: Shield,
    popular: false
  }
]

export function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-sm font-medium mb-6 text-green-600">
            💰 Transparent Pricing
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Affordable Solutions for Every Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality nursing documents at student-friendly prices. No hidden fees, no subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-100'}`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gray-900 hover:bg-gray-800'} text-white`}>
                {plan.name === 'Custom Orders' ? 'Place Custom Order' : 'Browse Documents'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}