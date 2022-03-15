import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";

const renderItem = ({ item, index }: { item: number; index: number }) => (
  <Text key={index} style={styles.normalText}>
    {index + 1}: {item}{" "}
  </Text>
);

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
      <FlatList
        data={roundCount}
        renderItem={renderItem}
        keyExtractor={(_item, index) => `${index}`}
        horizontal
        contentContainerStyle={styles.holeListContainer}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.normalText}>現在{count}打</Text>
        <View style={styles.buttonContainer}>
          <Button title="+1" onPress={() => setCount(count + 1)} />
          <Button title="end this hole" onPress={handlePressEndButton} />

          <Button title="reset all" onPress={handlePressResetButton} />
        </View>
      </View>
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
  normalText: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  holeListContainer: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "center",
    marginBottom: 10,
  },
});
