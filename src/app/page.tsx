import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Download, Eye } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create professional invoices with ease. Download as PDF instantly.
          </p>
          <Link href="/generate">
            <Button size="lg" className="text-lg px-8 py-3">
              <Plus className="mr-2 h-5 w-5" />
              Create New Invoice
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Professional Design</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Clean, modern invoice templates that make your business look professional
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Download className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Instant PDF Download</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate and download professional PDF invoices in seconds
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Eye className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Preview your invoice in real-time before downloading
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">Comprehensive Invoice Details</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Company and client information</li>
                  <li>• Multiple line items with automatic calculations</li>
                  <li>• Tax and discount support</li>
                  <li>• Payment terms and methods</li>
                  <li>• Bank details including SWIFT codes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">User-Friendly Interface</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Intuitive tabbed interface</li>
                  <li>• Real-time form validation</li>
                  <li>• Automatic data persistence</li>
                  <li>• Mobile-responsive design</li>
                  <li>• Professional PDF export</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to create your first invoice?
          </p>
          <Link href="/generate">
            <Button variant="outline" size="lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}