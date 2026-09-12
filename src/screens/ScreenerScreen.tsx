import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { theme } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";
import type { RoleFilter, TransactionFilter, ValueFilter } from "../types/trade";
import FilterChip from "../components/FilterChip";
import TradeCard from "../components/TradeCard";

const VALUE_THRESHOLDS: Record<ValueFilter, number> = {
  any: 0,
  "100k": 100000,
  "500k": 500000,
  "1m": 1000000,
};

type Props = NativeStackScreenProps<RootStackParamList, "Screener">;

const TRANSACTION_OPTIONS: { label: string; value: TransactionFilter }[] = [
  { label: "All", value: "all" },
  { label: "Purchases", value: "purchase" },
  { label: "Sales", value: "sale" },
];

const ROLE_OPTIONS: { label: string; value: RoleFilter }[] = [
  { label: "All roles", value: "all" },
  { label: "CEO", value: "CEO" },
  { label: "CFO", value: "CFO" },
  { label: "Director", value: "Director" },
];

const VALUE_OPTIONS: { label: string; value: ValueFilter }[] = [
  { label: "Any", value: "any" },
  { label: "$100K+", value: "100k" },
  { label: "$500K+", value: "500k" },
  { label: "$1M+", value: "1m" },
];

export default function ScreenerScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState("");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [valueFilter, setValueFilter] = useState<ValueFilter>("any");

  const filteredTrades = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    const minValue = VALUE_THRESHOLDS[valueFilter];

    return mockTrades.filter((trade) => {
      const matchesSearch =
        query === "" ||
        trade.ticker.toLowerCase().includes(query) ||
        trade.company.toLowerCase().includes(query);
      const matchesTransaction = transactionFilter === "all" || trade.type === transactionFilter;
      const matchesRole = roleFilter === "all" || trade.role === roleFilter;
      const matchesValue = trade.value >= minValue;

      return matchesSearch && matchesTransaction && matchesRole && matchesValue;
    });
  }, [searchText, transactionFilter, roleFilter, valueFilter]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Screener</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Fictional demo data</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color={theme.colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search ticker or company"
          placeholderTextColor={theme.colors.textMuted}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Transaction type</Text>
          <View style={styles.chipRow}>
            {TRANSACTION_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={transactionFilter === option.value}
                onPress={() => setTransactionFilter(option.value)}
              />
            ))}
          </View>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Insider role</Text>
          <View style={styles.chipRow}>
            {ROLE_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={roleFilter === option.value}
                onPress={() => setRoleFilter(option.value)}
              />
            ))}
          </View>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Minimum value</Text>
          <View style={styles.chipRow}>
            {VALUE_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={valueFilter === option.value}
                onPress={() => setValueFilter(option.value)}
              />
            ))}
          </View>
        </View>

        <Text style={styles.resultCount}>
          {filteredTrades.length} {filteredTrades.length === 1 ? "result" : "results"}
        </Text>

        <View style={styles.list}>
          {filteredTrades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onPress={() => navigation.navigate("TradeDetails", { tradeId: trade.id })}
            />
          ))}
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
  searchRow: {
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
  searchInput: {
    flex: 1,
    fontSize: theme.fontSize.body,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.sm,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  filterGroup: {
    gap: theme.spacing.sm,
  },
  filterLabel: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.semibold,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  resultCount: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
  },
  list: {
    gap: theme.spacing.sm,
  },
});
