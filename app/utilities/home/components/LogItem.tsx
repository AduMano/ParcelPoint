// Components
import { Text, View } from '@/components/Themed';

// Library
import React from 'react'
import { TouchableOpacity } from 'react-native'

// Styles
import {
  styles,
  text
} from "../styles/styles";

// Helpers
import { EIconByName } from '@/helpers/IconsLoader';

// Types
import { TParcelDetail } from '../types/type';
import { getMonthNameDayYearByDate } from '@/helpers/textFormatter';

export const LogItem = (props: {
    parcel: TParcelDetail;
    handleOpenPackageLogModal: () => void;
}) => {

    // Prop Drilling
    const {parcel, handleOpenPackageLogModal} = props; 

  return (
    <View
        style={[styles.viewDefault, styles.historyItems]}
        key={parcel.id}
    >
        <View style={[styles.viewDefault, styles.historyInfo]}>
            <Text style={text.headingTwo}>{parcel.parcelName} {parcel.id?.substring(0, 5)}</Text>
            <Text>ID: {parcel.id?.split("-").join("").substring(0, 10)}</Text>
            <Text>
                {parcel.status == "Picked Up"
                ? "Retrieved On"
                : "Delivered On"}{" "}
                <Text style={text.bold}>{
                    (parcel.status == "Picked Up")
                    ? getMonthNameDayYearByDate(parcel.retrievedAt ?? new Date()) 
                    : getMonthNameDayYearByDate(parcel.arrivedAt ?? new Date())
                }</Text>
            </Text>
        </View>

        <TouchableOpacity style={[styles.historyArrow]} onPress={handleOpenPackageLogModal}>
            <EIconByName
                name="chevron-small-right"
                size={30}
                color={"black"}
            />
        </TouchableOpacity>
    </View>
  )
}
