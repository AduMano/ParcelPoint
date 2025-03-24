// Components
import { Text, View } from '@/components/Themed';

// Library
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import { Image } from 'react-native';
import { useRecoilState } from 'recoil';

// Types
import { IMember, IsActive } from '../types/types';

// Styles
import { styles, text } from '../../home/styles/styles';
import { manageAccessStyle } from '../style/style';
import Colors from '@/constants/Colors';

// Helper
import { shortenText } from "@/helpers/textFormatter";

// Atoms
import { selectedMembers as ASelectedMembers, selectAllTrigger as ASelectAllTrigger } from '../atoms/atom';

const MemberItem = (props: {
  member: IMember;
}) => {
  // Prop Drilling
  const { member, } = props; 

  // State
  const [selectedMembers, setSelectedMembers] = useRecoilState(ASelectedMembers);
  const [selectAllTrigger, setSelectAllTrigger] = useRecoilState(ASelectAllTrigger);
  const [isActive, setActive] = useState<IsActive>("unchecked");

  useEffect(() => {
    if (selectedMembers.length === 0 && selectAllTrigger) {
      setSelectAllTrigger(false);
      setSelectedMembers(current => [...current, member]);
      setActive("checked");
    }
  }, [selectedMembers, selectAllTrigger])

  // Handler
  const handleItemSelection = () => {
    // First update selectedMembers
    setSelectedMembers((current) => {
      console.log("CURRENT: ", current)
      const newMembers = current.some(curr_mem => curr_mem.groupMemberId === member.groupMemberId)
        ? current.filter(curr_mem => curr_mem.groupMemberId !== member.groupMemberId)
        : [...current, member];
      // Now update isActive based on the current state of selectedMembers
      setActive(newMembers.some(curr_mem => curr_mem.groupMemberId === member.groupMemberId) ? "checked" : "unchecked");
      return newMembers;
    });
  };


  useEffect(() => {
    // After selectedMembers changes, update isActive accordingly
    setActive(selectedMembers.some(curr_mem => curr_mem.groupMemberId === member.groupMemberId) ? "checked" : "unchecked");
  }, [selectedMembers]);  // Only run when selectedMembers changes
  

  return (
    <View style={manageAccessStyle.memberBodyListItem}>
      {/* CheckBox */}
      <View style={[manageAccessStyle.flexRow, manageAccessStyle.alignItemsCenter]}>
        <Checkbox status={isActive} onPress={handleItemSelection} color={Colors["light"].backgroundDark} />

        {/* Profile */}
        <View style={[manageAccessStyle.flexRow, manageAccessStyle.alignItemsCenter]}>
          {/* Image */}
          <Image
              source={require("@/assets/images/icon.png")} // Replace with your local image
              style={[styles.memberImage, {
                marginHorizontal: 10,
                width: 45,
                height: 45,
              }]}
          />

          <View>
            <Text style={text.bold}>{`${member.firstName} ${shortenText(member.lastName, 8)}`}</Text>
            <Text style={{color: Colors["light"].textMute}}>{member.relationship?.name}</Text>
          </View>
        </View>
      </View>

      <Text style={{color: Colors["light"].textMute, fontSize: 10}}>{member.isAuthorized ? "Authorized" : "Not Authorized"}</Text>
    </View>
  )
}

export default MemberItem;