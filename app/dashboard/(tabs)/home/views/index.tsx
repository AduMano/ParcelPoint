// Components
import { Text, View } from "@/components/Themed";
import { PackageDeliveredModal } from "@/components/PackageDeliveredModal";

// Helpers
import { EIconByName, IonIconByName } from "@/helpers/IconsLoader";
import { shortenText } from "@/helpers/textFormatter";

// Types
import { TData, TMember, TParcel } from "../../../../utilities/home/types/type";

// Library
import { ScrollView, TouchableOpacity, Image, Pressable } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";

// Styles
import {
  styles,
  text,
  scroller,
  buttons,
} from "../../../../utilities/home/styles/styles";

const index = () => {
  // Sample data for the carousel
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

  const members = useMemo<TMember[]>(
    () => [
      { id: "1", name: "DanDan", image: "icon.png" },
      { id: "2", name: "DenDen", image: "icon.png" },
      { id: "3", name: "DinDin", image: "icon.png" },
      { id: "4", name: "DonDon", image: "icon.png" },
      { id: "5", name: "DunDun", image: "icon.png" },
      { id: "6", name: "Shane", image: "icon.png" },
      { id: "7", name: "Juvit", image: "icon.png" },
      { id: "8", name: "Ferdinand", image: "icon.png" },
    ],
    []
  );

  const [dataState, setDataState] = useState<string>("all");
  const [data, setData] = useState<TData>({
    parcels: parcels,
    members: members,
  });

  useEffect(() => {
    switch (dataState) {
      case "all":
        setData({
          parcels: parcels,
          members: members,
        });
        break;
      case "parcels":
        setData({
          parcels: parcels,
          members: [],
        });
        break;
      case "members":
        setData({
          parcels: [],
          members: members,
        });
        break;

      case "empty":
        setData({
          parcels: [],
          members: [],
        });
        break;
    }
  }, [dataState]);

  const handleStateChange = useCallback((state: string) => {
    setDataState(state);
  }, []);

  return (
    <>
      {/* Modals */}
      <PackageDeliveredModal />

      {/* Content */}
      <View style={styles.container}>
        {/* Header Contains Name, Fixed MEssage and Notif */}
        {/* Under in Header, shows the carousel cards that are ready to pick up */}
        {/* This header is attached to the top, takes 30% height */}
        <View style={[styles.headerSection]}>
          {/* Greet And Notification Section */}
          <View style={[styles.flex, styles.viewDefault]}>
            <View style={styles.viewDefault}>
              <Text style={[text.heading, { color: "white" }]}>
                <Text
                  style={{ color: "White" }}
                  onPress={() => handleStateChange("all")}
                >
                  Hi,
                </Text>{" "}
                <Text
                  style={{ color: "White" }}
                  onPress={() => handleStateChange("parcels")}
                >
                  Jane
                </Text>{" "}
                <Text
                  style={{ color: "White" }}
                  onPress={() => handleStateChange("members")}
                >
                  Dela
                </Text>{" "}
                <Text
                  style={{ color: "White" }}
                  onPress={() => handleStateChange("empty")}
                >
                  Cruz
                </Text>
              </Text>
              <Text style={text.subHeading}>
                Have a great day managing your deliveries!
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/utilities/notification/view")}
            >
              <IonIconByName name="notifications" size={30} color={"white"} />
              <View style={styles.notificationDot} />
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
                  data.parcels.map((parcel) => {
                    if (parcel.status == "Not Picked Up") {
                      return (
                        <View key={parcel.id} style={scroller.card}>
                          <View style={styles.viewDefault}>
                            <Text style={scroller.cardTitle}>
                              {shortenText(parcel.name, 15)}
                            </Text>
                            <Text style={scroller.cardSubtitle}>
                              ID: {shortenText(parcel.trackingId, 10)}
                            </Text>
                          </View>

                          <TouchableOpacity style={scroller.arrow}>
                            <EIconByName
                              name="chevron-small-right"
                              size={30}
                              color={"black"}
                            />
                          </TouchableOpacity>
                        </View>
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
                {data.members.length != 0 ? (
                  data.members.map((member) => {
                    return (
                      <TouchableOpacity
                        style={[styles.viewDefault, { marginHorizontal: 10 }]}
                        key={member.id}
                      >
                        <Image
                          source={require(`@/assets/images/icon.png`)} // Replace with your local image
                          style={styles.memberImage}
                        />
                        <Text style={text.center}>{member.name}</Text>
                      </TouchableOpacity>
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
                  data.parcels.slice(0, 8).map((parcel) => (
                    <View
                      style={[styles.viewDefault, styles.historyItems]}
                      key={parcel.id}
                    >
                      <View style={[styles.viewDefault, styles.historyInfo]}>
                        <Text style={text.headingTwo}>{parcel.name}</Text>
                        <Text>ID {parcel.id}</Text>
                        <Text>
                          {parcel.status == "Picked Up"
                            ? "Retrieved On"
                            : "Delivered On"}{" "}
                          <Text style={text.bold}>December 8, 2024</Text>
                        </Text>
                      </View>

                      <TouchableOpacity style={[styles.historyArrow]}>
                        <EIconByName
                          name="chevron-small-right"
                          size={30}
                          color={"black"}
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={text.subHeading}>No Recent Activity.</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
