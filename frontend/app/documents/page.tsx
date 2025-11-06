import { NursingDocumentsList } from '@/components/nursing-documents-list'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Abstract Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              🎯 Premium Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nursing Solutions &
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Assignments
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
              Discover our extensive collection of expertly crafted nursing solutions, case studies, and assignments designed to elevate your academic success
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <NursingDocumentsList />
      </div>
    </div>
  )
}