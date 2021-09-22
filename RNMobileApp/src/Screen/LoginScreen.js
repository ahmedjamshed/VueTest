import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import FirebaseUtils from "../Utils/FirebaseUtils";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //SignUp or SignIn

  const [create, setCreate] = useState(false);

  const SignUp = () => {
    if (email && password) {
      FirebaseUtils.signUp(email, password).catch((e) => {
        console.log(e.message);
        alert("Something Went Wrong");
      });
    } else {
      alert("Fill The Fields");
    }
  };
  const SignIn = () => {
    if (email && password) {
      FirebaseUtils.signIn(email, password).catch((e) => {
        console.log(e.message);
        alert("Email/Password is Wrong");
      });
    } else {
      alert("Fill The Fields");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        {create ? (
          <Text style={styles.mainheading}>Sign Up</Text>
        ) : (
          <Text style={styles.mainheading}>Log In</Text>
        )}
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          style={styles.InputText}
          value={email}
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          style={styles.InputText}
          value={password}
          secureTextEntry={true}
        />

        {create ? (
          <>
            <TouchableOpacity style={styles.button} onPress={() => SignUp()}>
              <Text style={styles.buttontext}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.QATextContainer}>
              <Text style={styles.QAText} onPress={() => setCreate(false)}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => SignIn()}>
              <Text style={styles.buttontext}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.QATextContainer}>
              <Text style={styles.QAText} onPress={() => setCreate(true)}>
                {"Don't have an account?"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 30 : 20,
    backgroundColor: "#fff",
    padding: 30,
    justifyContent: "center",
  },
  InputText: {
    backgroundColor: "#e2e2e2",
    paddingHorizontal: Platform.OS === "ios" ? 13 : 10,
    paddingVertical: Platform.OS === "ios" ? 18 : 15,
    marginBottom: 10,
    borderRadius: 10,
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    color: "#F05A22",
    fontWeight: "500",
    fontSize: 16,
  },
  mainheading: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: Platform.OS === "ios" ? 13 : 10,
    paddingVertical: Platform.OS === "ios" ? 15 : 13,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "600",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttontext: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  QATextContainer: {
    alignItems: "center",
  },
  QAText: {
    borderColor: "black",
    borderBottomWidth: 1,
    fontSize: Platform.OS === "ios" ? 16 : 16,
    fontWeight: "500",
  },
});
