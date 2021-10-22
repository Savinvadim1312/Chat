import { useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text } from "react-native";
import {
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-react-native-core";

const ChannelScreen = () => {
  const route = useRoute();

  const channel = route.params?.channel;

  if (!channel) {
    return <Text>Channel not found!</Text>;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
