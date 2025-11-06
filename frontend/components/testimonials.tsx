'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "BSN Student",
    content: "Precise Nursing saved my semester! The care plans are professionally written and helped me understand complex concepts.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "RN Graduate",
    content: "Custom orders are amazing. Got exactly what I needed for my capstone project. Highly recommend!",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "MSN Student",
    content: "Quality documents, fast delivery, and excellent customer support. This platform is a game-changer.",
    rating: 5,
    avatar: "ER"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-sm font-medium mb-6 text-blue-600">
            ⭐ Student Success Stories
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trusted by Nursing Students Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful nursing students who've achieved their academic goals with our premium solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}