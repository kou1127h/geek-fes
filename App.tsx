import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);
  const [roundCount, setRoundCount] = useState<number[]>([]);

  const handlePressEndButton = useCallback(() => {
    if (count > 0) {
      setRoundCount([...roundCount, count]);
      setCount(0);
    }
  }, [count, roundCount]);

  const handlePressResetButton = useCallback(() => {
    setRoundCount([]);
    setCount(0);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {
          // ほんとはFlatListを使いたい
          roundCount.map((val, index) => (
            <Text key={index}>
              {index + 1}: {val}{" "}
            </Text>
          ))
        }
      </View>
      <Text>{count}</Text>
      <Button title="+1" onPress={() => setCount(count + 1)} />
      <Button title="end round" onPress={handlePressEndButton} />

      <Button title="reset all" onPress={handlePressResetButton} />
      <StatusBar style="auto" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
