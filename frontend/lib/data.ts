
import { Document } from '@/types/document';

// In-memory data store (replace with a database in production)
export let documents: Document[] = [
  { 
    id: '1', 
    title: 'Sample Document 1', 
    description: 'This is a sample.', 
    category: 'case-study', 
    level: 'bsn', 
    price: 10.99, 
    fileUrl: '/documents/sample1.pdf', 
    imageUrl: '/images/sample1.jpg' 
  },
  { 
    id: '2', 
    title: 'Sample Document 2', 
    description: 'This is another sample.', 
    category: 'care-plan', 
    level: 'msn', 
    price: 15.50, 
    fileUrl: '/documents/sample2.pdf', 
    imageUrl: '/images/sample2.jpg' 
  },
];
