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
import { ParcelItemProps } from '../types/type';

export const LogItem = ({parcel}: ParcelItemProps) => {
  return (
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
  )
}
