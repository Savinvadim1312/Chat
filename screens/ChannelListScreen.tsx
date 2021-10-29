import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";
import messaging from "@react-native-firebase/messaging";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import AuthContext from "../contexts/Authentication";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const onChannelPressed = (channel) => {
    navigation.navigate("Channel", { channelId: channel.id });
  };

  const { userId } = React.useContext(AuthContext);

  const filters = {
    members: {
      $in: [userId],
    },
  };

  useEffect(() => {
    // for background notifications
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage
      );

      const channel = JSON.parse(remoteMessage?.data?.channel || "");
      console.log("This message belongs to channel with id - ", channel.id);
      navigation.navigate("Channel", { channelId: channel.id });
    });

    // for notification when app is in quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quite state:",
            remoteMessage
          );
          const channel = JSON.parse(remoteMessage?.data?.channel || "");

          console.log("This message belongs to channel with id - ", channel.id);

          navigation.navigate("Channel", { channelId: channel.id });
        }
      });
  }, []);

  return <ChannelList onSelect={onChannelPressed} filters={filters} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
