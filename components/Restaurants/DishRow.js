import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../../sanity";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid";
import { greenColor } from "../../constants";

export default function DishRow({ id, name, short_desc, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border ${
          isPressed && "border-b-0"
        } border-gray-200 p-4`}
      >
        <View className="flex-row items-center">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{short_desc}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="NGN" />
            </Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "#f3f3f4" }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity>
              <MinusCircleIcon
                // color={items.length > 0 ? greenColor : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon
                // color={items.length > 0 ? greenColor : "gray"}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
