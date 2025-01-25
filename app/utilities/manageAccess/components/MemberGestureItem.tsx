// Components
import { Text } from "@/components/Themed";
import MemberItem from "./MemberItem";

// Library
import React from 'react'
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from "expo-router";

// Style
import { manageAccessStyle } from "../style/style";

// Types
import { IMember } from "../types/types";

const MemberGestureItem = (props: {
  item: IMember;
  resetFlag: boolean;
  resetFlagVersion: number;
  addSelectedMember: (id: string) => void;
  removeSelectedMember: (id: string) => void;
  members: IMember[]
}) => {
  const { item, resetFlag, resetFlagVersion, addSelectedMember, removeSelectedMember, members } = props;
  const router = useRouter();

  return (
    <GestureHandlerRootView style={manageAccessStyle.memberBody}>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity 
            style={manageAccessStyle.actionEditButton}
            onPress={() => {
              router.push(
                {
                  pathname: "/utilities/manageAccess/forms/MemberForm",
                  params: {
                    "type": "edit",
                    "id": item.id,
                    "memberList": JSON.stringify(members)
                  }
                }
              )
            }}
          >
            <Text style={[{color: "white", textAlign: "center"}]}>Edit</Text>
          </TouchableOpacity>
        )}
        shouldCancelWhenOutside={true}
        cancelsTouchesInView={true}
        rightThreshold={50}
      >
        <MemberItem 
          member={item} 
          resetFlag={resetFlag} 
          resetFlagVersion={resetFlagVersion}
          addToList={addSelectedMember}
          removeToList={removeSelectedMember}
        />
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default MemberGestureItem;
