// Components
import { Text, View } from '@/components/Themed';

// Library
import React, { useState, useCallback } from 'react';
import { Checkbox } from 'react-native-paper';
import { Image } from 'react-native';

// Types
import { IMember, IsActive } from '../types/types';

// Styles
import { styles, text } from '../../home/styles/styles';
import { manageAccessStyle } from '../style/style';
import Colors from '@/constants/Colors';

// Helper
import { shortenText } from "@/helpers/textFormatter";

const MemberItem = (props: {
  member: IMember;
}) => {
  // Prop Drilling
  const { member } = props;

  // State
  const [isActive, setActive] = useState<IsActive>("unchecked");

  // Handler
  const handleItemSelection = (() => {
    setActive((current) => (current === "checked") ? "unchecked" : "checked" )
  });

  return (
    <View style={manageAccessStyle.memberBodyListItem}>
      {/* CheckBox */}
      <View style={[manageAccessStyle.flexRow, manageAccessStyle.alignItemsCenter]}>
        <Checkbox status={isActive} onPress={handleItemSelection} color={Colors["light"].buttonAction} />

        {/* Profile */}
        <View style={[manageAccessStyle.flexRow, manageAccessStyle.alignItemsCenter]}>
          {/* Image */}
          <Image
              source={require(`@/assets/images/icon.png`)} // Replace with your local image
              style={[styles.memberImage, {
                marginHorizontal: 10,
                width: 45,
                height: 45,
              }]}
          />

          <View>
            <Text style={text.bold}>{`${member.firstName} ${shortenText(member.lastName, 8)}`}</Text>
            <Text style={{color: Colors["light"].textMute}}>{member.relationship}</Text>
          </View>
        </View>
      </View>

      <Text style={{color: Colors["light"].textMute, fontSize: 10}}>{member.isAuthorized}</Text>
    </View>
  )
}

export default MemberItem;
