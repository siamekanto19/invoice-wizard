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

const InvoiceDocument = ({ data, previewMode = false }: Props) => {
  // register fonts only when rendering the PDF (not in previewMode)
  if (!previewMode) {
    Font.register({
      family: "Outfit",
      fonts: [
        { src: "/fonts/outfit/Outfit-Thin.ttf", fontWeight: 100 },
        { src: "/fonts/outfit/Outfit-ExtraLight.ttf", fontWeight: 200 },
        { src: "/fonts/outfit/Outfit-Light.ttf", fontWeight: 300 },
        { src: "/fonts/outfit/Outfit-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/outfit/Outfit-Medium.ttf", fontWeight: 500 },
        { src: "/fonts/outfit/Outfit-SemiBold.ttf", fontWeight: 600 },
        { src: "/fonts/outfit/Outfit-Bold.ttf", fontWeight: 700 },
        { src: "/fonts/outfit/Outfit-ExtraBold.ttf", fontWeight: 800 },
        { src: "/fonts/outfit/Outfit-Black.ttf", fontWeight: 900 },
      ],
    });
  }
  const fontSizeConfig = {
    small: {
      base: 10,
      title: 24,
      invoiceNumber: 12,
      dateInfo: 10,
      sectionTitle: 12,
      companyName: 11,
      companyDetail: 10,
      table: 10,
      notesTitle: 10,
      notesText: 10,
      total: 12,
    },
    medium: {
      base: 12,
      title: 28,
      invoiceNumber: 14,
      dateInfo: 12,
      sectionTitle: 14,
      companyName: 13,
      companyDetail: 12,
      table: 12,
      notesTitle: 12,
      notesText: 12,
      total: 14,
    },
    large: {
      base: 14,
      title: 32,
      invoiceNumber: 16,
      dateInfo: 14,
      sectionTitle: 16,
      companyName: 15,
      companyDetail: 14,
      table: 14,
      notesTitle: 14,
      notesText: 14,
      total: 16,
    },
  };

  const fontSize = fontSizeConfig["medium"];

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Outfit",
      fontSize: fontSize.base,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      backgroundColor: "#FFFFFF",
    },
    header: {
      flexDirection: "row",
      marginBottom: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "#000000",
      paddingBottom: 15,
    },
    title: {
      fontSize: fontSize.title,
      fontWeight: "bold",
      color: "#000000",
    },
    invoiceNumber: {
      fontSize: fontSize.invoiceNumber,
      color: "#000000",
      fontWeight: "bold",
    },
    addressSection: {
      flexDirection: "row",
      marginBottom: 20,
      justifyContent: "space-between",
    },
    addressBlock: {
      width: "48%",
    },
    sectionTitle: {
      fontSize: fontSize.sectionTitle,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#000000",
      textTransform: "uppercase",
    },
    companyName: {
      fontSize: fontSize.companyName,
      fontWeight: "bold",
      color: "#000000",
      marginBottom: 3,
    },
    companyDetail: {
      fontSize: fontSize.companyDetail,
      color: "#333333",
      marginBottom: 2,
    },
    dateSection: {
      flexDirection: "row",
      marginBottom: 18,
      justifyContent: "space-between",
      paddingTop: 8,
      paddingBottom: 8,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#CCCCCC",
    },
    dateBlock: {
      width: "48%",
    },
    dateLabel: {
      fontSize: fontSize.dateInfo,
      fontWeight: "bold",
      color: "#666666",
      marginBottom: 3,
      textTransform: "uppercase",
    },
    dateValue: {
      fontSize: fontSize.dateInfo,
      color: "#000000",
    },
    table: {
      borderWidth: 1,
      borderColor: "#000000",
      marginBottom: 20,
      borderBottomWidth: 0,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#F5F5F5",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
    },
    tableCell: {
      padding: 8,
      fontSize: fontSize.table,
      color: "#000000",
    },
    tableCellHeader: {
      fontWeight: "bold",
      color: "#000000",
    },
    descriptionCell: {
      width: "40%",
      borderRightWidth: 1,
      borderRightColor: "#000000",
    },
    quantityCell: {
      width: "20%",
      borderRightWidth: 1,
      borderRightColor: "#000000",
      textAlign: "center",
    },
    priceCell: {
      width: "20%",
      borderRightWidth: 1,
      borderRightColor: "#000000",
      textAlign: "center",
    },
    totalCell: {
      width: "20%",
      textAlign: "right",
    },
    summary: {
      alignItems: "flex-end",
      marginBottom: 8,
      minWidth: 240,
    },
    summaryLabel: {
      flex: 1,
      textAlign: "right",
      marginRight: 15,
    },
    summaryValue: {
      flex: 1,
      textAlign: "right",
      fontWeight: "bold",
    },
    totalRow: {
      borderTopColor: "#000000",
      borderTopWidth: 2,
      paddingTop: 12,
      marginTop: 12,
    },
    totalValue: {
      fontSize: fontSize.total,
      color: "#000000",
    },
    bankInfo: {
      marginTop: 20,
      paddingTop: 10,
      borderTopColor: "#CCCCCC",
      borderTopWidth: 1,
    },
    bankTitle: {
      fontWeight: "bold",
      fontSize: fontSize.sectionTitle,
      marginBottom: 10,
      color: "#000000",
    },
    bankDetail: {
      fontSize: fontSize.companyDetail,
      color: "#333333",
      marginBottom: 3,
    },
    notes: {
      marginTop: 20,
      paddingTop: 12,
      borderTopColor: "#CCCCCC",
      borderTopWidth: 1,
    },
    notesTitle: {
      fontWeight: "bold",
      fontSize: fontSize.notesTitle,
      marginBottom: 5,
      color: "#000000",
    },
    notesText: {
      fontSize: fontSize.notesText,
      color: "#333333",
      lineHeight: 1.5,
    },
  });

  const currencySymbol =
    {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "CAD ",
      AUD: "A$",
      INR: "₹",
      BDT: "BDT ",
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
        {/* Header */}
        <div style={toCss(styles.header)}>
          <div style={toCss(styles.title)}>INVOICE</div>
          <div style={toCss(styles.invoiceNumber)}>#{data.invoiceNumber}</div>
        </div>

        {/* Address Section */}
        <div style={toCss(styles.addressSection)}>
          <div style={toCss(styles.addressBlock)}>
            <div style={toCss(styles.sectionTitle)}>Bill From</div>
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
            <div style={toCss(styles.sectionTitle)}>Bill To</div>
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
              Rate
            </div>
            <div
              style={{
                ...toCss(styles.tableCell),
                ...toCss(styles.tableCellHeader),
                ...toCss(styles.totalCell),
              }}
            >
              Amount
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
        <div
          style={{
            width: 140,
            marginLeft: "auto",
            paddingTop: 10,
            paddingBottom: 10,
            display: "flex",
            justifyContent: "flex-end",
            border: "1px solid #000",
            backgroundColor: "#F5F5F5",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <div>
            <div style={{ fontSize: fontSize.total, fontWeight: "bold" }}>
              TOTAL AMOUNT
            </div>
            <div style={{ paddingTop: 6, fontWeight: 600, fontSize: 18 }}>
              {currencySymbol} {data.total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Bank Information */}
        {(data.bankName || data.bankAccount) && (
          <div style={toCss(styles.bankInfo)}>
            <div style={toCss(styles.bankTitle)}>Bank Information</div>
            {data.bankAccount && (
              <div style={toCss(styles.bankDetail)}>
                Account Number : {data.bankAccount}
              </div>
            )}
            {data.bankName && (
              <div style={toCss(styles.bankDetail)}>
                Bank Name : {data.bankName}
              </div>
            )}
            {data.bankBranch && (
              <div style={toCss(styles.bankDetail)}>
                Branch Name : {data.bankBranch}
              </div>
            )}
            {data.bankRouting && (
              <div style={toCss(styles.bankDetail)}>
                Routing Number : {data.bankRouting}
              </div>
            )}
            {data.bankSwift && (
              <div style={toCss(styles.bankDetail)}>
                SWIFT Code : {data.bankSwift}
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div style={toCss(styles.notes)}>
            <div style={toCss(styles.notesTitle)}>Notes:</div>
            <div style={toCss(styles.notesText)}>{data.notes}</div>
          </div>
        )}

        {/* Terms */}
        {data.terms && (
          <div style={toCss(styles.notes)}>
            <div style={toCss(styles.notesTitle)}>Terms & Conditions:</div>
            <div style={toCss(styles.notesText)}>{data.terms}</div>
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
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.invoiceNumber}>#{data.invoiceNumber}</Text>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionTitle}>Bill From</Text>
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
            <Text style={styles.sectionTitle}>Bill To</Text>
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
              Rate
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                styles.totalCell,
              ]}
            >
              Amount
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
        <View
          style={{
            width: 180,
            marginLeft: "auto",
            paddingTop: 10,
            paddingBottom: 10,
            display: "flex",
            justifyContent: "flex-end",
            borderWidth: 1,
            borderColor: "#000000",
            backgroundColor: "#F5F5F5",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View>
            <Text
              style={[
                {
                  fontSize: fontSize.total,
                  fontWeight: "bold",
                },
              ]}
            >
              TOTAL AMOUNT
            </Text>
            <Text
              style={{
                paddingTop: 6,
                fontWeight: "semibold",
                fontSize: 18,
              }}
            >
              {currencySymbol} {data.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Bank Information */}
        {(data.bankName || data.bankAccount) && (
          <View wrap={false} style={styles.bankInfo}>
            <Text style={styles.bankTitle}>Bank Information</Text>
            {data.bankAccount && (
              <Text style={styles.bankDetail}>
                Account Number : {data.bankAccount}
              </Text>
            )}
            {data.bankName && (
              <Text style={styles.bankDetail}>Bank Name : {data.bankName}</Text>
            )}
            {data.bankBranch && (
              <Text style={styles.bankDetail}>
                Branch Name : {data.bankBranch}
              </Text>
            )}
            {data.bankRouting && (
              <Text style={styles.bankDetail}>
                Routing Number : {data.bankRouting}
              </Text>
            )}
            {data.bankSwift && (
              <Text style={styles.bankDetail}>
                SWIFT Code : {data.bankSwift}
              </Text>
            )}
          </View>
        )}

        {/* Notes */}
        {data.notes && (
          <View wrap={false} style={styles.notes}>
            <Text style={styles.notesTitle}>Notes:</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
          </View>
        )}

        {/* Terms */}
        {data.terms && (
          <View wrap={false} style={styles.notes}>
            <Text style={styles.notesTitle}>Terms & Conditions:</Text>
            <Text style={styles.notesText}>{data.terms}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
