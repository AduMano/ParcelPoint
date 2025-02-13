// Components
import { View, Text } from "@/components/Themed";
import NotificationDetailModal from "@/components/NotificationDetailModal";
import Colors from "@/constants/Colors";

// Helpers
import { FA6IconByName } from "@/helpers/IconsLoader";

// Library
import { useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ActivityIndicator, PaperProvider, Portal } from "react-native-paper";
import { useRecoilState } from "recoil";

// Types
import { INotificationItem, TNotificationDetails } from "../types/types";
import React from "react";

// Styles
import { styles, notificationStyle } from "../styles/styles";
import { text } from "../../home/styles/styles";

// Helpers
import { addHours, formatDateTime } from "@/helpers/textFormatter";

// Atoms
import { notificationList as ANotificationList } from "@/app/utilities/home/atoms/atom";

// Hooks
import useReadNotification from "../hooks/useReadNotification";

const Index = () => {

  /// Get Notification
  const [data, setData] = useRecoilState(ANotificationList);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("Item");
  const { readNotification, data: RNData, isLoading: RNLoading, error: RNError } = useReadNotification();
  
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
    if (data.some(notif => !notif.isRead)) {
      const notifIds = data.filter(notif => !notif.isRead).map(notif => notif.id);
    
      setActionType("All");
      readNotification(notifIds);
    }
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
    setActionType("Item");

    if (!item.isRead) {
      readNotification([item.id]);
      setData((data: INotificationItem[]) => data.map((notif: INotificationItem) => {
        if (notif.id == item.id) {
          return {...notif, isRead: true };
        }
        return {...notif};
      }));
    }

    // Display Modal
    let modalData: TNotificationDetails = {
      id: item.id,
      modalTitle: item.title,
      modalDescription: item.context,
      dateTime: formatDateTime(new Date(item.createdAt ?? new Date())),
      lockerNumber: "#" + item.lockerNumber,
    }

    if (item.title.trim().toLowerCase().includes("retrieved")) {
      modalData.retrievedBy = item.retrievedBy;
    }
    else if (item.title.trim().toLowerCase().includes("reminder")) {
      modalData.expirationDate = formatDateTime(addHours(item.createdAt ?? new Date(), 10));
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
              item.isRead
                ? Colors.light["notificationReadCard"]
                : Colors.light["notificationCard"],
          },
        ]}
        onPress={() => handleUpdateStatus(item)}
      >
        <Text style={notificationStyle.title}>{item.title}</Text>
        <Text style={notificationStyle.description}>{item.context}</Text>
        <Text style={notificationStyle.date}>{formatDateTime(new Date(item.createdAt ?? new Date()))}</Text>
      </TouchableOpacity>
    ),
    []
  );

  // Loader
  useEffect(() => {
    setLoading(RNLoading);
  }, [RNLoading]);

  // Reader
  useEffect(() => {
    if (RNData === null) return;

    if (actionType === "All") setData((data: INotificationItem[]) => data.map((notif: INotificationItem) => ({...notif, isRead: true})));
  }, [RNData]);

  // Errors
  useEffect(() => {
    if (RNError === null) return;
    
    console.log(RNError);
  }, [RNError]);

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
          {/* Loading Screen */}
          { isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator size={100} color={Colors["light"].buttonAction} />
            </View>
          )}
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
            <TouchableOpacity 
              style={[{ width: "auto" },
                { filter: data.length === 0 ? "contrast(2%)" : "contrast(100%)" }
              ]} 
              onPress={handleMarkAllAsRead}
              disabled={data.length === 0}
            >
              <Text style={{ textAlign: "right" }}>Mark all as read</Text>
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          {data.length > 0 ? (<>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={notificationStyle.list}
            />
          </>) : (<>
            <Text style={[text.heading, {textAlign: "center", marginTop: 40}]}>Empty Notification</Text>
          </>)}
        </View>
      </>
    </PaperProvider>
  );
};

export default Index;
function UseRecoilState(notifications: INotificationItem[]): [any, any] {
  throw new Error("Function not implemented.");
}

