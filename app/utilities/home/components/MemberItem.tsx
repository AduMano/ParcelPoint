// Components
import { Text } from '@/components/Themed';

// Library
import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

// Types
import { MemberItemProps } from '../types/type'

// Styles
import {
  styles,
  text
} from "../styles/styles";

const MemberItem = ({member}: MemberItemProps) => {
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
  )
}

export default MemberItem;
