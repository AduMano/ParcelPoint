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
import { userInformation as AUserInformation, userID as AUserID } from '@/app/utilities/home/atoms/atom';
import { memberList as AMemberList } from "@/app/utilities/home/atoms/atom";
import { userList as AUserList } from "@/app/utilities/home/atoms/atom";

// Hooks
import useGetUserInfo from "@/app/utilities/home/hooks/useGetUserInfo";
import useGetMemberList from "@/app/utilities/home/hooks/useGetMemberList";
import useGetUserList from "@/app/utilities/home/hooks/useGetUserList";

const index = () => {
  // Sample data for the time being
  const parcels = useMemo<TParcel[]>(
    () => [
      {
        id: "1",
        name: "Mouse Pad XTra Long",
        trackingId: "123-456-789",
        status: "Picked Up",
      },
      {
        id: "2",
        name: "Parcel 2",
        trackingId: "092-123-134-123-323-333",
        status: "Not Picked Up",
      },
      {
        id: "3",
        name: "Parcel 3",
        trackingId: "012-122-233",
        status: "Picked Up",
      },
      {
        id: "4",
        name: "Parcel 4",
        trackingId: "111-222-333",
        status: "Picked Up",
      },
      {
        id: "5",
        name: "Keyboard",
        trackingId: "123-456-789",
        status: "Not Picked Up",
      },
      {
        id: "6",
        name: "Monitor",
        trackingId: "092-123-134-123-323-333",
        status: "Not Picked Up",
      },
      {
        id: "7",
        name: "Cup",
        trackingId: "012-122-233",
        status: "Not Picked Up",
      },
      {
        id: "8",
        name: "Floor Wax",
        trackingId: "111-222-333",
        status: "Not Picked Up",
      },
    ],
    []
  );

  const notifications = useMemo<INotificationItem[]>(
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
        status: "Read",
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
        status: "Read",
      },
      {
        id: "5",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Not Read",
      },
      {
        id: "6",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
      {
        id: "7",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Read",
      },
      {
        id: "8",
        title: "Your Parcel Has Been Retrieved",
        description:
          "Your Parcel 1 has been retrieved. Thank you for using the parcel locker!",
        date: "11/09/2024 8:15 AM",
        status: "Not Read",
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

  /// Init Data
  // User Data
  const { fetchUserInfo, data: UIData, isLoading: UILoading, error: UIError } = useGetUserInfo();
  // Member Data
  const { fetchMembers, data: MLData, isLoading: MLLoading, error: MLError } = useGetMemberList();
  // User List
  const { fetchUserList, data: ULData, isLoading: ULLoading, error: ULError } = useGetUserList();

  /// States
  // Initial States
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    
    if ([UILoading, MLLoading, ULLoading].every(load => !load)){
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [UILoading, MLLoading, ULLoading]);

  // User Information
  const [userID, setUserID] = useRecoilState(AUserID);
  const [userInformation, setUserInformation] = useRecoilState(AUserInformation);
  const [members, setMembers] = useRecoilState(AMemberList);
  const [userList, setUserList] = useRecoilState(AUserList);
  
  // For Modal
  const [modalPackageState, setModalPackageState] = useState<boolean>(false);
  const [modalPackageLogState, setModalPackageLogState] = useState<boolean>(false);
  const [selectedPackageData, setSelectedPackageData] = useState<TParcelDetail>({
    name: "",
    trackingId: "",
    status: "",
  });

  /// Event Handlers

  // Modal for Parcel Status
  const onOpenPackageModal = useCallback(({trackingId, name}: TParcelDetail) => {
    setSelectedPackageData({ trackingId, name });
    setModalPackageState(true);
  }, []);
  const onClosePackageModal = useCallback(() => {
    setModalPackageState(false);
  }, []);

  // Modal for Logs
  const onOpenPackageLogModal = useCallback(({trackingId, name, status}: TParcelDetail) => {
    setSelectedPackageData({ trackingId, name, status });
    setModalPackageLogState(true);
  }, []);
  const onClosePackageLogModal = useCallback(() => {
    setModalPackageLogState(false);
  }, []);

  /// Data Holder
  const [data, setData] = useState<TData>({
    parcels: parcels,
    members: members,
  });
  
  /// Use Effect
  // Get User ID
  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("USER_ID");
      await fetchUserInfo(id ?? "");
      await fetchMembers(id ?? "");
      await fetchUserList(id ?? "");

      setUserID(id);
    };

    getUserId();
  }, []);

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
                notifications.some((notif) => notif.status == "Not Read") && <View style={styles.notificationDot} />
              }
              </TouchableOpacity>
            </View>

            {/* Delivered Parcel (Ready to Pick Up) */}
            <View style={styles.viewDefault}>
              <Text style={[text.headingLast, { marginTop: 20 }]}>
                {data.parcels.filter((parcel) => parcel.status == "Not Picked Up")
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
                  {data.parcels.filter(
                    (parcel) => parcel.status == "Not Picked Up"
                  ).length != 0 ? (
                    data.parcels.map((parcel: TParcel) => {
                      if (parcel.status == "Not Picked Up") {
                        return (
                          <ParcelItem key={parcel.id} parcel={parcel} handleOpenPackageModal={() => onOpenPackageModal({
                            name: parcel.name,
                            trackingId: parcel.trackingId
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
                  {data.parcels.length != 0 ? (
                    data.parcels.slice(0, 5).map((parcel: TParcel) => (
                      <LogItem key={parcel.id} parcel={parcel} handleOpenPackageLogModal={() => onOpenPackageLogModal({
                        name: parcel.name,
                        trackingId: parcel.trackingId,
                        status: parcel.status
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
