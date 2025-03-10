// Components
import { Text, View } from "@/components/Themed";
import PackageDeliveredModal from "@/components/PackageDeliveredModal";
import { PackageLogDetailModal } from "@/components/PackageLogDetailModal";

import ParcelItem from "@/app/utilities/home/components/ParcelItem";
import MemberItem from "@/app/utilities/home/components/MemberItem";
import { LogItem } from "@/app/utilities/home/components/LogItem";

// Helpers
import Colors from "@/constants/Colors";
import { IonIconByName } from "@/helpers/IconsLoader";

// Types
import { TParcelDetail, TData, TMember, TParcel } from "../../../../utilities/home/types/type";
import { INotificationItem } from "../../../../utilities/notification/types/types";

// Library
import { Alert, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Portal } from "react-native-paper";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles
import {
  styles,
  text,
  scroller,
  buttons,
} from "../../../../utilities/home/styles/styles";

// Recoil
import { userInformation as AUserInformation, userID as AUserID, API_URL as AAPIURL } from '@/app/utilities/home/atoms/atom';
import { memberList as AMemberList } from "@/app/utilities/home/atoms/atom";
import { userList as AUserList } from "@/app/utilities/home/atoms/atom";
import { parcelList as AParcelList } from "@/app/utilities/home/atoms/atom";
import { notificationList as ANotificationList } from "@/app/utilities/home/atoms/atom";

// Hooks
import useGetUserInfo from "@/app/utilities/home/hooks/useGetUserInfo";
import useGetMemberList from "@/app/utilities/home/hooks/useGetMemberList";
import useGetUserList from "@/app/utilities/home/hooks/useGetUserList";
import useGetParcelList from "@/app/utilities/home/hooks/useGetParcelList";
import useGetNotificationList from "@/app/utilities/home/hooks/useGetNotificationList";
import useGetApiUrl from "@/app/utilities/home/hooks/useGetApiUrl";
import { useSignalR } from "@/services/signalRService/signalRService";
import { useHomeService } from "@/services/signalRService/HomeService";

const index = () => {
  /// Init Data
  const [loadFlag, setLoadFlag] = useState<boolean>(false);

  // URL
  const { fetchAPIUrl, data: AUData, isLoading: AULoading, error: AUError } = useGetApiUrl();
  // User Data
  const { fetchUserInfo, data: UIData, isLoading: UILoading, error: UIError } = useGetUserInfo();
  // Member Data
  const { fetchMembers, data: MLData, isLoading: MLLoading, error: MLError } = useGetMemberList();
  // User List
  const { fetchUserList, data: ULData, isLoading: ULLoading, error: ULError } = useGetUserList();
  // Fetch Parcel List
  const { fetchParcelList, data: PLData, isLoading: PLLoading, error: PLError } = useGetParcelList();
  // Fetch Notification List
  const { fetchNotificationList, data: NLData, isLoading: NLLoading, error: NLError } = useGetNotificationList();
  // Load SignalR Service
  const { connectHub, isLoading: CHLoading, updateFlag, setUpdateFlag } = useHomeService();

  /// States
  // Update Flag
  useEffect(() => {
    if (!updateFlag) return;

    const refetch = async () => {
      // Refetch
      await fetchParcelList(userID ?? "");
      await fetchNotificationList(userID ?? "");
    }

    refetch();

    setUpdateFlag(false);
  }, [updateFlag])

  // Initial States
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    
    if ([UILoading, MLLoading, ULLoading, PLLoading, NLLoading, AULoading, CHLoading].every(load => !load)){
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [UILoading, MLLoading, ULLoading, PLLoading, NLLoading, AULoading, CHLoading]);

  // User Information
  const [userID, setUserID] = useRecoilState(AUserID);
  const [API_URL, setApi] = useRecoilState(AAPIURL);
  const [userInformation, setUserInformation] = useRecoilState(AUserInformation);
  const [members, setMembers] = useRecoilState(AMemberList);
  const [userList, setUserList] = useRecoilState(AUserList);
  const [parcels, setParcelList] = useRecoilState(AParcelList);
  const [notifications, setNotificationList] = useRecoilState(ANotificationList);
  
  // For Modal
  const [modalPackageState, setModalPackageState] = useState<boolean>(false);
  const [modalPackageLogState, setModalPackageLogState] = useState<boolean>(false);
  const [selectedPackageData, setSelectedPackageData] = useState<TParcelDetail>({});

  /// Event Handlers
  // Modal for Parcel Status
  const onOpenPackageModal = useCallback(({parcelId, parcelName, status, lockerNumber, retrievedAt, retrievedBy, arrivedAt, userId, createdAt, id}: TParcelDetail) => {
    setSelectedPackageData({ parcelId, parcelName, status, lockerNumber, retrievedAt, retrievedBy, arrivedAt, userId, createdAt, id });
    setModalPackageState(true);
  }, [parcels]);
  const onClosePackageModal = useCallback(() => {
    setModalPackageState(false);
  }, []);

  // Modal for Logs
  const onOpenPackageLogModal = useCallback(({parcelId, parcelName, status, lockerNumber, retrievedAt, retrievedBy, arrivedAt, userId, createdAt, id}: TParcelDetail) => {
    setSelectedPackageData({ parcelId, parcelName, status, lockerNumber, retrievedAt, retrievedBy, arrivedAt, userId, createdAt, id });
    setModalPackageLogState(true);
  }, [parcels]);
  const onClosePackageLogModal = useCallback(() => {
    setModalPackageLogState(false);
  }, []);

  /// BAGAFUNCTION
  const expandParcelLogs = (logs: TParcelDetail[]) => {
    const expandedLogs: TParcelDetail[] = [];
  
    logs.forEach((log: TParcelDetail) => {
      // 1) Add an "Arrived" record if arrivedAt is present
      if (log.arrivedAt) {
        expandedLogs.push({
          ...log,
        });
      }
  
      // 2) Add a "Retrieved" record if retrievedAt is present
      if (log.retrievedAt) {
        expandedLogs.push({
          ...log,
        });
      }
    });
  
    return expandedLogs;
  }
  
  
  /// Use Effect
  // Get User ID
  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("USER_ID");
      await fetchAPIUrl();

      setUserID(id);
    };

    getUserId();
  }, []);

  // ERRORS
  useEffect(() => {
    if (UIError === null) return;

    setLoading(true);
    Alert.alert(
      "Connection Issue", 
      "Unable to load data due to internet connection issues.\nPlease Try again later.", 
      [{ text: "I Understand", onPress: () => { BackHandler.exitApp() } }]
    );

    // Redirect user to no internet page
  }, [UIError]);

  useEffect(() => {
    if (PLError === null) return;

    // setLoading(true);
    console.log(PLError);
  }, [PLError]);
  
  // DATA RETRIEVAL
  useEffect(() => {
    if (UIData === null) return;

    const getUserInformation = async () => {
      setUserInformation(UIData);
    }

    getUserInformation();
  }, [UIData]);

  useEffect(() => {
     if (MLData === null) return;

     const getMemberList = async () => {
      setMembers(MLData);
     }

     getMemberList();
  }, [MLData]);

  useEffect(() => {
     if (ULData === null) return;

     const getUserList = async () => {
      setUserList(ULData);
     }

     getUserList();
  }, [ULData]);

  useEffect(() => {
     if (PLData === null) return;

     const getParceList = async () => {
      setParcelList(PLData);
     }

     getParceList();
  }, [PLData]);

  useEffect(() => {
    if (NLData === null) return;

    const getNotificationList = async () => {
      setNotificationList(NLData);
    }

    getNotificationList();
  }, [NLData]);

  // Fetch Data
  useEffect(() => {
    if (AUData === null) return;

    const fetchURL= async () => {
      await setApi(AUData);
    };

    fetchURL();

  }, [AUData]);

  useEffect(() => {
    if (API_URL === null) return;
    
    const fetchData = async () => {
      await fetchUserInfo(userID ?? "");
      await fetchMembers(userID ?? "");
      await fetchUserList(userID ?? "");
      await fetchParcelList(userID ?? "");
      await fetchNotificationList(userID ?? "");
      await connectHub(API_URL ?? "", userID ?? "");
    }

    fetchData();
  }, [API_URL]);

  useEffect(() => {
    console.log(AUError);
  }, [AUError]);

  return (
    <>
      {/* Modals */}
      <Portal>
        <PackageDeliveredModal 
          modalPackageState={modalPackageState} 
          handleClosePackageModal={onClosePackageModal}
          modalData={selectedPackageData}  
        />

        <PackageLogDetailModal
          modalPackageDetailState={modalPackageLogState} 
          handleClosePackageDetailModal={onClosePackageLogModal}
          modalData={selectedPackageData}  
        />

        {/* Loading Screen */}
        { isLoading && (
          <View style={[styles.loading, {gap: 20}]}>
            <ActivityIndicator size={100} color={Colors["light"].buttonAction} />
            <Text style={[text.heading]}>Fetching Data...</Text>
            <Text style={[text.mute]}>This may take a while. Plase wait</Text>
          </View>
        )}
      </Portal>

      {/* Content */}
      { UIError === null &&
        <View style={styles.container}>
          {/* Header Contains Name, Fixed MEssage and Notif */}
          {/* Under in Header, shows the carousel cards that are ready to pick up */}
          {/* This header is attached to the top, takes 30% height */}
          <View style={[styles.headerSection]}>
            {/* Greet And Notification Section */}
            <View style={[styles.flex, styles.viewDefault]}>
              <View style={styles.viewDefault}>
                <Text style={[text.heading, { color: "white" }]}>
                  <Text style={{ color: "White" }}>
                    Hi, {userInformation?.firstName} {userInformation?.lastName} {userInformation?.suffix}
                  </Text>
                </Text>
                <Text style={text.subHeading}>
                  Have a great day managing your deliveries!
                </Text>
              </View>

              <TouchableOpacity
                // Pass Data Notifications as Parameter
                onPress={() => router.push({
                  pathname: "/utilities/notification/view",
                  params: {
                    data: JSON.stringify(notifications)
                  },
                })}
              >
                <IonIconByName name="notifications" size={30} color={"white"} />
              {
                notifications.some((notif) => !notif.isRead) && <View style={styles.notificationDot} />
              }
              </TouchableOpacity>
            </View>

            {/* Delivered Parcel (Ready to Pick Up) */}
            <View style={styles.viewDefault}>
              <Text style={[text.headingLast, { marginTop: 20 }]}>
                {parcels.filter((parcel) => parcel.status == "Not Picked Up")
                  .length != 0
                  ? "Ready to Pick Up!"
                  : ""}
              </Text>

              <View style={[styles.viewDefault]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={scroller.scrollContainer}
                >
                  {parcels.filter(
                    (parcel) => parcel.status == "Not Picked Up"
                  ).length != 0 ? (
                    parcels.map((parcel: TParcelDetail) => {
                      if (parcel.status == "Not Picked Up") {
                        return (
                          <ParcelItem key={parcel.id} parcel={parcel} handleOpenPackageModal={() => onOpenPackageModal({
                            parcelName: parcel.parcelName,
                            parcelId: parcel.parcelId,
                            status: parcel.status,
                            lockerNumber: parcel.lockerNumber,
                            retrievedAt: parcel.retrievedAt,
                            retrievedBy: parcel.retrievedBy,
                            arrivedAt: parcel.arrivedAt,
                            userId: parcel.userId,
                            createdAt: parcel.createdAt,
                            id: parcel.id,
                          })} />
                        );
                      }
                    })
                  ) : (
                    <Text style={[text.heading, { color: "white" }]}>
                      No parcels at the moment.
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Body Contains Household Members Carousel Pins and a direction button with parcel history logs */}
          {/* This body is attached to the bottom, takes 70% height */}
          {/* History logs has scrollable vertical for listing logs (Except the header of this section) */}
          <View style={[[styles.bodySection]]}>
            <View style={[styles.viewDefault, styles.membersSection]}>
              {/* Members */}
              <View style={[styles.viewDefault, styles.household]}>
                <Text style={text.headingTwo}>Household Members</Text>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={[styles.memberScroller]}
                >
                  {members.length != 0 ? (
                    members.map((member, index) => {
                      return (
                        <MemberItem key={index} member={member} />
                      );
                    })
                  ) : (
                    <Text style={[text.subHeading]}>No Shared Members.</Text>
                  )}
                </ScrollView>

                <TouchableOpacity
                  style={buttons.primary}
                  onPress={() => {
                    router.replace("/dashboard/(tabs)/manageAccess/views");
                  }}
                >
                  <Text style={text.bold}>Manage Household Members</Text>
                </TouchableOpacity>
              </View>

              {/* History Logs */}
              <View style={[styles.viewDefault, styles.historyContainer]}>
                <View style={[styles.viewDefault, styles.historyHeader]}>
                  <Text style={[text.headingTwo]}>History Logs</Text>

                  <TouchableOpacity
                    onPress={() =>
                      router.replace("/dashboard/(tabs)/history/views")
                    }
                  >
                    <Text style={{ fontSize: 16 }}>View All</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={[styles.historyList]}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                >
                  {parcels.length != 0 ? (
                    parcels.slice(0, 5).map((parcel: TParcelDetail) => (
                      <LogItem key={parcel.id} parcel={parcel} handleOpenPackageLogModal={() => onOpenPackageLogModal({
                        parcelName: parcel.parcelName,
                        parcelId: parcel.parcelId,
                        status: parcel.status,
                        lockerNumber: parcel.lockerNumber,
                        retrievedAt: parcel.retrievedAt,
                        retrievedBy: parcel.retrievedBy,
                        arrivedAt: parcel.arrivedAt,
                        userId: parcel.userId,
                        createdAt: parcel.createdAt,
                        id: parcel.id,
                      })} />
                    ))
                  ) : (
                    <Text style={text.subHeading}>No Recent Activity.</Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      }
    </>
  );
};

export default index;
