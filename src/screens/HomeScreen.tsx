import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { theme } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";
import { formatCompactCurrency } from "../utils/formatters";
import SummaryCard from "../components/SummaryCard";
import SignalBadge from "../components/SignalBadge";
import TradeCard from "../components/TradeCard";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type Summary = {
  count: number;
  purchaseTotal: number;
  saleTotal: number;
};

export default function HomeScreen({ navigation }: Props) {
  const summary = useMemo<Summary>(
    () =>
      mockTrades.reduce(
        (acc, trade) => {
          acc.count += 1;
          if (trade.type === "purchase") {
            acc.purchaseTotal += trade.value;
          } else {
            acc.saleTotal += trade.value;
          }
          return acc;
        },
        { count: 0, purchaseTotal: 0, saleTotal: 0 }
      ),
    []
  );

  const topSignals = useMemo(
    () =>
      mockTrades
        .filter((trade) => trade.signalStrength === "High")
        .sort((a, b) => b.value - a.value)
        .slice(0, 3),
    []
  );

  const latestActivity = useMemo(
    () =>
      [...mockTrades]
        .sort((a, b) => new Date(b.filedAt).getTime() - new Date(a.filedAt).getTime())
        .slice(0, 4),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Pulse</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Fictional demo data</Text>
        </View>
      </View>

      <Pressable style={styles.searchEntry} onPress={() => navigation.navigate("Screener")}>
        <Ionicons name="search" size={18} color={theme.colors.textMuted} />
        <Text style={styles.searchText}>Search ticker or company</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryRow}>
          <SummaryCard label="Filings" value={String(summary.count)} />
          <SummaryCard
            label="Purchases"
            value={formatCompactCurrency(summary.purchaseTotal)}
            accentColor={theme.colors.purchase}
          />
          <SummaryCard
            label="Sales"
            value={formatCompactCurrency(summary.saleTotal)}
            accentColor={theme.colors.sale}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Top signals</Text>
          {topSignals.map((trade) => (
            <Pressable
              key={trade.id}
              style={styles.signalRow}
              onPress={() => navigation.navigate("TradeDetails", { tradeId: trade.id })}
            >
              <View style={styles.signalText}>
                <Text style={styles.signalName}>{trade.signal}</Text>
                <Text style={styles.signalMeta}>
                  {trade.ticker} · {formatCompactCurrency(trade.value)}
                </Text>
              </View>
              <SignalBadge strength={trade.signalStrength} />
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Latest activity</Text>
          {latestActivity.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onPress={() => navigation.navigate("TradeDetails", { tradeId: trade.id })}
            />
          ))}
        </View>

        <Pressable style={styles.viewAll} onPress={() => navigation.navigate("Screener")}>
          <Text style={styles.viewAllText}>View all trades</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.accent} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.screenTitle,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  badge: {
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
  searchEntry: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    minHeight: 44,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.surfaceRaised,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
  },
  searchText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textMuted,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionHeading: {
    fontSize: theme.fontSize.sectionHeading,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  signalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    minHeight: 44,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  signalText: {
    flex: 1,
    gap: theme.spacing.xs / 2,
  },
  signalName: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  signalMeta: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
    minHeight: 44,
  },
  viewAllText: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.accent,
  },
});
