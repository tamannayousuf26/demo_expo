import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ScreenerScreen from "../screens/ScreenerScreen";
import TradeDetailsScreen from "../screens/TradeDetailsScreen";

export type RootStackParamList = {
  Home: undefined;
  Screener: undefined;
  TradeDetails: { tradeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Screener" component={ScreenerScreen} />
      <Stack.Screen name="TradeDetails" component={TradeDetailsScreen} />
    </Stack.Navigator>
  );
}
