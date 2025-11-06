import { Mail, Phone, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Precise Nursing</h3>
            <p className="text-gray-300 mb-6">
              Your trusted source for high-quality nursing solutions, assignments, and academic support. 
              Helping nursing students excel in their studies.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:writerprecise@gmail.com" className="text-gray-300 hover:text-white">
                  writerprecise@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-400" />
                <a href="https://wa.me/254701591345" className="text-gray-300 hover:text-white">
                  WhatsApp: +254 701 591 345
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/documents" className="text-gray-300 hover:text-white">Browse Solutions</a></li>
              <li><a href="/custom-order" className="text-gray-300 hover:text-white">Custom Orders</a></li>
              <li><a href="/my-orders" className="text-gray-300 hover:text-white">My Orders</a></li>
              <li><a href="/auth/register" className="text-gray-300 hover:text-white">Register</a></li>
              <li><a href="/admin-access" className="text-gray-500 hover:text-blue-400 text-sm">Admin Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/documents?category=nursing-assignment" className="text-gray-300 hover:text-white">Nursing Assignments</a></li>
              <li><a href="/documents?category=case-study" className="text-gray-300 hover:text-white">Case Studies</a></li>
              <li><a href="/documents?category=care-plan" className="text-gray-300 hover:text-white">Care Plans</a></li>
              <li><a href="/documents?category=exam-prep" className="text-gray-300 hover:text-white">Exam Prep</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Precise Nursing. All rights reserved. | Quality nursing solutions for academic success.
          </p>
        </div>
      </div>
    </footer>
  )
}