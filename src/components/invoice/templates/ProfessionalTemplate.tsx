import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'Fr', CNY: '¥',
  INR: '₹', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', SGD: 'S$', HKD: 'HK$',
  NOK: 'kr', SEK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿', MYR: 'RM', ZAR: 'R',
};

function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: '2px solid #2563eb',
    paddingBottom: 20,
  },
  companyInfo: {
    flex: 2,
  },
  invoiceDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 12,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
    color: '#475569',
  },
  value: {
    flex: 1,
    color: '#334155',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 25,
    border: '1px solid #e2e8f0',
  },
  tableHeader: {
    backgroundColor: '#f1f5f9',
    borderBottom: '2px solid #2563eb',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
  },
  tableCell: {
    padding: 12,
    textAlign: 'left',
    borderRight: '1px solid #e2e8f0',
  },
  tableCellRight: {
    padding: 12,
    textAlign: 'right',
    borderRight: '1px solid #e2e8f0',
  },
  tableCellLast: {
    padding: 12,
    textAlign: 'left',
  },
  tableCellRightLast: {
    padding: 12,
    textAlign: 'right',
  },
  totals: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 25,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 8,
    minWidth: 250,
  },
  totalLabel: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15,
    color: '#475569',
  },
  totalValue: {
    fontWeight: 'bold',
    minWidth: 100,
    textAlign: 'right',
    color: '#1e40af',
  },
  notes: {
    marginTop: 30,
    fontSize: 10,
    color: '#64748b',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
  },
  divider: {
    borderBottom: '1px solid #e2e8f0',
    marginVertical: 25,
  },
  paymentInfo: {
    backgroundColor: '#eff6ff',
    padding: 15,
    borderRadius: 6,
    border: '1px solid #bfdbfe',
    marginTop: 20,
  },
});

interface ProfessionalTemplateProps {
  invoiceData: any;
}

export default function ProfessionalTemplate({ invoiceData }: ProfessionalTemplateProps) {
  const currencySymbol = getCurrencySymbol(invoiceData.currency);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            {invoiceData.companyLogo && (
              <Image 
                src={invoiceData.companyLogo} 
                style={{ width: 80, height: 80, marginBottom: 12 }} 
                alt="Company Logo"
              />
            )}
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.subtitle}>{invoiceData.companyName}</Text>
            <Text style={styles.value}>{invoiceData.companyAddress}</Text>
            <Text style={styles.value}>{invoiceData.companyCity}, {invoiceData.companyState} {invoiceData.companyZip}</Text>
            <Text style={styles.value}>{invoiceData.companyCountry}</Text>
            <Text style={styles.value}>Phone: {invoiceData.companyPhone}</Text>
            <Text style={styles.value}>Email: {invoiceData.companyEmail}</Text>
            {invoiceData.companyWebsite && <Text style={styles.value}>Website: {invoiceData.companyWebsite}</Text>}
            {invoiceData.taxId && <Text style={styles.value}>Tax ID: {invoiceData.taxId}</Text>}
          </View>
          
          <View style={styles.invoiceDetails}>
            <Text style={styles.subtitle}>Invoice #: {invoiceData.invoiceNumber}</Text>
            <Text style={styles.subtitle}>Date: {invoiceData.invoiceDate}</Text>
            <Text style={styles.subtitle}>Due Date: {invoiceData.dueDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.value}>{invoiceData.clientName}</Text>
          <Text style={styles.value}>{invoiceData.clientAddress}</Text>
          <Text style={styles.value}>{invoiceData.clientCity}, {invoiceData.clientState} {invoiceData.clientZip}</Text>
          <Text style={styles.value}>{invoiceData.clientCountry}</Text>
          <Text style={styles.value}>Phone: {invoiceData.clientPhone}</Text>
          <Text style={styles.value}>Email: {invoiceData.clientEmail}</Text>
        </View>

        {/* Invoice Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items & Services</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Description</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Quantity</Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>Unit Price</Text>
              <Text style={[styles.tableCellRightLast, { flex: 1 }]}>Total</Text>
            </View>
            
            {invoiceData.items.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 3 }]}>{item.description}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
                <Text style={[styles.tableCellRight, { flex: 1 }]}>{currencySymbol}{item.unitPrice.toFixed(2)}</Text>
                <Text style={[styles.tableCellRightLast, { flex: 1 }]}>{currencySymbol}{item.total.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{currencySymbol}{invoiceData.subtotal.toFixed(2)}</Text>
          </View>
          {invoiceData.taxRate > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax ({invoiceData.taxRate}%):</Text>
              <Text style={styles.totalValue}>{currencySymbol}{invoiceData.taxAmount.toFixed(2)}</Text>
            </View>
          )}
          {invoiceData.discountRate > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount ({invoiceData.discountRate}%):</Text>
              <Text style={styles.totalValue}>-{currencySymbol}{invoiceData.discountAmount.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.totalRow, { marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }]}>
            <Text style={[styles.totalLabel, { fontSize: 16, fontWeight: 'bold', color: '#1e40af' }]}>TOTAL:</Text>
            <Text style={[styles.totalValue, { fontSize: 16, fontWeight: 'bold', color: '#1e40af' }]}>{currencySymbol}{invoiceData.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentInfo}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <Text style={styles.value}>Payment Terms: {invoiceData.paymentTerms}</Text>
          {invoiceData.bankName && <Text style={styles.value}>Bank: {invoiceData.bankName}</Text>}
          {invoiceData.bankAccount && <Text style={styles.value}>Account: {invoiceData.bankAccount}</Text>}
          {invoiceData.bankRouting && <Text style={styles.value}>Routing: {invoiceData.bankRouting}</Text>}
          {invoiceData.bankSwift && <Text style={styles.value}>SWIFT: {invoiceData.bankSwift}</Text>}
          {invoiceData.bankBranch && <Text style={styles.value}>Branch: {invoiceData.bankBranch}</Text>}
        </View>

        {/* Notes */}
        {invoiceData.notes && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes:</Text>
            <Text>{invoiceData.notes}</Text>
          </View>
        )}

        {/* Terms */}
        {invoiceData.terms && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Terms and Conditions:</Text>
            <Text>{invoiceData.terms}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}