import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../theme/colors";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function FilterChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      style={[styles.chip, selected ? styles.chipSelected : null]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceRaised,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
  },
  chipSelected: {
    backgroundColor: theme.colors.accentMuted,
    borderColor: theme.colors.accent,
  },
  label: {
    fontSize: theme.fontSize.label,
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.textSecondary,
  },
  labelSelected: {
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.accent,
  },
});
