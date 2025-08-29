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

const PlayfulTemplate = ({ data, previewMode = false }: Props) => {
  // Register playful fonts only when rendering the PDF (not in previewMode)
  if (!previewMode) {
    Font.register({
      family: "Fredoka",
      src: "/fonts/fredoka/Fredoka-Regular.ttf",
    });

    Font.register({
      family: "Nunito",
      fonts: [
        { src: "/fonts/nunito/Nunito-Light.ttf", fontWeight: 300 },
        { src: "/fonts/nunito/Nunito-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/nunito/Nunito-SemiBold.ttf", fontWeight: 600 },
        { src: "/fonts/nunito/Nunito-Bold.ttf", fontWeight: 700 },
      ],
    });
  }

  const fontSizeConfig = {
    small: {
      base: 11,
      title: 28,
      invoiceNumber: 14,
      dateInfo: 11,
      sectionTitle: 16,
      companyName: 13,
      companyDetail: 11,
      table: 11,
      notesTitle: 12,
      notesText: 11,
      total: 16,
    },
    medium: {
      base: 13,
      title: 34,
      invoiceNumber: 16,
      dateInfo: 13,
      sectionTitle: 18,
      companyName: 15,
      companyDetail: 13,
      table: 13,
      notesTitle: 14,
      notesText: 13,
      total: 18,
    },
    large: {
      base: 15,
      title: 40,
      invoiceNumber: 18,
      dateInfo: 15,
      sectionTitle: 20,
      companyName: 17,
      companyDetail: 15,
      table: 15,
      notesTitle: 16,
      notesText: 15,
      total: 20,
    },
  };

  const fontSize = fontSizeConfig["medium"];
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Nunito",
      fontSize: fontSize.base,
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 30,
      backgroundColor: "#FFF9F2", // Light cream background
      position: "relative",
    },
    decorativeCircle: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#FFD6E0", // Light pink
      top: -50,
      right: -50,
      opacity: 0.6,
      zIndex: -1,
    },
    decorativeCircle2: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#C7F9CC", // Light green
      bottom: 70,
      left: -50,
      opacity: 0.6,
      zIndex: -1,
    },
    decorativeCircle3: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#FFD166", // Light yellow
      top: 200,
      left: 40,
      opacity: 0.5,
      zIndex: -1,
    },
    decorativeTriangle: {
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "60px solid transparent",
      borderRight: "60px solid transparent",
      borderBottom: "100px solid #A0D2FF", // Light blue
      top: 400,
      right: 60,
      opacity: 0.5,
      zIndex: -1,
      transform: "rotate(30deg)",
    },
    header: {
      flexDirection: "row",
      marginBottom: 30,
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#FF6B6B", // Coral
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    titleIconText: {
      fontFamily: "Fredoka",
      fontSize: 32,
      color: "#FFFFFF",
    },
    title: {
      fontFamily: "Fredoka",
      fontSize: fontSize.title,
      color: "#FF6B6B", // Coral
      letterSpacing: 1.5,
    },
    invoiceNumberContainer: {
      backgroundColor: "#4ECDC4", // Turquoise
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    invoiceLabel: {
      fontSize: 11,
      color: "#FFFFFF",
      marginBottom: 3,
    },
    invoiceNumber: {
      fontFamily: "Fredoka",
      fontSize: fontSize.invoiceNumber,
      color: "#FFFFFF",
    },
    addressSection: {
      flexDirection: "row",
      marginBottom: 25,
      justifyContent: "space-between",
    },
    addressBlock: {
      width: "48%",
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      padding: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    sectionTitle: {
      fontFamily: "Fredoka",
      fontSize: fontSize.sectionTitle,
      marginBottom: 12,
      color: "#FF9F1C", // Orange
    },
    companyName: {
      fontSize: fontSize.companyName,
      fontWeight: 700,
      color: "#333333",
      marginBottom: 5,
    },
    companyDetail: {
      fontSize: fontSize.companyDetail,
      color: "#666666",
      marginBottom: 3,
    },
    dateSection: {
      flexDirection: "row",
      marginBottom: 25,
      justifyContent: "space-between",
    },
    dateBlock: {
      width: "48%",
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      padding: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    dateLabel: {
      fontSize: fontSize.dateInfo,
      fontWeight: 700,
      color: "#4ECDC4", // Turquoise
      marginBottom: 8,
    },
    dateValue: {
      fontSize: fontSize.dateInfo,
      color: "#333333",
    },
    table: {
      marginBottom: 25,
      borderRadius: 15,
      overflow: "hidden",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#FF9F1C", // Orange
    },
    tableRow: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    tableCell: {
      padding: 15,
      fontSize: fontSize.table,
      color: "#333333",
    },
    tableCellHeader: {
      fontFamily: "Fredoka",
      color: "#FFFFFF",
    },
    descriptionCell: {
      width: "45%",
      borderRightWidth: 1,
      borderRightColor: "#F0F0F0",
    },
    quantityCell: {
      width: "15%",
      borderRightWidth: 1,
      borderRightColor: "#F0F0F0",
      textAlign: "center",
    },
    priceCell: {
      width: "20%",
      borderRightWidth: 1,
      borderRightColor: "#F0F0F0",
      textAlign: "center",
    },
    totalCell: {
      width: "20%",
      textAlign: "right",
    },
    summary: {
      alignSelf: "flex-end",
      width: "45%",
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      padding: 20,
      marginBottom: 25,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    summaryRow: {
      flexDirection: "row",
      marginBottom: 10,
    },
    summaryLabel: {
      width: "60%",
      textAlign: "right",
      paddingRight: 15,
      color: "#666666",
    },
    summaryValue: {
      width: "40%",
      textAlign: "right",
      fontWeight: 700,
      color: "#333333",
    },
    totalRow: {
      marginTop: 10,
      paddingTop: 12,
      borderTopWidth: 3,
      borderTopColor: "#FFD6E0", // Light pink
    },
    totalValue: {
      fontFamily: "Fredoka",
      fontSize: fontSize.total,
      color: "#FF6B6B", // Coral
    },
    paymentInfo: {
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      padding: 20,
      marginBottom: 25,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    paymentTitle: {
      fontFamily: "Fredoka",
      fontSize: fontSize.sectionTitle,
      marginBottom: 12,
      color: "#4ECDC4", // Turquoise
    },
    paymentDetail: {
      fontSize: fontSize.companyDetail,
      color: "#666666",
      marginBottom: 4,
    },
    notes: {
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      padding: 20,
      marginBottom: 25,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    notesTitle: {
      fontFamily: "Fredoka",
      fontSize: fontSize.notesTitle,
      marginBottom: 10,
      color: "#FF9F1C", // Orange
    },
    notesText: {
      fontSize: fontSize.notesText,
      color: "#666666",
      lineHeight: 1.6,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 20,
      borderTopWidth: 3,
      borderTopColor: "#FFD6E0", // Light pink
    },
    thankYou: {
      fontFamily: "Fredoka",
      fontSize: 18,
      color: "#FF6B6B", // Coral
    },
    contactInfo: {
      fontSize: 11,
      color: "#666666",
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
        {/* Decorative Elements */}
        <div style={toCss(styles.decorativeCircle)}></div>
        <div style={toCss(styles.decorativeCircle2)}></div>
        <div style={toCss(styles.decorativeCircle3)}></div>
        <div style={toCss(styles.decorativeTriangle)}></div>

        {/* Header */}
        <div style={toCss(styles.header)}>
          <div style={toCss(styles.title)}>INVOICE</div>
          <div style={toCss(styles.invoiceNumberContainer)}>
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
          <div style={toCss(styles.thankYou)}>Thanks for your support! 🎉</div>
          <div style={toCss(styles.contactInfo)}>
            {data.companyEmail} | {data.companyPhone}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Decorative Elements */}
        <View style={styles.decorativeCircle} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
        <View style={styles.decorativeTriangle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.invoiceNumberContainer}>
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
          <Text style={styles.thankYou}>Thanks for your support! 🎉</Text>
          <Text style={styles.contactInfo}>
            {data.companyEmail} | {data.companyPhone}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PlayfulTemplate;
