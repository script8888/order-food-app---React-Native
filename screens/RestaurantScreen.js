import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import { greenColor } from "../constants";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/Restaurants/DishRow";
import BasketIcon from "../components/Restaurants/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";
import { selectBasketItems } from "../slices/basketSlice";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_desc,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_desc,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);
  return (
    <>
      <BasketIcon />
      <ScrollView className="bg-white">
        <View>
          <View>
            <Image
              source={{ uri: urlFor(imgUrl).url() }}
              className="w-full h-56 bg-gray-300 p-4"
            />
            <View style={styles.overlay} />
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={greenColor} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color={greenColor} opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color={"gray"} opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby . {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_desc}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={greenColor} />
          </TouchableOpacity>
        </View>

        <View className={`${items.length !== 0 && "pb-28"}`}>
          <View className="px-4 pt-6 pb-5 bg-gray-100">
            <Text className="font-bold text-xl">Menu</Text>
          </View>
          {/* DishRows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              short_desc={dish.short_desc}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust the opacity and color as desired
  },
});
