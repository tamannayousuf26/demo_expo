import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { theme } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Screener">;

export default function ScreenerScreen(_props: Props) {
  const [searchText, setSearchText] = useState("");

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
});
