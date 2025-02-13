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
import { TParcelDetail } from '../types/type';

const ParcelItem = (props: {
    parcel: TParcelDetail;
    handleOpenPackageModal: () => void
}) => {

    // Prop Drilling
    const {parcel, handleOpenPackageModal} = props; 

  return (
    <View key={parcel.id} style={scroller.card}>
        <View style={styles.viewDefault}>
            <Text style={scroller.cardTitle}>
                {parcel.parcelName} {parcel.parcelId?.substring(0, 5)}
            </Text>
            <Text style={scroller.cardSubtitle}>
                ID: {shortenText(parcel.parcelId ?? "", 10)}
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
