// Components
import { View, Text } from "@/components/Themed";
import { PackageLogDetailModal } from "@/components/PackageLogDetailModal";
import { LogItem } from "@/app/utilities/history/components/LogItem";

// Library
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useRecoilState } from "recoil";

// Style
import { historyStyle, text, buttons, padding } from "@/app/utilities/history/styles/styles";
import { FIconByName } from "@/helpers/IconsLoader";

// Types
import { IRangedDate, TStatusOptions } from "@/app/utilities/history/types/types";
import { TParcel, TParcelDetail } from "@/app/utilities/home/types/type";

// Constants
import Colors from "@/constants/Colors";

// Helpers
import { getMinMaxArrivedAt, getMonthNameDayYearByDate } from "@/helpers/textFormatter";
import { isDateMonthNameDayYearEqual } from "@/helpers/InputValidator";

// Atoms
import { parcelList as AParcelList } from "@/app/utilities/home/atoms/atom";

const index = () => {
  /// Init Values
  const [parcels, setParcelList] = useRecoilState(AParcelList);
  const [renderedParcels, setRenderedParcels] = useState<TParcelDetail[]>([]);

  // Ranged Date Picker Values
  const minMaxDate = getMinMaxArrivedAt(parcels);
  
  const startDateDefault = useMemo(() => {
    return minMaxDate.minDate ?? new Date();
  }, [minMaxDate, parcels]);

  const endDateDefault = useMemo(() => {
    return minMaxDate.maxDate ?? new Date();
  }, [minMaxDate, parcels]);

  // Status Filter Values
  const statusFilterOptions = useMemo<TStatusOptions[]>(() => {
    return ["Retrieved", "Delivered"];
  }, []);

  /// States
  // For Modal Logs
  const [modalPackageState, setModalPackageState] = useState<boolean>(false);
  const [modalPackageLogState, setModalPackageLogState] = useState<boolean>(false);
  const [selectedPackageData, setSelectedPackageData] = useState<TParcelDetail>({
    parcelName: "",
    parcelId: "",
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
  const handleOpenPackageLogModal = useCallback(({parcelId, parcelName, status, lockerNumber, retrievedAt, retrievedBy, arrivedAt, userId, createdAt, id}: TParcelDetail) => {
    setSelectedPackageData({ parcelId, parcelName, status, lockerNumber, retrievedAt, retrievedBy, arrivedAt, userId, createdAt, id });
    setModalPackageLogState(true);
  }, []);

  const handleClosePackageLogModal = useCallback(() => {
    setModalPackageLogState(false);
  }, []);
  
  // Ranged Date Picker Handler
  const handleDateOnConfirm = useCallback(({startDate, endDate}: IRangedDate) => {
    setDateModalVisibility(false);
    const newEndDate = endDate;
    newEndDate?.setHours(23, 59, 59, 0);

    setDateRange({startDate, endDate: newEndDate});
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
    handleDateOnConfirm({startDate: startDateDefault ?? new Date(), endDate: endDateDefault ?? new Date()});
    setSelectedStatus("All");
  }, []);

  const handleFilter = useCallback(() => {
    // Filter by Date
    const filterProcess = parcels.filter(parcel => {
      if (!parcel.arrivedAt || !dateRange.startDate || !dateRange.endDate) return false; // Skip if no arrivedAt date
      const arrivedAt = new Date(parcel.arrivedAt);

      if (arrivedAt >= dateRange.startDate && arrivedAt <= dateRange.endDate) {
        if (selectedStatus === "All") return parcel;
        else if (selectedStatus === "Retrieved" && parcel.status === "Picked Up") return parcel; 
        else if (selectedStatus === "Delivered" && parcel.status === "Not Picked Up") return parcel; 
      }
    });

    setRenderedParcels(filterProcess);
  }, [dateRange, selectedStatus]);

  /// Onload
  useEffect(() => {
    handleFilter();
  }, [dateRange, selectedStatus]);

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
          validRange={{startDate: startDateDefault, endDate: endDateDefault}}
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
                disabled={(parcels.length === 0) ? true : false}
                style={[historyStyle.flex, historyStyle.justifyCenter, padding.six, historyStyle.rangedDatePicker, historyStyle.gap4,
                  { filter: (parcels.length === 0) ? "contrast(60%)" : "contrast(100%)", }
                ]} 
                onPress={() => setDateModalVisibility(true)}
              >
              { 
                (parcels.length > 0) && 
                <>
                  <FIconByName name="calendar" size={24} color={Colors["light"].backgroundDark} />
                  <Text>
                    {getMonthNameDayYearByDate(dateRange.startDate ?? new Date())} 
                    {" "}to{" "}
                    {getMonthNameDayYearByDate(dateRange.endDate ?? new Date())}
                  </Text>
                </>
              }
              </TouchableOpacity>
            </View>

            {/* Status Filter */}
            <View style={[historyStyle.view, historyStyle.flex, historyStyle.justifyCenter, historyStyle.gap4]}>
              {/* All */}
              <TouchableOpacity 
                disabled={(parcels.length === 0) ? true : false}
                style={[historyStyle.flex, padding.four, historyStyle.roundedBoarder, historyStyle.gap2, 
                  buttons.btnStatusWidth, historyStyle.justifyCenter,
                  selectedStatus === "All" && parcels.length > 0 ? buttons.btnPail : buttons.btnInactive,
                  { filter: (parcels.length === 0) ? "contrast(60%)" : "contrast(100%)", }
                ]}
                onPress={() => handleSelectStatus("All")}
              >
                {selectedStatus === "All" && parcels.length > 0 && <FIconByName name="check" size={24} color="black" />}
                <Text style={[
                    {color: parcels.length === 0 ? "white" : selectedStatus !== "All" ? "white" : "black"}
                  ]}>
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
                          selectedStatus !== "All" ? buttons.btnPail : buttons.btnInactive,
                          { filter: (parcels.length === 0) ? "contrast(60%)" : "contrast(100%)", }
                        ]} 
                        disabled={(parcels.length === 0) ? true : false}
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
                !isDateMonthNameDayYearEqual(startDateDefault ?? new Date(), dateRange.startDate ?? new Date()) ||
                !isDateMonthNameDayYearEqual(endDateDefault ?? new Date(), dateRange.endDate ?? new Date())
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
                <Text>Reset back to default</Text>
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
            {renderedParcels.length != 0 ? (
              renderedParcels.map((parcel: TParcelDetail) => (
                <LogItem key={parcel.id} parcel={parcel} handleOpenPackageLogModal={() => handleOpenPackageLogModal({
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
                })}
                  additionalStyle={{
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                  }}
                />
              ))
            ) : (
              <Text style={[text.subHeading, {textAlign: "center", marginTop: 40}]}>No Logs.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default index;
