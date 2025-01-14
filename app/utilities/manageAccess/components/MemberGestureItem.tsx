// Components
import { Text } from "@/components/Themed";
import MemberItem from "./MemberItem";

// Library
import React from 'react'
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';

// Style
import { manageAccessStyle } from "../style/style";

// Types
import { IMember } from "../types/types";

const MemberGestureItem = (props: {
  item: IMember;
  resetFlag: boolean;
  addSelectedMember: (id: string) => void;
  removeSelectedMember: (id: string) => void;
}) => {
  const { item, resetFlag, addSelectedMember, removeSelectedMember } = props;

  return (
    <GestureHandlerRootView style={manageAccessStyle.memberBody}>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity style={manageAccessStyle.actionEditButton}>
            <Text style={[{color: "white", textAlign: "center"}]}>Edit</Text>
          </TouchableOpacity>
        )}
        shouldCancelWhenOutside={true}
      >
        <MemberItem 
          member={item} 
          resetFlag={resetFlag} 
          addToList={addSelectedMember}
          removeToList={removeSelectedMember}
        />
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default MemberGestureItem;
