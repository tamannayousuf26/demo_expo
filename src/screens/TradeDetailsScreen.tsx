import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { theme } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";
import { formatCompactCurrency, formatFiledAt, formatFullCurrency, formatShares } from "../utils/formatters";
import SignalBadge from "../components/SignalBadge";
import MockActivityChart from "../components/MockActivityChart";

type Props = NativeStackScreenProps<RootStackParamList, "TradeDetails">;

const MOCK_ACTIVITY_POINTS = [14, 19, 17, 23, 21, 27, 25];

type DetailRowProps = {
  label: string;
  value: string;
  isDemoValue?: boolean;
  isLast?: boolean;
};

function DetailRow({ label, value, isDemoValue, isLast }: DetailRowProps) {
  return (
    <View style={[styles.detailRow, isLast ? styles.detailRowLast : null]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.detailValueGroup}>
        <Text style={styles.detailValue}>{value}</Text>
        {isDemoValue ? <Text style={styles.demoTag}>Demo value</Text> : null}
      </View>
    </View>
  );
}

export default function TradeDetailsScreen({ route, navigation }: Props) {
  const trade = mockTrades.find((t) => t.id === route.params.tradeId);

  if (!trade) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Text style={styles.notFound}>No trade found for this id.</Text>
      </SafeAreaView>
    );
  }

  const actionWord = trade.type === "purchase" ? "buy" : "sale";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.companyHeader}>
          <View style={styles.companyIdentity}>
            <Text style={styles.ticker}>{trade.ticker}</Text>
            <Text style={styles.company}>{trade.company}</Text>
            <Text style={styles.sector}>{trade.sector}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>FICTIONAL DEMO DATA</Text>
          </View>
        </View>

        <View style={styles.signalCard}>
          <View style={styles.signalTopRow}>
            <Text style={styles.signalName}>{trade.signal}</Text>
            <SignalBadge strength={trade.signalStrength} />
          </View>
          <Text style={styles.signalLine}>
            {formatCompactCurrency(trade.value)} fictional demo insider {actionWord}
          </Text>
        </View>

        <View style={styles.detailGrid}>
          <DetailRow label="Insider" value={`${trade.insider} · ${trade.role}`} />
          <DetailRow
            label="Transaction type"
            value={`${trade.type === "purchase" ? "Purchase" : "Sale"} (${trade.transactionCode})`}
          />
          <DetailRow label="Shares" value={formatShares(trade.shares)} />
          <DetailRow
            label="Price per share"
            value={formatFullCurrency(trade.pricePerShare)}
            isDemoValue
          />
          <DetailRow label="Total value" value={formatFullCurrency(trade.value)} isDemoValue />
          <DetailRow label="Transaction date" value={formatFiledAt(trade.transactionDate)} />
          <DetailRow label="Filed date" value={formatFiledAt(trade.filedAt)} />
          <DetailRow
            label="Signal strength"
            value={`${trade.signalStrength} · ${trade.signal}`}
            isLast
          />
        </View>

        <View style={styles.chartCard}>
          <MockActivityChart points={MOCK_ACTIVITY_POINTS} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  companyHeader: {
    gap: theme.spacing.sm,
  },
  companyIdentity: {
    gap: theme.spacing.xs / 2,
  },
  ticker: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.semibold,
  },
  company: {
    fontSize: theme.fontSize.screenTitle,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeight.semibold,
  },
  sector: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.surfaceRaised,
    borderRadius: theme.radius.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs / 2,
  },
  badgeText: {
    fontSize: theme.fontSize.badge,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.semibold,
  },
  notFound: {
    padding: theme.spacing.lg,
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
  },
  signalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  signalTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  signalName: {
    flex: 1,
    fontSize: theme.fontSize.sectionHeading,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  signalLine: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
  },
  detailGrid: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
  },
  detailValueGroup: {
    alignItems: "flex-end",
  },
  detailValue: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    textAlign: "right",
  },
  demoTag: {
    fontSize: theme.fontSize.badge,
    color: theme.colors.textMuted,
  },
  chartCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    alignItems: "center",
  },
});
