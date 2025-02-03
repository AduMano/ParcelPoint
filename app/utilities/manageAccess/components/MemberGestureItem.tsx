// Components
import { Text } from "@/components/Themed";
import MemberItem from "./MemberItem";

// Library
import React from 'react'
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";

// Style
import { manageAccessStyle } from "../style/style";

// Types
import { IMember } from "../types/types";

// Recoil
import { selectedMember as ASelectedMember } from "../atoms/atom";

const MemberGestureItem = (props: {
  item: IMember;
}) => {
  const { item, } = props;
  const router = useRouter();
  const [_, setSelectedMember] = useRecoilState(ASelectedMember);

  return (
    <GestureHandlerRootView style={manageAccessStyle.memberBody}>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity 
            style={manageAccessStyle.actionEditButton}
            onPress={() => {
              setSelectedMember(item);
              router.push(
                {
                  pathname: "/utilities/manageAccess/forms/MemberForm",
                  params: { "type": "edit" }
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
          key={item.id}
        />
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default MemberGestureItem;
