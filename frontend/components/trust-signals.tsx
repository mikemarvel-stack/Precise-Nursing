'use client'

import { Shield, Award, Clock, Users, Download, Star } from 'lucide-react'

const trustSignals = [
  {
    icon: Users,
    stat: "10,000+",
    label: "Happy Students",
    description: "Trusted by nursing students worldwide"
  },
  {
    icon: Download,
    stat: "50,000+",
    label: "Documents Delivered",
    description: "High-quality solutions provided"
  },
  {
    icon: Star,
    stat: "4.9/5",
    label: "Average Rating",
    description: "Based on 2,500+ reviews"
  },
  {
    icon: Clock,
    stat: "24/7",
    label: "Support Available",
    description: "Always here when you need us"
  }
]

const guarantees = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your privacy and data are fully protected"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Money-back guarantee on all purchases"
  },
  {
    icon: Clock,
    title: "Instant Access",
    description: "Download immediately after payment"
  }
]

export function TrustSignals() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {trustSignals.map((signal, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <signal.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{signal.stat}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{signal.label}</div>
              <div className="text-sm text-gray-600">{signal.description}</div>
            </div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Success is Guaranteed
            </h2>
            <p className="text-xl text-gray-600">
              We stand behind every document with our comprehensive guarantees
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <guarantee.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{guarantee.title}</h3>
                <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}