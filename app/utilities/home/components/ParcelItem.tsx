// Components
import { View, Text } from '@/components/Themed';

// Library
import React from 'react';
import { TouchableOpacity } from 'react-native';

// Styles
import {
  styles,
  scroller,
} from "../styles/styles";

// Helpers
import { shortenText } from "@/helpers/textFormatter";
import { EIconByName } from '@/helpers/IconsLoader';

// Types
import { TParcel } from '../types/type';

const ParcelItem = (props: {
    parcel: TParcel;
    handleOpenPackageModal: () => void
}) => {

    // Prop Drilling
    const {parcel, handleOpenPackageModal} = props; 

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

        <TouchableOpacity style={scroller.arrow} onPress={handleOpenPackageModal}>
            <EIconByName
                name="chevron-small-right"
                size={30}
                color={"black"}
            />
        </TouchableOpacity>
    </View>
  )
}

export default ParcelItem;
