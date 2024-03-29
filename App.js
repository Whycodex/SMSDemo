import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as SMS from "expo-sms";

export default function App() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const checkSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      alert("SMS is available on this device");
    } else {
      alert("SMS is not available on this device");
    }
  };

  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(number, message);
    if (result === "sent") {
      alert("Message sent successfully");
    }
  };

  useEffect(() => {
    checkSMS();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo SMS demo</Text>
      <TextInput
        style={styles.numberInput}
        placeholder="Enter phone number"
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.messageInput}
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button color="black" title="Send" onPress={sendSMS}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
    padding: 16
  },
  numberInput: {
    borderWidth: 1,
    borderRadius: 4,
    width: '80%',
    padding: 10,
    marginBottom: 10
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 4,
    width: '80%',
    padding: 10,
    marginBottom: 16
  }
});
