import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import { greenColor } from "../constants";
import Categories from "../components/Home/category/Categories";
import FeaturedRows from "../components/Home/FeaturedRows";
import sanityClient from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
		...,
		restaurants[]->{
		  ...,
		  dishes[]->
		}
	  }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  
  return (
    <SafeAreaView className="bg-white pt-5">
      {/* HEADER  */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color={greenColor} />
          </Text>
        </View>
        <UserIcon size={35} color={greenColor} />
      </View>

      {/* SEARCH */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color={"gray"} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color={greenColor} />
      </View>

      {/* BODY */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* CATEGORIES */}
        <Categories />

        {/* FEATURED */}
        {featuredCategories?.map((category) => (
          <FeaturedRows
            key={category._id}
            title={category.name}
            desc={category.short_desc}
            id={category._id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
