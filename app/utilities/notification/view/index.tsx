// Components
import { View, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import { useCallback, useMemo } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";

// Types
import { INotificationItem } from "../types/types";
import React from "react";

// Styles
import { styles, notificationStyle } from "../styles/styles";
import { router } from "expo-router";

const Index = () => {
  const data = useMemo<INotificationItem[]>(
    () => [
      {
        id: "1",
        title: "Your Parcel Has Been Delivered!",
        description:
          "Your parcel 11 has been successfully delivered and is ready to pickup in the locker.",
        date: "11/30/2024 9:14 AM",
        status: "Not Read",
      },
      {
        id: "2",
        title: "Reminder to Pick Up Your Parcel!",
        description:
          "Your Parcel 5 will expire in 5 hours. Please retrieve it before the expiration time to avoid issues.",
        date: "11/30/2024 8:15 AM",
        status: "Not Read",
      },
      {
        id: "3",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
      {
        id: "4",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Not Read",
      },
      {
        id: "5",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
      {
        id: "6",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Not Read",
      },
      {
        id: "7",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Not Read",
      },
      {
        id: "8",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
      {
        id: "9",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
      {
        id: "10",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
    ],
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: INotificationItem }) => (
      <TouchableOpacity
        style={[
          notificationStyle.notificationCard,
          {
            backgroundColor:
              item.status == "Read"
                ? Colors.light["notificationReadCard"]
                : Colors.light["notificationCard"],
          },
        ]}
      >
        <Text style={notificationStyle.title}>{item.title}</Text>
        <Text style={notificationStyle.description}>{item.description}</Text>
        <Text style={notificationStyle.date}>{item.date}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={notificationStyle.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={notificationStyle.routerBack}
          >
            <FA6IconByName name="arrow-left" size={28} color={"white"} />
          </TouchableOpacity>
          <Text style={notificationStyle.headerTitle}>Notifications</Text>
        </View>

        {/* Mark All as Read */}
        <View style={notificationStyle.markAllRead}>
          <TouchableOpacity style={{ width: "auto" }}>
            <Text style={{ textAlign: "right" }}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={notificationStyle.list}
        />
      </View>
    </>
  );
};

export default Index;
