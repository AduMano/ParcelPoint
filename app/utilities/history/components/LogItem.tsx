// Components
import { Text, View } from '@/components/Themed';

// Library
import React from 'react'
import { TouchableOpacity } from 'react-native'

// Styles
import {
  text,
  styles
} from "../../history/styles/styles";

// Helpers
import { EIconByName } from '@/helpers/IconsLoader';

// Types
import { TParcelDetail } from '../../home/types/type';
import { getMonthNameDayYearByDate } from '@/helpers/textFormatter';

export const LogItem = (props: {
    parcel: TParcelDetail;
    handleOpenPackageLogModal: () => void;
    additionalStyle?: {};
}) => {

    // Prop Drilling
    const {parcel, handleOpenPackageLogModal, additionalStyle} = props; 

  return (
    <View
        style={[styles.viewDefault, styles.historyItems, additionalStyle]}
        key={parcel.id}
    >
        <View style={[styles.viewDefault, styles.historyInfo]}>
            <Text style={[text.headingTwo]}>{parcel.parcelName}</Text>
            <Text>ID {parcel.id}</Text>
            <Text>
              <Text style={[text.mute]}>Status: </Text>
              <Text style={[text.bold]}>{parcel.status === "Picked Up" ? "Retrieved" : "Delivered"}</Text>
            </Text>
            <Text>
              <Text style={[text.mute]}>Delivered on: </Text>
              <Text style={text.bold}>{getMonthNameDayYearByDate(parcel.arrivedAt ?? new Date())}</Text>
            </Text>
        </View>

        <TouchableOpacity onPress={handleOpenPackageLogModal}>
            <EIconByName
                name="chevron-small-right"
                size={50}
                color={"black"}
            />
        </TouchableOpacity>
    </View>
  )
}
