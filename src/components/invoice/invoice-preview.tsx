'use client';

import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { useInvoiceStore } from '@/store/invoice-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Progress, CheckCircle, AlertCircle, FileText, Users, Package, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { Progress as ProgressComponent } from '@/components/ui/progress';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ElegantTemplate from './templates/ElegantTemplate';

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'Fr',
  CNY: '¥',
  INR: '₹',
  MXN: '$',
  BRL: 'R$',
  RUB: '₽',
  KRW: '₩',
  SGD: 'S$',
  HKD: 'HK$',
  NOK: 'kr',
  SEK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
  THB: '฿',
  MYR: 'RM',
  ZAR: 'R',
};

function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

function calculateCompletionProgress(invoiceData: any): number {
  const fields = [
    'invoiceNumber',
    'companyName',
    'clientName',
    'items',
    'currency',
    'paymentTerms',
    'template'
  ];
  
  const completedFields = fields.filter(field => {
    if (field === 'items') {
      return invoiceData[field] && invoiceData[field].length > 0;
    }
    return invoiceData[field] && invoiceData[field].toString().trim() !== '';
  });
  
  return Math.round((completedFields.length / fields.length) * 100);
}

function InvoiceSummary() {
  const { invoiceData } = useInvoiceStore();
  const progress = calculateCompletionProgress(invoiceData);
  const currencySymbol = getCurrencySymbol(invoiceData.currency);

  const requiredFields = [
    { key: 'invoiceNumber', label: 'Invoice Number', value: invoiceData.invoiceNumber },
    { key: 'companyName', label: 'Company Name', value: invoiceData.companyName },
    { key: 'clientName', label: 'Client Name', value: invoiceData.clientName },
  ];

  const optionalFields = [
    { key: 'companyEmail', label: 'Company Email', value: invoiceData.companyEmail },
    { key: 'clientEmail', label: 'Client Email', value: invoiceData.clientEmail },
    { key: 'companyPhone', label: 'Company Phone', value: invoiceData.companyPhone },
    { key: 'clientPhone', label: 'Client Phone', value: invoiceData.clientPhone },
    { key: 'companyAddress', label: 'Company Address', value: invoiceData.companyAddress },
    { key: 'clientAddress', label: 'Client Address', value: invoiceData.clientAddress },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Invoice Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Completion Progress</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <ProgressComponent value={progress} className="h-2" />
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {progress === 100 ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Invoice is ready to generate!</span>
              </>
            ) : progress >= 70 ? (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Almost ready - fill in remaining fields</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>Complete required fields to generate invoice</span>
              </>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Package className="h-6 w-6 mx-auto mb-1 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{invoiceData.items.length}</div>
            <div className="text-xs text-gray-600">Items</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <DollarSign className="h-6 w-6 mx-auto mb-1 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{currencySymbol}{invoiceData.total.toFixed(2)}</div>
            <div className="text-xs text-gray-600">Total Amount</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 mx-auto mb-1 text-purple-600" />
            <div className="text-lg font-bold text-purple-600">{invoiceData.currency}</div>
            <div className="text-xs text-gray-600">Currency</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <FileText className="h-6 w-6 mx-auto mb-1 text-orange-600" />
            <div className="text-lg font-bold text-orange-600">{invoiceData.paymentTerms}</div>
            <div className="text-xs text-gray-600">Payment Terms</div>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-lg">
            <FileText className="h-6 w-6 mx-auto mb-1 text-indigo-600" />
            <div className="text-lg font-bold text-indigo-600 capitalize">{invoiceData.template}</div>
            <div className="text-xs text-gray-600">Template</div>
          </div>
        </div>

        {/* Required Fields Status */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Required Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {requiredFields.map((field) => (
              <div key={field.key} className="flex items-center gap-2 p-2 rounded border">
                {field.value ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">{field.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Fields Status */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Optional Fields Completed</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {optionalFields.map((field) => (
              <div key={field.key} className="flex items-center gap-2 p-2 rounded border bg-gray-50">
                {field.value ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="h-4 w-4 border border-gray-300 rounded" />
                )}
                <span className="text-sm">{field.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          {progress === 100 && invoiceData.items.length > 0 && (
            <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">Ready to download PDF</span>
            </div>
          )}
          {invoiceData.items.length === 0 && (
            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">Add at least one item</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  companyInfo: {
    flex: 1,
  },
  invoiceDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1px solid #ddd',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    flex: 1,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    padding: 8,
    textAlign: 'left',
  },
  tableCellRight: {
    padding: 8,
    textAlign: 'right',
  },
  totals: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 5,
    minWidth: 200,
  },
  totalLabel: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
  },
  totalValue: {
    fontWeight: 'bold',
    minWidth: 80,
    textAlign: 'right',
  },
  notes: {
    marginTop: 30,
    fontSize: 10,
    color: '#666',
  },
  divider: {
    borderBottom: '1px solid #ddd',
    marginVertical: 20,
  },
});

function InvoiceDocument() {
  const { invoiceData } = useInvoiceStore();

  switch (invoiceData.template) {
    case 'professional':
      return <ProfessionalTemplate invoiceData={invoiceData} />;
    case 'minimal':
      return <MinimalTemplate invoiceData={invoiceData} />;
    case 'elegant':
      return <ElegantTemplate invoiceData={invoiceData} />;
    default:
      return <ProfessionalTemplate invoiceData={invoiceData} />;
  }
}

export default function InvoicePreview() {
  const [showPreview, setShowPreview] = useState(false);
  const { invoiceData } = useInvoiceStore();

  const handleDownloadPDF = async () => {
    const { pdf } = await import('@react-pdf/renderer');
    const blob = await pdf(<InvoiceDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <InvoiceSummary />
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Invoice Preview</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2"
                disabled={invoiceData.items.length === 0}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showPreview ? (
            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
              <PDFViewer width="100%" height="100%">
                <InvoiceDocument />
              </PDFViewer>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Click "Show Preview" to see the invoice preview</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}