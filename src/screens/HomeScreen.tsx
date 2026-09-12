import { StyleSheet, Text, View, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { theme } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const firstTradeId = mockTrades[0].id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Pulse</Text>
      <Text style={styles.subtitle}>Home screen placeholder — Phase 4 builds this out.</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate("Screener")}>
        <Text style={styles.buttonText}>Go to Screener</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("TradeDetails", { tradeId: firstTradeId })}
      >
        <Text style={styles.buttonText}>Go to Trade Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "center",
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.screenTitle,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.surfaceRaised,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
});
