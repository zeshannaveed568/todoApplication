import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [modalIsVisible, setModelIsVisible] = useState(false);

  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModelIsVisible(true);
  }

  function endAddGoalHandler() {
    setModelIsVisible(false);
  }

  function addGoalHandler(enterGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...courseGoals,
      { text: enterGoalText, id: Math.random().toString() },
    ]);

    endAddGoalHandler();
  }

  function deleteGoalhandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goals) => goals.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Button
          title='Add new Goal'
          color='#a065ec'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              itemData.index;
              return (
                <GoalItem
                  onDeleteItem={deleteGoalhandler}
                  id={itemData.item.id}
                  text={itemData.item.text}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  goalsContainer: {
    flex: 5,
  },
});
