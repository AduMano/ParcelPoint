// Components
import { View, Text } from './Themed';

// Library
import React from 'react';
import { TextInput } from 'react-native-paper';

type FlexibleObject = {
  [key: string]: string | number | FlexibleObject | Array<any>;
};

export const LabeledTextInput = (props: {
  label: string;
  value: string;

  viewStyle?: FlexibleObject;
  textStyle?: FlexibleObject;
  textBoxStyle?: FlexibleObject;
  
  readonly?: boolean;
  multiline?: boolean;
  scrollable?: boolean;
  onPress?: () => void;
  onChange?: (query: string) => void;
}) => {
  // Drilled Props
  const { label, value } = props;
  const { viewStyle, textStyle, textBoxStyle, scrollable = false } = props
  const { readonly, onPress, onChange, multiline } = props;

  return (
    <View style={[viewStyle]}>
      <Text style={[textStyle]}>{label}</Text>
      <TextInput 
        value={value} 
        multiline={multiline || false} 
        readOnly={readonly || false} 
        onPress={onPress} 
        onChangeText={onChange} 
        contentStyle={{color: "black"}} 
        style={textBoxStyle}
        scrollEnabled={scrollable}
      />
    </View>
  )
}
