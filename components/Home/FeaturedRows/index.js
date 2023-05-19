import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { greenColor } from "../../../constants";
import RestaurantCard from "../RestaurantCard";
import sanityClient from "../../../sanity";
import addDecimal from "../../../functions/addDecimal";

export default function FeaturedRows({ id, title, desc }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        }
      }
    }[0]`,
        { id }
      )
      .then((row) => {
        setRestaurants(row?.restaurants);
        return;
      });
  }, [id]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={greenColor} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{desc}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((data) => (
          <RestaurantCard
            key={data._id}
            id={data._id}
            imgUrl={data.image}
            title={data.name}
            rating={addDecimal(data.rating)}
            genre={data.type.name}
            address={data.address}
            short_desc={data.short_desc}
            dishes={data.dishes}
            long={data.long}
            lat={data.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
