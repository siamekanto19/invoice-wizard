import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "Fr",
  CNY: "¥",
  INR: "₹",
  MXN: "$",
  BRL: "R$",
  RUB: "₽",
  KRW: "₩",
  SGD: "S$",
  HKD: "HK$",
  NOK: "kr",
  SEK: "kr",
  DKK: "kr",
  PLN: "zł",
  THB: "฿",
  MYR: "RM",
  ZAR: "R",
};

function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Times-Roman",
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingBottom: 30,
    borderBottom: "2px solid #d4af37",
  },
  companyInfo: {
    flex: 2,
  },
  invoiceDetails: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 8,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    paddingBottom: 8,
    borderBottom: "1px solid #d4af37",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    width: 120,
    color: "#34495e",
  },
  value: {
    flex: 1,
    color: "#2c3e50",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 30,
    border: "1px solid #d4af37",
  },
  tableHeader: {
    backgroundColor: "#2c3e50",
    color: "#ffffff",
    borderBottom: "2px solid #d4af37",
  },
  tableRow: {
    borderBottom: "1px solid #ecf0f1",
  },
  tableCell: {
    padding: 15,
    textAlign: "left",
    borderRight: "1px solid #ecf0f1",
  },
  tableCellRight: {
    padding: 15,
    textAlign: "right",
    borderRight: "1px solid #ecf0f1",
  },
  tableCellLast: {
    padding: 15,
    textAlign: "left",
  },
  tableCellRightLast: {
    padding: 15,
    textAlign: "right",
  },
  totals: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 30,
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 0,
    border: "2px solid #d4af37",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 12,
    minWidth: 300,
  },
  totalLabel: {
    flex: 1,
    textAlign: "right",
    marginRight: 20,
    color: "#34495e",
    fontSize: 14,
  },
  totalValue: {
    fontWeight: "bold",
    minWidth: 120,
    textAlign: "right",
    color: "#2c3e50",
    fontSize: 14,
  },
  notes: {
    marginTop: 35,
    fontSize: 11,
    color: "#7f8c8d",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 0,
    border: "1px solid #d4af37",
    fontStyle: "italic",
  },
  divider: {
    borderBottom: "1px solid #d4af37",
    marginVertical: 30,
  },
  paymentInfo: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 0,
    border: "1px solid #d4af37",
    marginTop: 25,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  accentBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 0,
    border: "1px solid #d4af37",
    marginBottom: 20,
  },
});

interface ElegantTemplateProps {
  invoiceData: any;
}

export default function ElegantTemplate({ invoiceData }: ElegantTemplateProps) {
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
                style={{ width: 100, height: 100, marginBottom: 15 }}
              />
            )}
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.subtitle}>{invoiceData.companyName}</Text>
            <Text style={styles.value}>{invoiceData.companyAddress}</Text>
            <Text style={styles.value}>
              {invoiceData.companyCity}, {invoiceData.companyState}{" "}
              {invoiceData.companyZip}
            </Text>
            <Text style={styles.value}>{invoiceData.companyCountry}</Text>
            <Text style={styles.value}>Phone: {invoiceData.companyPhone}</Text>
            <Text style={styles.value}>Email: {invoiceData.companyEmail}</Text>
            {invoiceData.companyWebsite && (
              <Text style={styles.value}>
                Website: {invoiceData.companyWebsite}
              </Text>
            )}
            {invoiceData.taxId && (
              <Text style={styles.value}>Tax ID: {invoiceData.taxId}</Text>
            )}
          </View>

          <View style={styles.invoiceDetails}>
            <Text style={styles.subtitle}>Invoice Number</Text>
            <Text style={styles.title}>{invoiceData.invoiceNumber}</Text>
            <Text style={styles.subtitle}>Date: {invoiceData.invoiceDate}</Text>
            <Text style={styles.subtitle}>Due Date: {invoiceData.dueDate}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.accentBox}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Client Name:</Text>
            <Text style={styles.value}>{invoiceData.clientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{invoiceData.clientAddress}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City, State, ZIP:</Text>
            <Text style={styles.value}>
              {invoiceData.clientCity}, {invoiceData.clientState}{" "}
              {invoiceData.clientZip}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>{invoiceData.clientCountry}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{invoiceData.clientPhone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{invoiceData.clientEmail}</Text>
          </View>
        </View>

        {/* Invoice Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services & Products</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Description</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Quantity</Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                Unit Price
              </Text>
              <Text style={[styles.tableCellRightLast, { flex: 1 }]}>
                Total
              </Text>
            </View>

            {invoiceData.items.map((item: any, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCellRight, { flex: 1 }]}>
                  {currencySymbol}
                  {item.unitPrice.toFixed(2)}
                </Text>
                <Text style={[styles.tableCellRightLast, { flex: 1 }]}>
                  {currencySymbol}
                  {item.total.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              {currencySymbol}
              {invoiceData.subtotal.toFixed(2)}
            </Text>
          </View>
          {invoiceData.taxRate > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Tax ({invoiceData.taxRate}%):
              </Text>
              <Text style={styles.totalValue}>
                {currencySymbol}
                {invoiceData.taxAmount.toFixed(2)}
              </Text>
            </View>
          )}
          {invoiceData.discountRate > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Discount ({invoiceData.discountRate}%):
              </Text>
              <Text style={styles.totalValue}>
                -{currencySymbol}
                {invoiceData.discountAmount.toFixed(2)}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.totalRow,
              { marginTop: 15, paddingTop: 15, borderTop: "1px solid #d4af37" },
            ]}
          >
            <Text
              style={[
                styles.totalLabel,
                { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
              ]}
            >
              TOTAL AMOUNT:
            </Text>
            <Text
              style={[
                styles.totalValue,
                { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
              ]}
            >
              {currencySymbol}
              {invoiceData.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentInfo}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Terms:</Text>
            <Text style={styles.value}>{invoiceData.paymentTerms}</Text>
          </View>
          {invoiceData.bankName && (
            <View style={styles.row}>
              <Text style={styles.label}>Bank Name:</Text>
              <Text style={styles.value}>{invoiceData.bankName}</Text>
            </View>
          )}
          {invoiceData.bankAccount && (
            <View style={styles.row}>
              <Text style={styles.label}>Account Number:</Text>
              <Text style={styles.value}>{invoiceData.bankAccount}</Text>
            </View>
          )}
          {invoiceData.bankRouting && (
            <View style={styles.row}>
              <Text style={styles.label}>Routing Number:</Text>
              <Text style={styles.value}>{invoiceData.bankRouting}</Text>
            </View>
          )}
          {invoiceData.bankSwift && (
            <View style={styles.row}>
              <Text style={styles.label}>SWIFT Code:</Text>
              <Text style={styles.value}>{invoiceData.bankSwift}</Text>
            </View>
          )}
          {invoiceData.bankBranch && (
            <View style={styles.row}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.value}>{invoiceData.bankBranch}</Text>
            </View>
          )}
        </View>

        {/* Notes */}
        {invoiceData.notes && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <Text>{invoiceData.notes}</Text>
          </View>
        )}

        {/* Terms */}
        {invoiceData.terms && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            <Text>{invoiceData.terms}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
