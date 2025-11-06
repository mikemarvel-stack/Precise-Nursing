'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              🎓 Trusted by 10,000+ Nursing Students
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Get A+ Grades with
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Expert Nursing Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Premium care plans, case studies & custom assignments by professional nurses. Instant downloads, 24/7 support, money-back guarantee.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-white/20"
              onClick={() => window.location.href = '/documents'}
            >
              📚 Browse 1000+ Documents
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/30"
              onClick={() => window.location.href = '/custom-order'}
            >
              ✨ Get Custom Solution
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1000+</h3>
              <p className="text-gray-200 font-medium">Premium Documents</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Expert</h3>
              <p className="text-gray-200 font-medium">Nursing Professionals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">100%</h3>
              <p className="text-gray-200 font-medium">Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}