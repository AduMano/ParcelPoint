// Components
import { Text, View } from '@/components/Themed';

// Library
import React, { useState, useEffect } from 'react';
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
  resetFlag: boolean;
  addToList: (id: string) => void;
  removeToList: (id: string) => void;
}) => {
  // Prop Drilling
  const { member, resetFlag, addToList, removeToList } = props;

  // State
  const [isActive, setActive] = useState<IsActive>("unchecked");
  const [justLoaded, setJustLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (justLoaded) {
      if (!resetFlag) {
        addToList(member.id);
        setActive("checked");
      }
      else {
        setActive("unchecked");
      }
    }
  }, [resetFlag]);

  useEffect(() => { setJustLoaded(true) }, []);

  // Handler
  const handleItemSelection = (() => {
    setActive((current) => {
      if (current === "checked") {
        removeToList(member.id);
        return "unchecked";
      }
      else {
        addToList(member.id);
        return "checked";
      }
    });
  });

  return (
    <View style={manageAccessStyle.memberBodyListItem}>
      {/* CheckBox */}
      <View style={[manageAccessStyle.flexRow, manageAccessStyle.alignItemsCenter]}>
        <Checkbox status={isActive} onPress={handleItemSelection} color={Colors["light"].backgroundDark} />

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
