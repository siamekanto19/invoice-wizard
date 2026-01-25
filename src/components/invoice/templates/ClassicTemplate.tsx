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

const ClassicInvoiceDocument = ({ data, previewMode = false }: Props) => {
  const colors = {
    primary: "#1a1a1a",
    text: "#333333",
    textMuted: "#666666",
    border: "#cccccc",
    borderLight: "#e5e5e5",
  };

  // Use Helvetica - a built-in PDF font that doesn't require registration
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 10,
      paddingTop: 50,
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 50,
      backgroundColor: "#FFFFFF",
      color: colors.text,
    },
    header: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
      paddingBottom: 20,
      marginBottom: 30,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    title: {
      fontSize: 28,
      fontFamily: "Helvetica",
      color: colors.primary,
      letterSpacing: 3,
    },
    invoiceDetails: {
      textAlign: "right",
    },
    invoiceNumber: {
      fontSize: 11,
      color: colors.text,
      marginBottom: 4,
    },
    invoiceDate: {
      fontSize: 10,
      color: colors.textMuted,
    },
    addressSection: {
      flexDirection: "row",
      marginBottom: 35,
      justifyContent: "space-between",
    },
    addressBlock: {
      width: "45%",
    },
    sectionLabel: {
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
      marginBottom: 10,
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
      paddingBottom: 5,
    },
    companyName: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
      marginBottom: 6,
    },
    companyDetail: {
      fontSize: 10,
      color: colors.textMuted,
      marginBottom: 2,
      lineHeight: 1.4,
    },
    table: {
      marginBottom: 30,
    },
    tableHeader: {
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
      paddingTop: 8,
      paddingBottom: 8,
    },
    tableRow: {
      flexDirection: "row",
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    tableCell: {
      fontSize: 10,
      color: colors.text,
    },
    tableCellHeader: {
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    descriptionCell: { width: "50%" },
    quantityCell: { width: "15%", textAlign: "center" },
    priceCell: { width: "17.5%", textAlign: "right" },
    totalCell: { width: "17.5%", textAlign: "right" },
    summarySection: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    summary: {
      width: 200,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 6,
      paddingBottom: 6,
    },
    summaryLabel: {
      fontSize: 10,
      color: colors.textMuted,
    },
    summaryValue: {
      fontSize: 10,
      color: colors.text,
    },
    totalRow: {
      borderTopWidth: 2,
      borderTopColor: colors.primary,
      marginTop: 8,
      paddingTop: 12,
    },
    totalLabel: {
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    totalValue: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      color: colors.primary,
    },
    footer: {
      marginTop: 40,
    },
    footerSection: {
      marginBottom: 20,
    },
    footerTitle: {
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
      paddingBottom: 5,
      marginBottom: 10,
    },
    footerText: {
      fontSize: 10,
      color: colors.text,
      lineHeight: 1.6,
    },
    bankGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    bankItem: {
      width: "50%",
      marginBottom: 6,
    },
    bankLabel: {
      fontSize: 9,
      color: colors.textMuted,
    },
    bankValue: {
      fontSize: 10,
      color: colors.text,
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
      year: "numeric", month: "long", day: "numeric",
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
      <div style={{ fontFamily: "Georgia, serif", fontSize: 10, padding: 50, backgroundColor: "#FFFFFF", color: colors.text }}>
        {/* Header */}
        <div style={{ borderBottom: `2px solid ${colors.primary}`, paddingBottom: 20, marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontSize: 28, fontWeight: 400, color: colors.primary, letterSpacing: 3 }}>INVOICE</div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: colors.text, marginBottom: 4 }}>Invoice #{data.invoiceNumber}</div>
              <div style={{ fontSize: 10, color: colors.textMuted }}>
                {data.invoiceDate ? formatDate(data.invoiceDate) : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 35 }}>
          <div style={{ width: "45%" }}>
            <div style={toCss(styles.sectionLabel)}>From</div>
            <div style={toCss(styles.companyName)}>{data.companyName || "Your Company"}</div>
            <div style={toCss(styles.companyDetail)}>{data.companyEmail}</div>
            <div style={toCss(styles.companyDetail)}>{data.companyPhone}</div>
            <div style={toCss(styles.companyDetail)}>
              {formatAddress([data.companyAddress, data.companyCity, data.companyState, data.companyZip, data.companyCountry])}
            </div>
            {data.taxId && <div style={toCss(styles.companyDetail)}>Tax ID: {data.taxId}</div>}
          </div>
          <div style={{ width: "45%" }}>
            <div style={toCss(styles.sectionLabel)}>Bill To</div>
            <div style={toCss(styles.companyName)}>{data.clientName || "Client Name"}</div>
            <div style={toCss(styles.companyDetail)}>{data.clientEmail}</div>
            <div style={toCss(styles.companyDetail)}>{data.clientPhone}</div>
            <div style={toCss(styles.companyDetail)}>
              {formatAddress([data.clientAddress, data.clientCity, data.clientState, data.clientZip, data.clientCountry])}
            </div>
          </div>
        </div>

        {/* Due Date */}
        {data.dueDate && (
          <div style={{ marginBottom: 25, fontSize: 10, color: colors.textMuted }}>
            <strong style={{ color: colors.text }}>Payment Due:</strong> {formatDate(data.dueDate)}
            {data.paymentTerms && <span> ({data.paymentTerms})</span>}
          </div>
        )}

        {/* Table */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", borderBottom: `2px solid ${colors.primary}`, padding: "8px 0" }}>
            <div style={{ width: "50%", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>Description</div>
            <div style={{ width: "15%", fontSize: 9, fontWeight: 600, textAlign: "center", textTransform: "uppercase", letterSpacing: 0.8 }}>Qty</div>
            <div style={{ width: "17.5%", fontSize: 9, fontWeight: 600, textAlign: "right", textTransform: "uppercase", letterSpacing: 0.8 }}>Rate</div>
            <div style={{ width: "17.5%", fontSize: 9, fontWeight: 600, textAlign: "right", textTransform: "uppercase", letterSpacing: 0.8 }}>Amount</div>
          </div>
          {data.items.map((item) => (
            <div key={item.id} style={{ display: "flex", padding: "10px 0", borderBottom: `1px solid ${colors.borderLight}` }}>
              <div style={{ width: "50%", fontSize: 10 }}>{item.description}</div>
              <div style={{ width: "15%", fontSize: 10, textAlign: "center" }}>{item.quantity}</div>
              <div style={{ width: "17.5%", fontSize: 10, textAlign: "right" }}>{currencySymbol}{item.unitPrice.toFixed(2)}</div>
              <div style={{ width: "17.5%", fontSize: 10, textAlign: "right" }}>{currencySymbol}{item.total.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: 200 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span style={toCss(styles.summaryLabel)}>Subtotal</span>
              <span style={toCss(styles.summaryValue)}>{currencySymbol}{data.subtotal.toFixed(2)}</span>
            </div>
            {data.taxRate > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <span style={toCss(styles.summaryLabel)}>Tax ({data.taxRate}%)</span>
                <span style={toCss(styles.summaryValue)}>{currencySymbol}{data.taxAmount.toFixed(2)}</span>
              </div>
            )}
            {data.discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <span style={toCss(styles.summaryLabel)}>Discount</span>
                <span style={toCss(styles.summaryValue)}>-{currencySymbol}{data.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: `2px solid ${colors.primary}`, marginTop: 8, paddingTop: 12 }}>
              <span style={toCss(styles.totalLabel)}>Total</span>
              <span style={toCss(styles.totalValue)}>{currencySymbol}{data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bank Info */}
        {(data.bankName || data.bankAccount) && (
          <div style={{ marginTop: 40 }}>
            <div style={toCss(styles.footerTitle)}>Payment Information</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {data.bankName && (
                <div style={{ width: "50%", marginBottom: 6 }}>
                  <div style={toCss(styles.bankLabel)}>Bank</div>
                  <div style={toCss(styles.bankValue)}>{data.bankName}</div>
                </div>
              )}
              {data.bankAccount && (
                <div style={{ width: "50%", marginBottom: 6 }}>
                  <div style={toCss(styles.bankLabel)}>Account</div>
                  <div style={toCss(styles.bankValue)}>{data.bankAccount}</div>
                </div>
              )}
              {data.bankRouting && (
                <div style={{ width: "50%", marginBottom: 6 }}>
                  <div style={toCss(styles.bankLabel)}>Routing</div>
                  <div style={toCss(styles.bankValue)}>{data.bankRouting}</div>
                </div>
              )}
              {data.bankSwift && (
                <div style={{ width: "50%", marginBottom: 6 }}>
                  <div style={toCss(styles.bankLabel)}>SWIFT</div>
                  <div style={toCss(styles.bankValue)}>{data.bankSwift}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div style={{ marginTop: 30 }}>
            <div style={toCss(styles.footerTitle)}>Notes</div>
            <div style={toCss(styles.footerText)}>{data.notes}</div>
          </div>
        )}

        {/* Terms */}
        {data.terms && (
          <div style={{ marginTop: 20 }}>
            <div style={toCss(styles.footerTitle)}>Terms & Conditions</div>
            <div style={toCss(styles.footerText)}>{data.terms}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>INVOICE</Text>
            <View style={styles.invoiceDetails}>
              <Text style={styles.invoiceNumber}>Invoice #{data.invoiceNumber}</Text>
              <Text style={styles.invoiceDate}>
                {data.invoiceDate ? formatDate(data.invoiceDate) : "—"}
              </Text>
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionLabel}>From</Text>
            <Text style={styles.companyName}>{data.companyName || "Your Company"}</Text>
            <Text style={styles.companyDetail}>{data.companyEmail}</Text>
            <Text style={styles.companyDetail}>{data.companyPhone}</Text>
            <Text style={styles.companyDetail}>
              {formatAddress([data.companyAddress, data.companyCity, data.companyState, data.companyZip, data.companyCountry])}
            </Text>
            {data.taxId && <Text style={styles.companyDetail}>Tax ID: {data.taxId}</Text>}
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionLabel}>Bill To</Text>
            <Text style={styles.companyName}>{data.clientName || "Client Name"}</Text>
            <Text style={styles.companyDetail}>{data.clientEmail}</Text>
            <Text style={styles.companyDetail}>{data.clientPhone}</Text>
            <Text style={styles.companyDetail}>
              {formatAddress([data.clientAddress, data.clientCity, data.clientState, data.clientZip, data.clientCountry])}
            </Text>
          </View>
        </View>

        {/* Table */}
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

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summary}>
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

        {/* Bank Info */}
        {(data.bankName || data.bankAccount) && (
          <View wrap={false} style={styles.footer}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>Payment Information</Text>
              <View style={styles.bankGrid}>
                {data.bankName && (
                  <View style={styles.bankItem}>
                    <Text style={styles.bankLabel}>Bank</Text>
                    <Text style={styles.bankValue}>{data.bankName}</Text>
                  </View>
                )}
                {data.bankAccount && (
                  <View style={styles.bankItem}>
                    <Text style={styles.bankLabel}>Account</Text>
                    <Text style={styles.bankValue}>{data.bankAccount}</Text>
                  </View>
                )}
                {data.bankRouting && (
                  <View style={styles.bankItem}>
                    <Text style={styles.bankLabel}>Routing</Text>
                    <Text style={styles.bankValue}>{data.bankRouting}</Text>
                  </View>
                )}
                {data.bankSwift && (
                  <View style={styles.bankItem}>
                    <Text style={styles.bankLabel}>SWIFT</Text>
                    <Text style={styles.bankValue}>{data.bankSwift}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Notes */}
        {data.notes && (
          <View wrap={false} style={styles.footerSection}>
            <Text style={styles.footerTitle}>Notes</Text>
            <Text style={styles.footerText}>{data.notes}</Text>
          </View>
        )}

        {/* Terms */}
        {data.terms && (
          <View wrap={false} style={styles.footerSection}>
            <Text style={styles.footerTitle}>Terms & Conditions</Text>
            <Text style={styles.footerText}>{data.terms}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClassicInvoiceDocument;
