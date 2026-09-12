import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { theme } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";

type Props = NativeStackScreenProps<RootStackParamList, "TradeDetails">;

export default function TradeDetailsScreen({ route, navigation }: Props) {
  const trade = mockTrades.find((t) => t.id === route.params.tradeId);

  if (!trade) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Text style={styles.notFound}>No trade found for this id.</Text>
      </SafeAreaView>
    );
  }

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
});
