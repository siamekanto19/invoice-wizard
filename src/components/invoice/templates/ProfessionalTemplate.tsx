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
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    lineHeight: 1.6,
  },

  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
    paddingBottom: 25,
    borderBottom: "3px solid #1e40af",
  },
  headerLeft: {
    flex: 2,
    paddingRight: 30,
  },
  headerRight: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },

  // Company Information
  companySection: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 8,
  },
  invoiceTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
    letterSpacing: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  companyDetails: {
    fontSize: 9,
    color: "#64748b",
    lineHeight: 1.5,
    marginBottom: 3,
  },

  // Invoice Details
  invoiceDetails: {
    backgroundColor: "#ffffff",
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  invoiceDate: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 5,
    flexDirection: "row",
  },
  dateLabel: {
    fontWeight: "bold",
    marginRight: 8,
    minWidth: 60,
  },
  dateValue: {
    flex: 1,
  },

  // Bill To Section
  billToSection: {
    marginBottom: 35,
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  clientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  clientDetails: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
    marginBottom: 3,
  },

  // Table Styles
  tableContainer: {
    marginBottom: 30,
    border: "2px solid #e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#1e40af",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #f1f5f9",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },
  tableRowAlt: {
    backgroundColor: "#f8fafc",
  },
  tableCell: {
    fontSize: 9,
    color: "#334155",
    paddingRight: 10,
    lineHeight: 1.4,
  },
  tableCellBold: {
    fontWeight: "bold",
    color: "#1e293b",
  },
  tableCellRight: {
    textAlign: "right",
  },

  // Totals Section
  totalsContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  totalsBox: {
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: 8,
    padding: 20,
    marginLeft: "50%",
    width: "50%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 10,
    color: "#475569",
    flex: 1,
    textAlign: "right",
    paddingRight: 15,
  },
  totalValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e293b",
    minWidth: 80,
    textAlign: "right",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingVertical: 8,
    marginTop: 10,
    borderTop: "2px solid #1e40af",
    backgroundColor: "#eff6ff",
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e40af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "right",
    paddingRight: 15,
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e40af",
    minWidth: 80,
    textAlign: "right",
  },

  // Payment Information
  paymentSection: {
    backgroundColor: "#eff6ff",
    border: "2px solid #bfdbfe",
    borderRadius: 8,
    padding: 20,
    marginBottom: 25,
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paymentDetails: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
    marginBottom: 4,
  },
  paymentLabel: {
    fontWeight: "bold",
    marginRight: 8,
    minWidth: 70,
  },

  // Notes and Terms
  notesSection: {
    backgroundColor: "#fefce8",
    border: "1px solid #fde047",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  termsSection: {
    backgroundColor: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: 20,
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  termsTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: 9,
    color: "#92400e",
    lineHeight: 1.5,
  },
  termsText: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    borderTop: "1px solid #e2e8f0",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "center",
  },
});

interface ProfessionalTemplateProps {
  invoiceData: any;
}

export default function ProfessionalTemplate({
  invoiceData,
}: ProfessionalTemplateProps) {
  const currencySymbol = getCurrencySymbol(invoiceData.currency);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Enhanced Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.companySection}>
              {invoiceData.companyLogo && (
                <Image src={invoiceData.companyLogo} style={styles.logo} />
              )}
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.companyName}>{invoiceData.companyName}</Text>
              <Text style={styles.companyDetails}>
                {invoiceData.companyAddress}
              </Text>
              <Text style={styles.companyDetails}>
                {invoiceData.companyCity}, {invoiceData.companyState}{" "}
                {invoiceData.companyZip}
              </Text>
              <Text style={styles.companyDetails}>
                {invoiceData.companyCountry}
              </Text>
              <Text style={styles.companyDetails}>
                Phone: {invoiceData.companyPhone}
              </Text>
              <Text style={styles.companyDetails}>
                Email: {invoiceData.companyEmail}
              </Text>
              {invoiceData.companyWebsite && (
                <Text style={styles.companyDetails}>
                  Website: {invoiceData.companyWebsite}
                </Text>
              )}
              {invoiceData.taxId && (
                <Text style={styles.companyDetails}>
                  Tax ID: {invoiceData.taxId}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.invoiceNumber}>
              Invoice #{invoiceData.invoiceNumber}
            </Text>
            <View style={styles.invoiceDate}>
              <Text style={styles.dateLabel}>Date:</Text>
              <Text style={styles.dateValue}>{invoiceData.invoiceDate}</Text>
            </View>
            <View style={styles.invoiceDate}>
              <Text style={styles.dateLabel}>Due Date:</Text>
              <Text style={styles.dateValue}>{invoiceData.dueDate}</Text>
            </View>
          </View>
        </View>

        {/* Enhanced Client Information */}
        <View style={styles.billToSection}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.clientName}>{invoiceData.clientName}</Text>
          <Text style={styles.clientDetails}>{invoiceData.clientAddress}</Text>
          <Text style={styles.clientDetails}>
            {invoiceData.clientCity}, {invoiceData.clientState}{" "}
            {invoiceData.clientZip}
          </Text>
          <Text style={styles.clientDetails}>{invoiceData.clientCountry}</Text>
          <Text style={styles.clientDetails}>
            Phone: {invoiceData.clientPhone}
          </Text>
          <Text style={styles.clientDetails}>
            Email: {invoiceData.clientEmail}
          </Text>
        </View>

        {/* Enhanced Invoice Items Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Items & Services</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Quantity</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
              Unit Price
            </Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Total</Text>
          </View>

          {/* Table Rows */}
          {invoiceData.items.map((item: any, index: number) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                ...(index % 2 === 1 ? [styles.tableRowAlt] : []),
              ]}
            >
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {item.description}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {item.quantity}
              </Text>
              <Text
                style={[styles.tableCell, styles.tableCellRight, { flex: 1 }]}
              >
                {currencySymbol}
                {item.unitPrice.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellRight,
                  styles.tableCellBold,
                  { flex: 1 },
                ]}
              >
                {currencySymbol}
                {item.total.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Enhanced Totals Section */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>
                {currencySymbol}
                {invoiceData.subtotal.toFixed(2)}
              </Text>
            </View>
            {invoiceData.taxRate > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  Tax ({invoiceData.taxRate}%)
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
                  Discount ({invoiceData.discountRate}%)
                </Text>
                <Text style={styles.totalValue}>
                  -{currencySymbol}
                  {invoiceData.discountAmount.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>
                {currencySymbol}
                {invoiceData.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Payment Information */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Payment Information</Text>
          <View style={styles.invoiceDate}>
            <Text style={styles.paymentLabel}>Terms:</Text>
            <Text style={styles.paymentDetails}>
              {invoiceData.paymentTerms}
            </Text>
          </View>
          {invoiceData.bankName && (
            <View style={styles.invoiceDate}>
              <Text style={styles.paymentLabel}>Bank:</Text>
              <Text style={styles.paymentDetails}>{invoiceData.bankName}</Text>
            </View>
          )}
          {invoiceData.bankAccount && (
            <View style={styles.invoiceDate}>
              <Text style={styles.paymentLabel}>Account:</Text>
              <Text style={styles.paymentDetails}>
                {invoiceData.bankAccount}
              </Text>
            </View>
          )}
          {invoiceData.bankRouting && (
            <View style={styles.invoiceDate}>
              <Text style={styles.paymentLabel}>Routing:</Text>
              <Text style={styles.paymentDetails}>
                {invoiceData.bankRouting}
              </Text>
            </View>
          )}
          {invoiceData.bankSwift && (
            <View style={styles.invoiceDate}>
              <Text style={styles.paymentLabel}>SWIFT:</Text>
              <Text style={styles.paymentDetails}>{invoiceData.bankSwift}</Text>
            </View>
          )}
          {invoiceData.bankBranch && (
            <View style={styles.invoiceDate}>
              <Text style={styles.paymentLabel}>Branch:</Text>
              <Text style={styles.paymentDetails}>
                {invoiceData.bankBranch}
              </Text>
            </View>
          )}
        </View>

        {/* Enhanced Notes */}
        {invoiceData.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>{invoiceData.notes}</Text>
          </View>
        )}

        {/* Enhanced Terms */}
        {invoiceData.terms && (
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms and Conditions</Text>
            <Text style={styles.termsText}>{invoiceData.terms}</Text>
          </View>
        )}

        {/* Professional Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This invoice was generated on {new Date().toLocaleDateString()} •
            Thank you for your business
          </Text>
        </View>
      </Page>
    </Document>
  );
}
