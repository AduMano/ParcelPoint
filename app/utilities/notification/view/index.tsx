// Components
import { View, Text } from "@/components/Themed";
import NotificationDetailModal from "@/components/NotificationDetailModal";
import Colors from "@/constants/Colors";

// Helpers
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import { useCallback, useMemo, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import { PaperProvider, Portal } from "react-native-paper";

// Types
import { INotificationItem, TNotificationDetails } from "../types/types";
import React from "react";

// Styles
import { styles, notificationStyle } from "../styles/styles";

const Index = () => {

  /// Get Notification via Params
  const searchParams = useSearchParams();
  const notifications = useMemo(() => searchParams.get("data"), []); 
  const [data, setData] = useState(notifications ? JSON.parse(notifications) : []);

  /// Modal State
  const [modalNotificationState, setModalNotificationState] = useState<boolean>(false);
  const [selectedNotificationData, setSelectedNotificationData] = useState<TNotificationDetails>({
    id: "",
    modalTitle: "",
    modalDescription: "",
    dateTime: "",
    expirationDate: "",
    lockerNumber: "",
    retrievedBy: ""
  });

  /// Handlers
  // Mark as all read Handler
  const handleMarkAllAsRead = useCallback(() => {
    setData((data: INotificationItem[]) => data.map((notif: INotificationItem) => ({...notif, status: "Read"})));
  }, []);

  // Modal Handler
    const onOpenNotificationModal = useCallback(({
      id, 
      modalTitle, 
      modalDescription, 
      dateTime, 
      expirationDate,
      lockerNumber,
      retrievedBy
    }: TNotificationDetails) => {
      setSelectedNotificationData({
        id,
        modalTitle,
        modalDescription,
        dateTime,
        expirationDate,
        lockerNumber,
        retrievedBy
      });
      
      setModalNotificationState(true);
    }, []);
    const onClosePackageLogModal = useCallback(() => {
      setSelectedNotificationData({
        id: "",
        modalTitle: "",
        modalDescription: "",
        dateTime: "",
        expirationDate: "",
        lockerNumber: "",
        retrievedBy: ""
      })

      setModalNotificationState(false);
    }, []);

  // Update Status
  const handleUpdateStatus = useCallback((item: INotificationItem) => {
    if (item.status !== "Read") {
      setData((data: INotificationItem[]) => data.map((notif: INotificationItem) => {
        if (notif.id == item.id) {
          return {...notif, status: "Read" };
        }
        return {...notif};
      }));
    }

    // Display Modal
    let modalData: TNotificationDetails = {
      id: item.id,
      modalTitle: item.title,
      modalDescription: item.description,
      dateTime: item.date,
      lockerNumber: "#02",
    }

    if (item.title.trim().toLowerCase().includes("retrieved")) {
      modalData.retrievedBy = "Aldwin Samano";
    }
    else if (item.title.trim().toLowerCase().includes("reminder")) {
      modalData.expirationDate = "December 30, 2024 at 03:00 PM";
    }

    onOpenNotificationModal(modalData);
  }, []);

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
        onPress={() => handleUpdateStatus(item)}
      >
        <Text style={notificationStyle.title}>{item.title}</Text>
        <Text style={notificationStyle.description}>{item.description}</Text>
        <Text style={notificationStyle.date}>{item.date}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <PaperProvider>
      <>
        {/* Modals */}
        <Portal>
          <NotificationDetailModal 
            modalNotificationState={modalNotificationState} 
            handleCloseNotificationModal={onClosePackageLogModal} 
            modalData={selectedNotificationData}
          />
        </Portal>

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
            <TouchableOpacity style={{ width: "auto" }} onPress={handleMarkAllAsRead}>
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
    </PaperProvider>
  );
};

export default Index;
