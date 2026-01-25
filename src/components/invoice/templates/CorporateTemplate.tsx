import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/store/invoice-store";

interface Props {
  data: InvoiceData;
  previewMode?: boolean;
}

const CorporateInvoiceDocument = ({ data, previewMode = false }: Props) => {
  const colors = {
    primary: "#1e3a5f",
    secondary: "#2c5282",
    accent: "#3182ce",
    text: "#2d3748",
    textLight: "#718096",
    border: "#e2e8f0",
    background: "#f7fafc",
  };

  // Use Helvetica - a built-in PDF font that doesn't require registration
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 10,
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 30,
      backgroundColor: "#FFFFFF",
      color: colors.text,
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 40,
      paddingRight: 40,
      marginBottom: 30,
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 28,
      fontFamily: "Helvetica-Bold",
      color: "#FFFFFF",
      letterSpacing: 2,
    },
    invoiceNumber: {
      fontSize: 12,
      color: "#FFFFFF",
    },
    body: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    addressSection: {
      flexDirection: "row",
      marginBottom: 25,
      justifyContent: "space-between",
    },
    addressBlock: {
      width: "48%",
    },
    sectionTitle: {
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
      marginBottom: 8,
      color: colors.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    companyName: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 4,
    },
    companyDetail: {
      fontSize: 10,
      color: colors.textLight,
      marginBottom: 2,
    },
    infoBar: {
      flexDirection: "row",
      backgroundColor: colors.background,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 25,
    },
    infoItem: {
      width: "25%",
    },
    infoLabel: {
      fontSize: 8,
      fontFamily: "Helvetica-Bold",
      color: colors.textLight,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 3,
    },
    infoValue: {
      fontSize: 10,
      color: colors.text,
      fontFamily: "Helvetica-Bold",
    },
    table: {
      marginBottom: 20,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: colors.primary,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    tableRow: {
      flexDirection: "row",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tableCell: {
      fontSize: 10,
      color: colors.text,
    },
    tableCellHeader: {
      fontFamily: "Helvetica-Bold",
      color: "#FFFFFF",
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    descriptionCell: { width: "45%" },
    quantityCell: { width: "15%", textAlign: "center" },
    priceCell: { width: "20%", textAlign: "right" },
    totalCell: { width: "20%", textAlign: "right" },
    summary: {
      alignItems: "flex-end",
      marginBottom: 25,
    },
    summaryBox: {
      width: 220,
      backgroundColor: colors.background,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    summaryLabel: {
      fontSize: 10,
      color: colors.textLight,
    },
    summaryValue: {
      fontSize: 10,
      color: colors.text,
      fontFamily: "Helvetica-Bold",
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 10,
      marginTop: 6,
    },
    totalLabel: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
    },
    totalValue: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
    },
    footer: {
      marginTop: 20,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerTitle: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
      marginBottom: 6,
    },
    footerText: {
      fontSize: 9,
      color: colors.textLight,
      lineHeight: 1.5,
    },
  });

  const currencySymbol =
    {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "C$", AUD: "A$",
      INR: "₹", BDT: "৳", PKR: "₨", CNY: "¥", CHF: "Fr",
    }[data.currency] || "$";

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  const formatAddress = (parts: (string | undefined)[]) =>
    parts.filter(Boolean).join(", ");

  const toCss = (style: any = {}) => {
    const s: Record<string, any> = { ...style };
    if (s.borderBottomWidth !== undefined && s.borderBottomColor) {
      s.borderBottom = `${s.borderBottomWidth}px solid ${s.borderBottomColor}`;
      delete s.borderBottomWidth; delete s.borderBottomColor;
    }
    if (s.borderTopWidth !== undefined && s.borderTopColor) {
      s.borderTop = `${s.borderTopWidth}px solid ${s.borderTopColor}`;
      delete s.borderTopWidth; delete s.borderTopColor;
    }
    if (s.paddingTop !== undefined || s.paddingBottom !== undefined ||
        s.paddingLeft !== undefined || s.paddingRight !== undefined) {
      s.padding = `${s.paddingTop || 0}px ${s.paddingRight || 0}px ${s.paddingBottom || 0}px ${s.paddingLeft || 0}px`;
      delete s.paddingTop; delete s.paddingBottom; delete s.paddingLeft; delete s.paddingRight;
    }
    if (s.flexDirection) { s.display = "flex"; }
    return s;
  };

  if (previewMode) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 10, backgroundColor: "#FFFFFF", color: colors.text }}>
        {/* Header */}
        <div style={{ backgroundColor: colors.primary, padding: "30px 40px", marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", letterSpacing: 2 }}>INVOICE</div>
            <div style={{ fontSize: 12, color: "#FFFFFF", opacity: 0.9 }}>#{data.invoiceNumber}</div>
          </div>
        </div>

        <div style={{ padding: "0 40px" }}>
          {/* Address Section */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
            <div style={{ width: "48%" }}>
              <div style={toCss(styles.sectionTitle)}>From</div>
              <div style={toCss(styles.companyName)}>{data.companyName || "Your Company"}</div>
              <div style={toCss(styles.companyDetail)}>{data.companyEmail}</div>
              <div style={toCss(styles.companyDetail)}>{data.companyPhone}</div>
              <div style={toCss(styles.companyDetail)}>
                {formatAddress([data.companyAddress, data.companyCity, data.companyState, data.companyZip])}
              </div>
            </div>
            <div style={{ width: "48%" }}>
              <div style={toCss(styles.sectionTitle)}>Bill To</div>
              <div style={toCss(styles.companyName)}>{data.clientName || "Client Name"}</div>
              <div style={toCss(styles.companyDetail)}>{data.clientEmail}</div>
              <div style={toCss(styles.companyDetail)}>{data.clientPhone}</div>
              <div style={toCss(styles.companyDetail)}>
                {formatAddress([data.clientAddress, data.clientCity, data.clientState, data.clientZip])}
              </div>
            </div>
          </div>

          {/* Info Bar */}
          <div style={{ display: "flex", backgroundColor: colors.background, padding: "12px 15px", marginBottom: 25 }}>
            <div style={{ width: "25%" }}>
              <div style={toCss(styles.infoLabel)}>Invoice Date</div>
              <div style={toCss(styles.infoValue)}>{data.invoiceDate ? formatDate(data.invoiceDate) : "—"}</div>
            </div>
            <div style={{ width: "25%" }}>
              <div style={toCss(styles.infoLabel)}>Due Date</div>
              <div style={toCss(styles.infoValue)}>{data.dueDate ? formatDate(data.dueDate) : "—"}</div>
            </div>
            <div style={{ width: "25%" }}>
              <div style={toCss(styles.infoLabel)}>Payment Terms</div>
              <div style={toCss(styles.infoValue)}>{data.paymentTerms || "—"}</div>
            </div>
            <div style={{ width: "25%" }}>
              <div style={toCss(styles.infoLabel)}>Currency</div>
              <div style={toCss(styles.infoValue)}>{data.currency}</div>
            </div>
          </div>

          {/* Table */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", backgroundColor: colors.primary, padding: "10px" }}>
              <div style={{ width: "45%", color: "#FFF", fontSize: 9, fontWeight: 600, textTransform: "uppercase" }}>Description</div>
              <div style={{ width: "15%", color: "#FFF", fontSize: 9, fontWeight: 600, textAlign: "center", textTransform: "uppercase" }}>Qty</div>
              <div style={{ width: "20%", color: "#FFF", fontSize: 9, fontWeight: 600, textAlign: "right", textTransform: "uppercase" }}>Rate</div>
              <div style={{ width: "20%", color: "#FFF", fontSize: 9, fontWeight: 600, textAlign: "right", textTransform: "uppercase" }}>Amount</div>
            </div>
            {data.items.map((item) => (
              <div key={item.id} style={{ display: "flex", padding: "10px", borderBottom: `1px solid ${colors.border}` }}>
                <div style={{ width: "45%", fontSize: 10 }}>{item.description}</div>
                <div style={{ width: "15%", fontSize: 10, textAlign: "center" }}>{item.quantity}</div>
                <div style={{ width: "20%", fontSize: 10, textAlign: "right" }}>{currencySymbol}{item.unitPrice.toFixed(2)}</div>
                <div style={{ width: "20%", fontSize: 10, textAlign: "right" }}>{currencySymbol}{item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 25 }}>
            <div style={{ width: 220, backgroundColor: colors.background, padding: "15px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={toCss(styles.summaryLabel)}>Subtotal</span>
                <span style={toCss(styles.summaryValue)}>{currencySymbol}{data.subtotal.toFixed(2)}</span>
              </div>
              {data.taxRate > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={toCss(styles.summaryLabel)}>Tax ({data.taxRate}%)</span>
                  <span style={toCss(styles.summaryValue)}>{currencySymbol}{data.taxAmount.toFixed(2)}</span>
                </div>
              )}
              {data.discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={toCss(styles.summaryLabel)}>Discount</span>
                  <span style={toCss(styles.summaryValue)}>-{currencySymbol}{data.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${colors.border}`, paddingTop: 10, marginTop: 6 }}>
                <span style={toCss(styles.totalLabel)}>Total</span>
                <span style={toCss(styles.totalValue)}>{currencySymbol}{data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {data.notes && (
            <div style={toCss(styles.footer)}>
              <div style={toCss(styles.footerTitle)}>Notes</div>
              <div style={toCss(styles.footerText)}>{data.notes}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{data.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.addressSection}>
            <View style={styles.addressBlock}>
              <Text style={styles.sectionTitle}>From</Text>
              <Text style={styles.companyName}>{data.companyName || "Your Company"}</Text>
              <Text style={styles.companyDetail}>{data.companyEmail}</Text>
              <Text style={styles.companyDetail}>{data.companyPhone}</Text>
              <Text style={styles.companyDetail}>
                {formatAddress([data.companyAddress, data.companyCity, data.companyState, data.companyZip])}
              </Text>
            </View>
            <View style={styles.addressBlock}>
              <Text style={styles.sectionTitle}>Bill To</Text>
              <Text style={styles.companyName}>{data.clientName || "Client Name"}</Text>
              <Text style={styles.companyDetail}>{data.clientEmail}</Text>
              <Text style={styles.companyDetail}>{data.clientPhone}</Text>
              <Text style={styles.companyDetail}>
                {formatAddress([data.clientAddress, data.clientCity, data.clientState, data.clientZip])}
              </Text>
            </View>
          </View>

          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Invoice Date</Text>
              <Text style={styles.infoValue}>{data.invoiceDate ? formatDate(data.invoiceDate) : "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={styles.infoValue}>{data.dueDate ? formatDate(data.dueDate) : "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Payment Terms</Text>
              <Text style={styles.infoValue}>{data.paymentTerms || "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Currency</Text>
              <Text style={styles.infoValue}>{data.currency}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.tableCellHeader, styles.descriptionCell]}>Description</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader, styles.quantityCell]}>Qty</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader, styles.priceCell]}>Rate</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader, styles.totalCell]}>Amount</Text>
            </View>
            {data.items.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                <Text style={[styles.tableCell, styles.quantityCell]}>{item.quantity}</Text>
                <Text style={[styles.tableCell, styles.priceCell]}>{currencySymbol}{item.unitPrice.toFixed(2)}</Text>
                <Text style={[styles.tableCell, styles.totalCell]}>{currencySymbol}{item.total.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{currencySymbol}{data.subtotal.toFixed(2)}</Text>
              </View>
              {data.taxRate > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax ({data.taxRate}%)</Text>
                  <Text style={styles.summaryValue}>{currencySymbol}{data.taxAmount.toFixed(2)}</Text>
                </View>
              )}
              {data.discountAmount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount</Text>
                  <Text style={styles.summaryValue}>-{currencySymbol}{data.discountAmount.toFixed(2)}</Text>
                </View>
              )}
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{currencySymbol}{data.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {data.notes && (
            <View wrap={false} style={styles.footer}>
              <Text style={styles.footerTitle}>Notes</Text>
              <Text style={styles.footerText}>{data.notes}</Text>
            </View>
          )}

          {data.terms && (
            <View wrap={false} style={styles.footer}>
              <Text style={styles.footerTitle}>Terms & Conditions</Text>
              <Text style={styles.footerText}>{data.terms}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CorporateInvoiceDocument;
