import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useUser } from "../../context/useUser/useUser";

const SignUpContent = () => {
  const {user,setMethodLogType,methodLogType} = useUser()
  return (
    <View style={styles.container}>
      {/* Icon/Logo */}
      <View style={styles.logoContainer}>
        {/* Replace with your logo */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6C6C6C"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6C6C6C"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#6C6C6C"
          secureTextEntry
        />
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text onPress={() => {setMethodLogType('login')}} style={styles.signInText}>Sign in</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: "#C5A5FC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 2,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6C6C6C",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#8146F0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6C6C6C",
  },
  signInText: {
    color: "#000080",
    fontWeight: "bold",
  },
});

export default SignUpContent;
