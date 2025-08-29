import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/store/invoice-store";
interface Props {
  data: InvoiceData;
  previewMode?: boolean;
}
const ElegantInvoiceDocument = ({ data, previewMode = false }: Props) => {
  // Register elegant fonts only when rendering the PDF (not in previewMode)
  if (!previewMode) {
    Font.register({
      family: "Playfair Display",
      fonts: [
        { src: "/fonts/playfair/PlayfairDisplay-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/playfair/PlayfairDisplay-Medium.ttf", fontWeight: 500 },
        {
          src: "/fonts/playfair/PlayfairDisplay-SemiBold.ttf",
          fontWeight: 600,
        },
        { src: "/fonts/playfair/PlayfairDisplay-Bold.ttf", fontWeight: 700 },
      ],
    });
    Font.register({
      family: "Lato",
      fonts: [
        { src: "/fonts/lato/Lato-Thin.ttf", fontWeight: 100 },
        { src: "/fonts/lato/Lato-Light.ttf", fontWeight: 300 },
        { src: "/fonts/lato/Lato-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/lato/Lato-Bold.ttf", fontWeight: 500 }, // Using Bold for medium weight
        { src: "/fonts/lato/Lato-Bold.ttf", fontWeight: 600 }, // Using Bold for semibold weight  
        { src: "/fonts/lato/Lato-Bold.ttf", fontWeight: 700 },
      ],
    });
  }
  const fontSizeConfig = {
    small: {
      base: 9,
      title: 22,
      invoiceNumber: 11,
      dateInfo: 9,
      sectionTitle: 11,
      companyName: 10,
      companyDetail: 9,
      table: 9,
      notesTitle: 9,
      notesText: 9,
      total: 12,
    },
    medium: {
      base: 10,
      title: 26,
      invoiceNumber: 13,
      dateInfo: 10,
      sectionTitle: 13,
      companyName: 12,
      companyDetail: 10,
      table: 10,
      notesTitle: 10,
      notesText: 10,
      total: 14,
    },
    large: {
      base: 11,
      title: 30,
      invoiceNumber: 15,
      dateInfo: 11,
      sectionTitle: 15,
      companyName: 13,
      companyDetail: 11,
      table: 11,
      notesTitle: 11,
      notesText: 11,
      total: 16,
    },
  };
  const fontSize = fontSizeConfig["medium"];
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Lato",
      fontSize: fontSize.base,
      paddingTop: 40,
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 50,
      backgroundColor: "#FDFBF7", // Creamy off-white background
      color: "#333333",
      position: "relative",
    },
    decorativeBorder: {
      position: "absolute",
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      borderWidth: 1,
      borderColor: "#D4AF37", // Gold border
      borderRadius: 2,
      zIndex: -1,
    },
    header: {
      flexDirection: "row",
      marginBottom: 30,
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#D4AF37",
      paddingBottom: 20,
    },
    titleContainer: {
      alignItems: "flex-start",
    },
    title: {
      fontFamily: "Playfair Display",
      fontSize: fontSize.title,
      fontWeight: 700,
      color: "#1A2B4A", // Deep navy blue
      letterSpacing: 2,
    },
    invoiceNumberContainer: {
      alignItems: "flex-end",
    },
    invoiceLabel: {
      fontFamily: "Playfair Display",
      fontSize: 11,
      fontWeight: 400,
      color: "#666666",
      letterSpacing: 1,
      marginBottom: 3,
    },
    invoiceNumber: {
      fontFamily: "Playfair Display",
      fontSize: fontSize.invoiceNumber,
      fontWeight: 600,
      color: "#1A2B4A",
    },
    addressSection: {
      flexDirection: "row",
      marginBottom: 30,
      justifyContent: "space-between",
    },
    addressBlock: {
      width: "48%",
    },
    sectionTitle: {
      fontFamily: "Playfair Display",
      fontSize: fontSize.sectionTitle,
      fontWeight: 600,
      marginBottom: 10,
      color: "#1A2B4A",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    companyName: {
      fontSize: fontSize.companyName,
      fontWeight: 600,
      color: "#333333",
      marginBottom: 4,
    },
    companyDetail: {
      fontSize: fontSize.companyDetail,
      color: "#555555",
      marginBottom: 2,
    },
    dateSection: {
      flexDirection: "row",
      marginBottom: 25,
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#E6E6E6",
    },
    dateBlock: {
      width: "48%",
    },
    dateLabel: {
      fontSize: fontSize.dateInfo,
      fontWeight: 500,
      color: "#666666",
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    dateValue: {
      fontSize: fontSize.dateInfo,
      color: "#333333",
      fontWeight: 500,
    },
    table: {
      marginBottom: 25,
      borderWidth: 1,
      borderColor: "#E6E6E6",
      borderRadius: 2,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#F0F0F0",
      borderBottomWidth: 1,
      borderBottomColor: "#D4AF37",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#E6E6E6",
    },
    tableCell: {
      padding: 12,
      fontSize: fontSize.table,
      color: "#333333",
    },
    tableCellHeader: {
      fontFamily: "Playfair Display",
      fontWeight: 600,
      color: "#1A2B4A",
    },
    descriptionCell: {
      width: "45%",
      borderRightWidth: 1,
      borderRightColor: "#E6E6E6",
    },
    quantityCell: {
      width: "15%",
      borderRightWidth: 1,
      borderRightColor: "#E6E6E6",
      textAlign: "center",
    },
    priceCell: {
      width: "20%",
      borderRightWidth: 1,
      borderRightColor: "#E6E6E6",
      textAlign: "center",
    },
    totalCell: {
      width: "20%",
      textAlign: "right",
    },
    summary: {
      alignSelf: "flex-end",
      width: "40%",
      marginBottom: 30,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: "#D4AF37",
    },
    summaryRow: {
      flexDirection: "row",
      marginBottom: 8,
    },
    summaryLabel: {
      width: "60%",
      textAlign: "right",
      paddingRight: 15,
      color: "#555555",
    },
    summaryValue: {
      width: "40%",
      textAlign: "right",
      fontWeight: 500,
      color: "#333333",
    },
    totalRow: {
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: "#E6E6E6",
    },
    totalValue: {
      fontFamily: "Playfair Display",
      fontSize: fontSize.total,
      color: "#1A2B4A",
      fontWeight: 700,
    },
    paymentInfo: {
      marginTop: 20,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: "#E6E6E6",
    },
    paymentTitle: {
      fontFamily: "Playfair Display",
      fontWeight: 600,
      fontSize: fontSize.sectionTitle,
      marginBottom: 10,
      color: "#1A2B4A",
    },
    paymentDetail: {
      fontSize: fontSize.companyDetail,
      color: "#555555",
      marginBottom: 3,
    },
    notes: {
      marginTop: 20,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: "#E6E6E6",
    },
    notesTitle: {
      fontFamily: "Playfair Display",
      fontWeight: 600,
      fontSize: fontSize.notesTitle,
      marginBottom: 8,
      color: "#1A2B4A",
    },
    notesText: {
      fontSize: fontSize.notesText,
      color: "#555555",
      lineHeight: 1.6,
    },
    footer: {
      marginTop: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: "#E6E6E6",
    },
    signatureBlock: {
      width: "45%",
    },
    signatureTitle: {
      fontSize: fontSize.dateInfo,
      fontWeight: 500,
      color: "#666666",
      marginBottom: 5,
    },
    signatureLine: {
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: "#D4AF37",
      marginBottom: 5,
    },
    signatureName: {
      fontSize: fontSize.companyName,
      fontWeight: 600,
      color: "#333333",
    },
    thankYou: {
      fontFamily: "Playfair Display",
      fontSize: 14,
      fontWeight: 600,
      color: "#1A2B4A",
      // Removed fontStyle: 'italic'
    },
  });
  const currencySymbol =
    {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
      INR: "₹",
      BDT: "৳",
      PKR: "₨",
      CNY: "¥",
      SGD: "S$",
      MYR: "RM",
      THB: "฿",
      IDR: "Rp",
      PHP: "₱",
      VND: "₫",
      KRW: "₩",
      AED: "د.إ",
      SAR: "﷼",
      QAR: "ر.ق",
      KWD: "د.ك",
      BHD: "ب.د",
      OMR: "ر.ع.",
      TRY: "₺",
      RUB: "₽",
      BRL: "R$",
      MXN: "$",
      ARS: "$",
      CLP: "$",
      COP: "$",
      PEN: "S/",
      UYU: "$",
      PYG: "₲",
      BOB: "Bs.",
      ZAR: "R",
      NGN: "₦",
      KES: "KSh",
      GHS: "₵",
      EGP: "£",
      MAD: "د.م.",
      TND: "د.ت",
      DZD: "د.ج",
      LBP: "ل.ل",
      JOD: "د.ا",
      ILS: "₪",
      PLN: "zł",
      CZK: "Kč",
      HUF: "Ft",
      RON: "lei",
      BGN: "лв",
      HRK: "kn",
      RSD: "дин.",
      BAM: "KM",
      MKD: "ден.",
      ALL: "L",
      ISK: "kr",
      NOK: "kr",
      SEK: "kr",
      DKK: "kr",
      CHF: "Fr",
    }[data.currency] || "$";
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const formatCompanyAddress = () => {
    const addressParts = [
      data.companyAddress,
      data.companyCity,
      data.companyState,
      data.companyZip,
      data.companyCountry,
    ].filter(Boolean);
    return addressParts.join(", ");
  };
  const formatClientAddress = () => {
    const addressParts = [
      data.clientAddress,
      data.clientCity,
      data.clientState,
      data.clientZip,
      data.clientCountry,
    ].filter(Boolean);
    return addressParts.join(", ");
  };
  // helper: convert a react-pdf style object into HTML inline style
  const toCss = (style: any = {}) => {
    const s: Record<string, any> = { ...style };
    if (typeof s.fontWeight === "string") {
      if (s.fontWeight.toLowerCase() === "semibold") s.fontWeight = 600;
      if (s.fontWeight.toLowerCase() === "bold") s.fontWeight = 700;
    }
    if (s.borderWidth !== undefined && s.borderColor) {
      s.border = `${s.borderWidth}px solid ${s.borderColor}`;
      delete s.borderWidth;
      delete s.borderColor;
    }
    if (s.borderBottomWidth !== undefined && s.borderBottomColor) {
      s.borderBottom = `${s.borderBottomWidth}px solid ${s.borderBottomColor}`;
      delete s.borderBottomWidth;
      delete s.borderBottomColor;
    }
    if (s.borderTopWidth !== undefined && s.borderTopColor) {
      s.borderTop = `${s.borderTopWidth}px solid ${s.borderTopColor}`;
      delete s.borderTopWidth;
      delete s.borderTopColor;
    }
    if (s.borderRightWidth !== undefined && s.borderRightColor) {
      s.borderRight = `${s.borderRightWidth}px solid ${s.borderRightColor}`;
      delete s.borderRightWidth;
      delete s.borderRightColor;
    }
    if (s.borderLeftWidth !== undefined && s.borderLeftColor) {
      s.borderLeft = `${s.borderLeftWidth}px solid ${s.borderLeftColor}`;
      delete s.borderLeftWidth;
      delete s.borderLeftColor;
    }
    // convert padding props
    if (
      s.paddingTop !== undefined ||
      s.paddingBottom !== undefined ||
      s.paddingLeft !== undefined ||
      s.paddingRight !== undefined
    ) {
      s.padding = `${s.paddingTop || 0}px ${s.paddingRight || 0}px ${
        s.paddingBottom || 0
      }px ${s.paddingLeft || 0}px`;
      delete s.paddingTop;
      delete s.paddingBottom;
      delete s.paddingLeft;
      delete s.paddingRight;
    }
    // keep flex-related props but ensure display is set for containers
    if (s.flexDirection) {
      s.display = "flex";
      s.flexDirection = s.flexDirection === "row" ? "row" : "column";
    }
    return s;
  };
  if (previewMode) {
    // HTML preview path — use the same style values converted to inline CSS
    return (
      <div style={toCss(styles.page)}>
        {/* Decorative Border */}
        <div style={toCss(styles.decorativeBorder)}></div>
        {/* Header */}
        <div style={toCss(styles.header)}>
          <div style={toCss(styles.titleContainer)}>
            <div style={toCss(styles.title)}>INVOICE</div>
          </div>
          <div style={toCss(styles.invoiceNumberContainer)}>
            <div style={toCss(styles.invoiceLabel)}>Invoice No.</div>
            <div style={toCss(styles.invoiceNumber)}>#{data.invoiceNumber}</div>
          </div>
        </div>
        {/* Address Section */}
        <div style={toCss(styles.addressSection)}>
          <div style={toCss(styles.addressBlock)}>
            <div style={toCss(styles.sectionTitle)}>From</div>
            <div style={toCss(styles.companyName)}>
              {data.companyName || "Your Company Name"}
            </div>
            <div style={toCss(styles.companyDetail)}>{data.companyEmail}</div>
            <div style={toCss(styles.companyDetail)}>{data.companyPhone}</div>
            <div style={toCss(styles.companyDetail)}>
              {formatCompanyAddress()}
            </div>
            {data.companyWebsite && (
              <div style={toCss(styles.companyDetail)}>
                {data.companyWebsite}
              </div>
            )}
            {data.taxId && (
              <div style={toCss(styles.companyDetail)}>
                Tax ID: {data.taxId}
              </div>
            )}
          </div>
          <div style={toCss(styles.addressBlock)}>
            <div style={toCss(styles.sectionTitle)}>To</div>
            <div style={toCss(styles.companyName)}>
              {data.clientName || "Client Name"}
            </div>
            <div style={toCss(styles.companyDetail)}>{data.clientEmail}</div>
            <div style={toCss(styles.companyDetail)}>{data.clientPhone}</div>
            <div style={toCss(styles.companyDetail)}>
              {formatClientAddress()}
            </div>
          </div>
        </div>
        {/* Date Section */}
        <div style={toCss(styles.dateSection)}>
          <div style={toCss(styles.dateBlock)}>
            <div style={toCss(styles.dateLabel)}>Issue Date</div>
            <div style={toCss(styles.dateValue)}>
              {data.invoiceDate ? formatDate(data.invoiceDate) : "—"}
            </div>
          </div>
          <div style={toCss(styles.dateBlock)}>
            <div style={toCss(styles.dateLabel)}>Due Date</div>
            <div style={toCss(styles.dateValue)}>
              {data.dueDate ? formatDate(data.dueDate) : "—"}
            </div>
          </div>
        </div>
        {/* Items Table */}
        <div style={toCss(styles.table)}>
          {/* Table Header */}
          <div style={toCss(styles.tableHeader)}>
            <div
              style={{
                ...toCss(styles.tableCell),
                ...toCss(styles.tableCellHeader),
                ...toCss(styles.descriptionCell),
              }}
            >
              Description
            </div>
            <div
              style={{
                ...toCss(styles.tableCell),
                ...toCss(styles.tableCellHeader),
                ...toCss(styles.quantityCell),
              }}
            >
              Qty
            </div>
            <div
              style={{
                ...toCss(styles.tableCell),
                ...toCss(styles.tableCellHeader),
                ...toCss(styles.priceCell),
              }}
            >
              Price
            </div>
            <div
              style={{
                ...toCss(styles.tableCell),
                ...toCss(styles.tableCellHeader),
                ...toCss(styles.totalCell),
              }}
            >
              Total
            </div>
          </div>
          {/* Table Rows */}
          {data.items.map((item) => (
            <div key={item.id} style={toCss(styles.tableRow)}>
              <div
                style={{
                  ...toCss(styles.tableCell),
                  ...toCss(styles.descriptionCell),
                }}
              >
                {item.description || "Item description"}
              </div>
              <div
                style={{
                  ...toCss(styles.tableCell),
                  ...toCss(styles.quantityCell),
                }}
              >
                {item.quantity}
              </div>
              <div
                style={{
                  ...toCss(styles.tableCell),
                  ...toCss(styles.priceCell),
                }}
              >
                {currencySymbol} {item.unitPrice.toFixed(2)}
              </div>
              <div
                style={{
                  ...toCss(styles.tableCell),
                  ...toCss(styles.totalCell),
                }}
              >
                {currencySymbol} {item.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div style={toCss(styles.summary)}>
          <div style={toCss(styles.summaryRow)}>
            <div style={toCss(styles.summaryLabel)}>Subtotal:</div>
            <div style={toCss(styles.summaryValue)}>
              {currencySymbol} {data.subtotal.toFixed(2)}
            </div>
          </div>
          {data.taxRate > 0 && (
            <div style={toCss(styles.summaryRow)}>
              <div style={toCss(styles.summaryLabel)}>
                Tax ({data.taxRate}%):
              </div>
              <div style={toCss(styles.summaryValue)}>
                {currencySymbol} {data.taxAmount.toFixed(2)}
              </div>
            </div>
          )}
          {data.discountAmount > 0 && (
            <div style={toCss(styles.summaryRow)}>
              <div style={toCss(styles.summaryLabel)}>Discount:</div>
              <div style={toCss(styles.summaryValue)}>
                {currencySymbol} {data.discountAmount.toFixed(2)}
              </div>
            </div>
          )}
          <div
            style={{ ...toCss(styles.summaryRow), ...toCss(styles.totalRow) }}
          >
            <div style={toCss(styles.summaryLabel)}>Total:</div>
            <div
              style={{
                ...toCss(styles.summaryValue),
                ...toCss(styles.totalValue),
              }}
            >
              {currencySymbol} {data.total.toFixed(2)}
            </div>
          </div>
        </div>
        {/* Payment Information */}
        {(data.bankName || data.bankAccount) && (
          <div style={toCss(styles.paymentInfo)}>
            <div style={toCss(styles.paymentTitle)}>Payment Details</div>
            {data.bankAccount && (
              <div style={toCss(styles.paymentDetail)}>
                Account: {data.bankAccount}
              </div>
            )}
            {data.bankName && (
              <div style={toCss(styles.paymentDetail)}>
                Bank: {data.bankName}
              </div>
            )}
            {data.bankBranch && (
              <div style={toCss(styles.paymentDetail)}>
                Branch: {data.bankBranch}
              </div>
            )}
            {data.bankRouting && (
              <div style={toCss(styles.paymentDetail)}>
                Routing: {data.bankRouting}
              </div>
            )}
            {data.bankSwift && (
              <div style={toCss(styles.paymentDetail)}>
                SWIFT: {data.bankSwift}
              </div>
            )}
          </div>
        )}
        {/* Notes */}
        {data.notes && (
          <div style={toCss(styles.notes)}>
            <div style={toCss(styles.notesTitle)}>Notes</div>
            <div style={toCss(styles.notesText)}>{data.notes}</div>
          </div>
        )}
        {/* Terms */}
        {data.terms && (
          <div style={toCss(styles.notes)}>
            <div style={toCss(styles.notesTitle)}>Terms & Conditions</div>
            <div style={toCss(styles.notesText)}>{data.terms}</div>
          </div>
        )}
        {/* Footer */}
        <div style={toCss(styles.footer)}>
          <div style={toCss(styles.signatureBlock)}>
            <div style={toCss(styles.signatureTitle)}>Authorized Signature</div>
            <div style={toCss(styles.signatureLine)}></div>
            <div style={toCss(styles.signatureName)}>
              {data.companyName || "Your Company Name"}
            </div>
          </div>
          <div style={toCss(styles.thankYou)}>Thank you for your business</div>
        </div>
      </div>
    );
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Decorative Border */}
        <View style={styles.decorativeBorder} />
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>INVOICE</Text>
          </View>
          <View style={styles.invoiceNumberContainer}>
            <Text style={styles.invoiceLabel}>Invoice No.</Text>
            <Text style={styles.invoiceNumber}>#{data.invoiceNumber}</Text>
          </View>
        </View>
        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionTitle}>From</Text>
            <Text style={styles.companyName}>
              {data.companyName || "Your Company Name"}
            </Text>
            <Text style={styles.companyDetail}>{data.companyEmail}</Text>
            <Text style={styles.companyDetail}>{data.companyPhone}</Text>
            <Text style={styles.companyDetail}>{formatCompanyAddress()}</Text>
            {data.companyWebsite && (
              <Text style={styles.companyDetail}>{data.companyWebsite}</Text>
            )}
            {data.taxId && (
              <Text style={styles.companyDetail}>Tax ID: {data.taxId}</Text>
            )}
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionTitle}>To</Text>
            <Text style={styles.companyName}>
              {data.clientName || "Client Name"}
            </Text>
            <Text style={styles.companyDetail}>{data.clientEmail}</Text>
            <Text style={styles.companyDetail}>{data.clientPhone}</Text>
            <Text style={styles.companyDetail}>{formatClientAddress()}</Text>
          </View>
        </View>
        {/* Date Section */}
        <View style={styles.dateSection}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Issue Date</Text>
            <Text style={styles.dateValue}>
              {data.invoiceDate ? formatDate(data.invoiceDate) : "—"}
            </Text>
          </View>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Due Date</Text>
            <Text style={styles.dateValue}>
              {data.dueDate ? formatDate(data.dueDate) : "—"}
            </Text>
          </View>
        </View>
        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                styles.descriptionCell,
              ]}
            >
              Description
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                styles.quantityCell,
              ]}
            >
              Qty
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                styles.priceCell,
              ]}
            >
              Price
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                styles.totalCell,
              ]}
            >
              Total
            </Text>
          </View>
          {/* Table Rows */}
          {data.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.descriptionCell]}>
                {item.description || "Item description"}
              </Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.priceCell]}>
                {currencySymbol} {item.unitPrice.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, styles.totalCell]}>
                {currencySymbol} {item.total.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>
              {currencySymbol} {data.subtotal.toFixed(2)}
            </Text>
          </View>
          {data.taxRate > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax ({data.taxRate}%):</Text>
              <Text style={styles.summaryValue}>
                {currencySymbol} {data.taxAmount.toFixed(2)}
              </Text>
            </View>
          )}
          {data.discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount:</Text>
              <Text style={styles.summaryValue}>
                {currencySymbol} {data.discountAmount.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              {currencySymbol} {data.total.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Payment Information */}
        {(data.bankName || data.bankAccount) && (
          <View wrap={false} style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Payment Details</Text>
            {data.bankAccount && (
              <Text style={styles.paymentDetail}>
                Account: {data.bankAccount}
              </Text>
            )}
            {data.bankName && (
              <Text style={styles.paymentDetail}>Bank: {data.bankName}</Text>
            )}
            {data.bankBranch && (
              <Text style={styles.paymentDetail}>
                Branch: {data.bankBranch}
              </Text>
            )}
            {data.bankRouting && (
              <Text style={styles.paymentDetail}>
                Routing: {data.bankRouting}
              </Text>
            )}
            {data.bankSwift && (
              <Text style={styles.paymentDetail}>SWIFT: {data.bankSwift}</Text>
            )}
          </View>
        )}
        {/* Notes */}
        {data.notes && (
          <View wrap={false} style={styles.notes}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
          </View>
        )}
        {/* Terms */}
        {data.terms && (
          <View wrap={false} style={styles.notes}>
            <Text style={styles.notesTitle}>Terms & Conditions</Text>
            <Text style={styles.notesText}>{data.terms}</Text>
          </View>
        )}
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureTitle}>Authorized Signature</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {data.companyName || "Your Company Name"}
            </Text>
          </View>
          <Text style={styles.thankYou}>Thank you for your business</Text>
        </View>
      </Page>
    </Document>
  );
};
export default ElegantInvoiceDocument;
