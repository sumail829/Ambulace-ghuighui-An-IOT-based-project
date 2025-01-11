import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUser } from "../context/UserContext"; // Import the context

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useUser(); // Access user data from context
  const fullName = user.name || "John Doe";  // Default to "John Doe" if fullName is unavailable
  const token = user?.token;  // Access the token from the user context

  // Fetch messages from the API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://cf48-2405-acc0-1307-2b25-00-5.ngrok-free.app/api/chat/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
          }
        );
        const data = await response.json();
        console.log("Fetched messages:", data);  // Log API response for debugging
        if (data && Array.isArray(data)) {
          // Map API data to match the local state structure
          const formattedMessages = data.map((msg) => ({
            id: msg._id,
            text: msg.text,
            fullName: msg.fullName,
            sentByMe: msg.fullName === fullName, // Adjust logic to match logged-in user
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.log("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [fullName, token]); // Re-fetch messages when fullName or token changes

  // Add new message to the list and send the message to the backend
  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        fullName: fullName,
        sentByMe: true,
      };

      // Add message to local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send POST request to backend
      try {
        const response = await fetch(
          "https://cf48-2405-acc0-1307-2b25-00-5.ngrok-free.app/api/chat/message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
            body: JSON.stringify({
              fullName: fullName, // Use the actual fullName from context
              text: message, // Use the input field's value
            }),
          }
        );

        const result = await response.json();
        console.log("Message sent successfully:", result);

        // Clear input field after sending message
        setMessage("");
      } catch (error) {
        console.log("Failed to send message:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.chatWrapper}>
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageContainer,
                    item.sentByMe ? styles.myMessage : styles.theirMessage,
                  ]}
                >
                  {/* Display the full name above the message */}
                  <Text style={styles.senderName}>{item.fullName}</Text>
                  <Text
                    style={[
                      styles.messageText,
                      item.sentByMe ? styles.myMessageText : styles.theirMessageText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              )}
              contentContainerStyle={styles.chatContainer}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  chatWrapper: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: "80%",
    borderRadius: 8,
    padding: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d4f8e8",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: "#004d00",
  },
  theirMessageText: {
    color: "#333",
  },
  senderName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
