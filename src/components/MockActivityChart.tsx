import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Polyline } from "react-native-svg";
import { theme } from "../theme/colors";

type Props = {
  points: number[];
  width?: number;
  height?: number;
};

export default function MockActivityChart({ points, width = 280, height = 100 }: Props) {
  const padding = theme.spacing.sm;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const stepX = (width - padding * 2) / (points.length - 1);
  const coords = points.map((value, index) => {
    const x = padding + index * stepX;
    const y = padding + (height - padding * 2) * (1 - (value - min) / range);
    return { x, y };
  });

  const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <View>
      <Text style={styles.label}>Mock 7-day activity</Text>
      <Svg width={width} height={height}>
        <Line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={theme.colors.border}
          strokeWidth={1}
        />
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={theme.colors.accent}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {coords.map((c, index) => (
          <Circle key={index} cx={c.x} cy={c.y} r={3} fill={theme.colors.accent} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.label,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
});
