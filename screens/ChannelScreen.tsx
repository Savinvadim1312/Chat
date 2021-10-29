import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-react-native-core";

const ChannelScreen = () => {
  const [channel, setChannel] = useState(null);
  const route = useRoute();

  const { client } = useChatContext();

  const { channelId } = route.params || {};

  useEffect(() => {
    const fetchChannel = async () => {
      setChannel(null);
      console.log("fetching channel", channelId);
      const channels = await client.queryChannels({ id: { $eq: channelId } });
      if (channels.length > 0) {
        console.log("updating channel state");
        setChannel(channels[0]);
      } else {
        console.log("No channels found");
      }
    };

    fetchChannel();
  }, [channelId]);

  if (!channel) {
    return <Text>Loading...</Text>;
  }

  console.log("displaying channel: ", channel.id);
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
