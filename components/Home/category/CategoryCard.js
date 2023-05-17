import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

export default function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="relative mr-2">
      <View className="relative">
        <Image source={{ uri: imgUrl }} className="h-20 w-20 rounded" />
        <View style={styles.overlay} />
      </View>
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity and color as desired
  },
});
