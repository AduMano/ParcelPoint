import {
  FontAwesome,
  Entypo,
  Feather,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";

export const FAIconByName = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size: number;
  color: string;
  style?: any;
}) => {
  return <FontAwesome {...props} style={props.style} />;
};

export const FA6IconByName = (props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  size: number;
  color: string;
  style?: any;
}) => {
  return <FontAwesome6 {...props} style={props.style} />;
};

export const EIconByName = (props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
  style?: any;
}) => {
  return <Entypo {...props} style={props.style} />;
};

export const FIconByName = (props: {
  name: React.ComponentProps<typeof Feather>["name"];
  size: number;
  color: string;
  style?: any;
}) => {
  return <Feather {...props} style={props.style} />;
};

export const IonIconByName = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: string;
  style?: any;
}) => {
  return <Ionicons {...props} style={props.style} />;
};
