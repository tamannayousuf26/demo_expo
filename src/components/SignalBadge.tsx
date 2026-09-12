import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/colors";
import type { SignalStrength } from "../types/trade";

type Props = {
  strength: SignalStrength;
};

const STRENGTH_STYLES: Record<SignalStrength, { background: string; text: string }> = {
  High: { background: `${theme.colors.accent}26`, text: theme.colors.accent },
  Medium: { background: theme.colors.surfaceRaised, text: theme.colors.textSecondary },
  Low: { background: theme.colors.surfaceRaised, text: theme.colors.textMuted },
};

export default function SignalBadge({ strength }: Props) {
  const style = STRENGTH_STYLES[strength];

  return (
    <View style={[styles.badge, { backgroundColor: style.background }]}>
      <Text style={[styles.text, { color: style.text }]}>{strength}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.radius.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs / 2,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: theme.fontSize.badge,
    fontWeight: theme.fontWeight.semibold,
  },
});
