import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import SafeView from "../components/SafeView";

export default function PreparingOrderScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("DeliveryScreen");
    }, 4000);
  }, []);
  return (
    <SafeAreaView
      style={SafeView.AndroidSafeArea}
      className="bg-[#00ccbb] flex-1 justify-center items-center"
    >
      <Animatable.Image
        source={require("../assets/delivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} color="white" indeterminate={true} />
    </SafeAreaView>
  );
}
