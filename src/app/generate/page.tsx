'use client';

import InvoiceForm from '@/components/invoice/invoice-form';
import InvoicePreview from '@/components/invoice/invoice-preview';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function GeneratePage() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Invoice</h1>
            <p className="text-lg text-gray-600">Fill in the details and generate your professional invoice</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <InvoiceForm />
          </div>
          <div>
            <InvoicePreview />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}