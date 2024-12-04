import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/useUser/useUser";
import { useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postLogIn } from "../../apiMethods/apiCall/post";
import GlobalButton from "../GlobalButton/GlobalButton";
import { t } from "i18next";

const SignInContent = () => {
  const [lod, setLod] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en"); // الحالة لتتبع اللغة المختارة
  const { user, setMethodLogType, methodLogType, setUser } = useUser();
  const queryClient = useQueryClient();

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignIn = async (values) => {
    const sendData = {
      username: 'blaloalbkre@gmail.com',
      password: '123robin123',
    };
    // const sendData = {
    //   username: values.email,
    //   password: values.password,
    // };
    setLod(true);
    const send = await postLogIn(sendData);
    const S_Id = send?.res?.headers?.get("s_id");
    if (S_Id) {
      await AsyncStorage.setItem("s_id", JSON.stringify(S_Id));
    }
    if (send && send?.data?.data) {
      setUser(send?.data?.data);
      const userData = send?.data?.data;
      if (userData) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      }
    }
    setLod(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        // validationSchema={SignInSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <View style={styles.langSwitch}>
              <TouchableOpacity
                style={[
                  styles.langButton,
                  { backgroundColor: currentLanguage === "ar" ? "#3f51b5" : "#e5e5e5" },
                ]}
                onPress={() => setCurrentLanguage("ar")}
              >
                <Text
                  style={[
                    styles.langText,
                    { color: currentLanguage === "ar" ? "#fff" : "#000" },
                  ]}
                >
                  Arabic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.langButton,
                  { backgroundColor: currentLanguage === "en" ? "#3f51b5" : "#e5e5e5" },
                ]}
                onPress={() => setCurrentLanguage("en")}
              >
                <Text
                  style={[
                    styles.langText,
                    { color: currentLanguage === "en" ? "#fff" : "#000" },
                  ]}
                >
                  English
                </Text>
              </TouchableOpacity>
            </View>

            <GlobalButton onPress={handleSubmit} loading={lod} title={t("Sign In")} />

            {/* Sign Up Link */}
            <Text style={styles.signupText}>
              Don’t have an account?{" "}
              <Text style={styles.signupLink} onPress={() => setMethodLogType("signUp")}>
                Sign up
              </Text>
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  langSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  langButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  langText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    marginTop: 20,
  },
  signupLink: {
    color: "#6200ea",
    fontWeight: "bold",
  },
});

export default SignInContent;
