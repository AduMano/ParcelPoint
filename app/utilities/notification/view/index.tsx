// Components
import { View, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import { useCallback } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";

// Types
import { IData, INotificationItem } from "../types/types";
import React from "react";

// Styles
import { styles, notificationStyle } from "../styles/styles";
import { router } from "expo-router";

const Index = () => {

  // Get Notification via Params
  const searchParams = useSearchParams();
  const notifications = searchParams.get("data"); 
  const data = notifications ? JSON.parse(notifications) : [];

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
