// Components
import { View, Text } from "@/components/Themed";
import { PackageLogDetailModal } from "@/components/PackageLogDetailModal";
import { LogItem } from "@/app/utilities/history/components/LogItem";

// Library
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Menu, Portal } from "react-native-paper";
import { registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
  hour: "Hour",
  minute: "Minute"
});
import { DatePickerModal } from "react-native-paper-dates";

// Style
import { historyStyle, text, buttons, padding } from "@/app/utilities/history/styles/styles";
import { FIconByName } from "@/helpers/IconsLoader";

// Types
import { IRangedDate, TStatusOptions } from "@/app/utilities/history/types/types";
import { TParcel, TParcelDetail } from "@/app/utilities/home/types/type";
import { INotificationItem } from "@/app/utilities/notification/types/types";

// Constants
import Colors from "@/constants/Colors";

// Helpers
import { getMonthNameDayYearByDate } from "@/helpers/textFormatter";
import { isDateMonthNameDayYearEqual } from "@/helpers/InputValidator";

const index = () => {
  /// Init Values
  // Parcel Logs Values
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

  // Ranged Date Picker Values
  const rangeDateGap = useMemo(() => {
    return 30;
  }, []);

  const startDateDefault = useMemo(() => {
    const currentDate = new Date();
    const getDaysBeforeCurrent = new Date(currentDate);
    getDaysBeforeCurrent.setDate(currentDate.getDate() - rangeDateGap);

    return getDaysBeforeCurrent;
  }, []);

  const endDateDefault = useMemo(() => {
    return new Date();
  }, []);

  // Status Filter Values
  const statusFilterOptions = useMemo<TStatusOptions[]>(() => {
    return ["Retrieved", "Delivered"];
  }, []);

  /// States
  // For Modal Logs
  const [modalPackageState, setModalPackageState] = useState<boolean>(false);
  const [modalPackageLogState, setModalPackageLogState] = useState<boolean>(false);
  const [selectedPackageData, setSelectedPackageData] = useState<TParcelDetail>({
    name: "",
    trackingId: "",
    status: "",
  });

  // Ranged Date Picker States
  const [dateRange, setDateRange] = useState<IRangedDate>({startDate: startDateDefault, endDate: endDateDefault});
  const [isDateModalVisible, setDateModalVisibility] = useState<boolean>(false);

  // Status Filter States
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);

  /// Handlers
  // Modal for Logs
  const handleOpenPackageLogModal = useCallback(({trackingId, name, status}: TParcelDetail) => {
    setSelectedPackageData({ trackingId, name, status });
    setModalPackageLogState(true);
  }, []);

  const handleClosePackageLogModal = useCallback(() => {
    setModalPackageLogState(false);
  }, []);
  
  // Ranged Date Picker Handler
  const handleDateOnConfirm = useCallback(({startDate, endDate}: IRangedDate) => {
    setDateModalVisibility(false);
    setDateRange({startDate, endDate});
  }, [setDateModalVisibility, setDateRange]);

  const handleDateOnDismiss = useCallback(() => {
    setDateModalVisibility(false);
  }, [setDateModalVisibility]);

  // Status Filter Handler
  const handleSelectStatus = useCallback((status: string) => {
    setSelectedStatus(status);
    setMenuVisibility(false);
  }, [isMenuVisible]);

  // Reset Filter Handler
  const handleResetFilter = useCallback(() => {
    handleDateOnConfirm({startDate: startDateDefault, endDate: endDateDefault});
    setSelectedStatus("All");
  }, []);

  return (
    <>
      {/* Modals */}
      <Portal>
        {/* Date Picker */}
        <DatePickerModal
          locale="en"
          mode="range"
          visible={isDateModalVisible}
          onDismiss={handleDateOnDismiss}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onConfirm={handleDateOnConfirm}
          saveLabel="Done Filtering"
          label="Select Range"
          startLabel="From"
          endLabel="To"
          presentationStyle="pageSheet"
          dateMode="start"
        />
      
        {/* Package Log Modal */}
        <PackageLogDetailModal
          modalPackageDetailState={modalPackageLogState} 
          handleClosePackageDetailModal={handleClosePackageLogModal}
          modalData={selectedPackageData} 
        />
      </Portal>

      {/* Container */}
      <View style={[historyStyle.view, historyStyle.fillFlex]}>
        {/* Header */}
        <View style={[historyStyle.view, historyStyle.headerSection]}>
          <Text style={[text.maxHeading, text.center, text.white]}>History Logs</Text>
          <Text style={[text.center, text.white]}>Tracks delivery time and pickup details.</Text>

          {/* Filters */}
          <View style={[historyStyle.view]}>
            {/* Datetime Picker */}
            <View style={[historyStyle.view]}>  
              <TouchableOpacity 
                style={[historyStyle.flex, historyStyle.justifyCenter, padding.six, historyStyle.rangedDatePicker, historyStyle.gap4]} 
                onPress={() => setDateModalVisibility(true)}
              >
                <FIconByName name="calendar" size={24} color={Colors["light"].backgroundDark} />
                <Text>
                  {getMonthNameDayYearByDate(dateRange.startDate ?? new Date())} 
                  {" "}to{" "}
                  {getMonthNameDayYearByDate(dateRange.endDate ?? new Date())}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Status Filter */}
            <View style={[historyStyle.view, historyStyle.flex, historyStyle.justifyCenter, historyStyle.gap4]}>
              {/* All */}
              <TouchableOpacity 
                style={[historyStyle.flex, padding.four, historyStyle.roundedBoarder, historyStyle.gap2, 
                  buttons.btnStatusWidth, historyStyle.justifyCenter,
                  selectedStatus === "All" ? buttons.btnPail : buttons.btnInactive
                ]}
                onPress={() => handleSelectStatus("All")}
              >
                {selectedStatus === "All" && <FIconByName name="check" size={24} color="black" />}
                <Text style={{color: selectedStatus !== "All" ? "white" : "black"}}>
                  All
                </Text>
              </TouchableOpacity>

              {/* Status Filter */}
              <Menu 
                  visible={isMenuVisible}
                  onDismiss={() => setMenuVisibility(false)} 
                  anchor={
                    (
                      <TouchableOpacity 
                        style={[historyStyle.flex, padding.four, historyStyle.roundedBoarder, historyStyle.gap2, 
                          buttons.btnStatusWidth, historyStyle.justifyCenter,
                          selectedStatus !== "All" ? buttons.btnPail : buttons.btnInactive
                        ]} 
                        onPress={() => setMenuVisibility(true)}
                      >
                        <Text style={{color: selectedStatus === "All" ? "white" : "black"}}>
                          {selectedStatus === "All" ? "Status Filter" : selectedStatus}
                        </Text>
                        <FIconByName name="chevron-down" size={24} color={selectedStatus === "All" ? "white" : "black"} />
                      </TouchableOpacity>
                    )
                  }
                >
                  {statusFilterOptions.map((item, index) => (
                    <Menu.Item 
                      key={index}
                      onPress={() => {
                        handleSelectStatus(item);
                      }}
                      title={item}
                    />
                  ))}
              </Menu>
            </View>
            
            {/* Reset Button */}
            {(( 
                !isDateMonthNameDayYearEqual(startDateDefault, dateRange.startDate ?? new Date()) ||
                !isDateMonthNameDayYearEqual(endDateDefault, dateRange.endDate ?? new Date())
              ) ||
              (
                selectedStatus !== "All"
              )
            ) && 
            (
              <TouchableOpacity 
                style={[historyStyle.flex, padding.four, historyStyle.roundedBoarder, buttons.btnPail, historyStyle.gap2, 
                historyStyle.justifyCenter, {
                  width: "50%", marginHorizontal: "auto", marginTop: 20,
                }]}
                onPress={handleResetFilter}
              >
                <Text>Reset Filter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Logs List */}
        <View style={[historyStyle.view, {flex: 1,}]}>
          <ScrollView
            style={[historyStyle.historyList]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={false}
          >
            {parcels.length != 0 ? (
              parcels.map((parcel: TParcel) => (
                <LogItem key={parcel.id} parcel={parcel} handleOpenPackageLogModal={() => handleOpenPackageLogModal({
                  name: parcel.name,
                  trackingId: parcel.trackingId,
                  status: parcel.status
                })}
                  additionalStyle={{
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                  }}
                />
              ))
            ) : (
              <Text style={text.subHeading}>No Recent Activity.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default index;
