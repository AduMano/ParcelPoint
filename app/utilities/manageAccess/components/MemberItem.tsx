// Components
import { Text, View } from '@/components/Themed';

// Library
import React from 'react';

// Types
import { TMember } from '../../home/types/type';
import { text } from '../../home/styles/styles';

const MemberItem = (props: {
  member: TMember
}) => {
  // Prop Drilling
  const { member } = props;

  return (
    <View>
      <Text style={text.bold}>{member.name}</Text>
      <Text style={text.subHeading}>HAHAHHAHAHAHA</Text>
      <Text style={text.subHeading}>HAHAHHAHAHAHA</Text>
      <Text style={text.subHeading}>HAHAHHAHAHAHA</Text>
      <Text style={text.subHeading}>HAHAHHAHAHAHA</Text>
    </View>
  )
}

export default MemberItem;
