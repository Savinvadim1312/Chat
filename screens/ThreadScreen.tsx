import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
  MessageType,
  Thread,
} from "stream-chat-react-native-core";

const ThreadScreen = () => {
  const [channel, setChannel] = useState(null);
  const route = useRoute();

  const { client } = useChatContext();

  const { channelId, thread } = route.params || {};

  useEffect(() => {
    const fetchChannel = async () => {
      setChannel(null);
      const channels = await client.queryChannels({ id: { $eq: channelId } });
      if (channels.length > 0) {
        setChannel(channels[0]);
      }
    };

    fetchChannel();
  }, [channelId]);

  if (!channel) {
    return <Text>Loading...</Text>;
  }

  return (
    <Channel channel={channel} thread={thread}>
      <Thread />
    </Channel>
  );
};

export default ThreadScreen;
