import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const { setUserId } = useContext(AuthContext);

  const { client } = useChatContext();

  const connectUser = async (username: string, fullName: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullName,
        // image: "https://i.imgur.com/fR9Jz14.png",
      },
      client.devToken(username)
    );

    // // create a channel
    // const channel = client.channel("messaging", "notjustdev", {
    //   name: "notJust.dev",
    // });
    // await channel.create();

    setUserId(username);
  };

  const signUp = () => {
    // sign the user with your backend

    connectUser(username, fullName);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
          style={styles.input}
        />
      </View>

      <Pressable onPress={signUp} style={styles.button}>
        <Text>Sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
  },
  input: {},
  button: {
    backgroundColor: "#256CFF",
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SignupScreen;
