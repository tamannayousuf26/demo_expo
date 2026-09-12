import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/colors";

type Props = {
  label: string;
  value: string;
  accentColor?: string;
};

export default function SummaryCard({ label, value, accentColor }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, accentColor ? { color: accentColor } : null]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.xs / 2,
  },
  label: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.regular,
  },
  value: {
    fontSize: theme.fontSize.sectionHeading,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeight.semibold,
  },
});
