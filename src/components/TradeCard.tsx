import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/colors";
import type { InsiderTrade } from "../types/trade";
import { formatCompactCurrency, formatTradeDate } from "../utils/formatters";
import SignalBadge from "./SignalBadge";

type Props = {
  trade: InsiderTrade;
  onPress: () => void;
};

export default function TradeCard({ trade, onPress }: Props) {
  const isPurchase = trade.type === "purchase";
  const directionColor = isPurchase ? theme.colors.purchase : theme.colors.sale;
  const directionLabel = isPurchase ? "Purchase" : "Sale";
  const directionIcon = isPurchase ? "arrow-up-circle" : "arrow-down-circle";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={styles.identity}>
          <Text style={styles.ticker}>{trade.ticker}</Text>
          <Text style={styles.company} numberOfLines={1}>
            {trade.company}
          </Text>
        </View>
        <SignalBadge strength={trade.signalStrength} />
      </View>

      <View style={styles.directionRow}>
        <Ionicons name={directionIcon} size={18} color={directionColor} />
        <Text style={[styles.directionLabel, { color: directionColor }]}>{directionLabel}</Text>
        <Text style={styles.value}>{formatCompactCurrency(trade.value)}</Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={[styles.meta, styles.metaInsider]} numberOfLines={1}>
          {trade.insider} · {trade.role}
        </Text>
        <Text style={[styles.meta, styles.metaDate]}>{formatTradeDate(trade.filedAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
  },
  identity: {
    flex: 1,
    gap: theme.spacing.xs / 2,
  },
  ticker: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  company: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
  },
  directionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  directionLabel: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
  value: {
    marginLeft: "auto",
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  meta: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textMuted,
  },
  metaInsider: {
    flex: 1,
  },
  metaDate: {
    flexShrink: 0,
  },
});
