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
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyInfo: {
    flex: 1,
  },
  invoiceDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 9,
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textDecoration: 'underline',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
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
    marginBottom: 15,
  },
  tableHeader: {
    borderBottom: '1px solid #000',
    paddingBottom: 3,
  },
  tableRow: {
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    padding: 6,
    textAlign: 'left',
    flex: 3,
  },
  tableCellSmall: {
    padding: 6,
    textAlign: 'left',
    flex: 1,
  },
  tableCellRight: {
    padding: 6,
    textAlign: 'right',
    flex: 1,
  },
  totals: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 4,
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
    marginTop: 20,
    fontSize: 9,
    color: '#666',
  },
  divider: {
    borderBottom: '1px solid #000',
    marginVertical: 15,
  },
});

interface MinimalTemplateProps {
  invoiceData: any;
}

export default function MinimalTemplate({ invoiceData }: MinimalTemplateProps) {
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
                style={{ width: 60, height: 60, marginBottom: 8 }} 
                alt="Company Logo"
              />
            )}
            <Text style={styles.title}>{invoiceData.companyName}</Text>
            <Text style={styles.subtitle}>{invoiceData.companyAddress}</Text>
            <Text style={styles.subtitle}>{invoiceData.companyCity}, {invoiceData.companyState} {invoiceData.companyZip}</Text>
            <Text style={styles.subtitle}>{invoiceData.companyEmail}</Text>
            {invoiceData.companyPhone && <Text style={styles.subtitle}>{invoiceData.companyPhone}</Text>}
          </View>
          
          <View style={styles.invoiceDetails}>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.subtitle}>#{invoiceData.invoiceNumber}</Text>
            <Text style={styles.subtitle}>Date: {invoiceData.invoiceDate}</Text>
            <Text style={styles.subtitle}>Due: {invoiceData.dueDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.value}>{invoiceData.clientName}</Text>
          <Text style={styles.value}>{invoiceData.clientAddress}</Text>
          <Text style={styles.value}>{invoiceData.clientCity}, {invoiceData.clientState} {invoiceData.clientZip}</Text>
          <Text style={styles.value}>{invoiceData.clientEmail}</Text>
          {invoiceData.clientPhone && <Text style={styles.value}>{invoiceData.clientPhone}</Text>}
        </View>

        {/* Invoice Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tableCell}>Description</Text>
                <Text style={styles.tableCellSmall}>Qty</Text>
                <Text style={styles.tableCellRight}>Price</Text>
                <Text style={styles.tableCellRight}>Total</Text>
              </View>
            </View>
            
            {invoiceData.items.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.tableCell}>{item.description}</Text>
                  <Text style={styles.tableCellSmall}>{item.quantity}</Text>
                  <Text style={styles.tableCellRight}>{currencySymbol}{item.unitPrice.toFixed(2)}</Text>
                  <Text style={styles.tableCellRight}>{currencySymbol}{item.total.toFixed(2)}</Text>
                </View>
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
          <View style={[styles.totalRow, { marginTop: 8, paddingTop: 8, borderTop: '1px solid #000' }]}>
            <Text style={[styles.totalLabel, { fontSize: 12 }]}>Total:</Text>
            <Text style={[styles.totalValue, { fontSize: 12 }]}>{currencySymbol}{invoiceData.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <Text style={styles.value}>Terms: {invoiceData.paymentTerms}</Text>
          {invoiceData.bankName && <Text style={styles.value}>Bank: {invoiceData.bankName}</Text>}
          {invoiceData.bankAccount && <Text style={styles.value}>Account: {invoiceData.bankAccount}</Text>}
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
            <Text style={styles.sectionTitle}>Terms:</Text>
            <Text>{invoiceData.terms}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}