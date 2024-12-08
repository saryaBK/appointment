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
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import useTheme from "../../context/useTheme/useTheme";
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import { useLanguage } from "../../context/useLang/useLang";

const SignInContent = () => {
  const [lod, setLod] = useState(false);
  const { setMethodLogType} = useUser();
  const { lang, switchLang } = useLanguage();
  const queryClient = useQueryClient();
  const { theme } = useTheme();

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignIn = async (values) => {
    const sendData = {
      username: values.email,
      password: values.password,
    };
    setLod(true);
    const send = await postLogIn(sendData);
    const S_Id = send?.res?.headers?.get("s_id");
    if (S_Id) {
      await AsyncStorage.setItem("s_id", S_Id);
    }
    // if (send.data.meta.token) {
    //   await AsyncStorage.setItem("jwt", send.data.meta.token);
    // }
    if (send && send?.data?.data) {
      const userData = send?.data?.data;
      if (userData) {
        setTimeout(() => {
          queryClient.invalidateQueries({queryKey:['account']})
      }, 100);
      }
    }
    setLod(false);
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.bg_dark}]}>
     <View style={{display:"flex",alignItems:"center"}}>
     <WelcomeLogo />
     </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              // style={styles.input}
              style={[
                styles.input,
                { 
                  backgroundColor: theme.white_color,
                  color: theme.dark_color, 
                  borderColor:theme.border_dark
                },
              ]}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: theme.white_color,
                  color: theme.dark_color,
                  borderColor:theme.border_dark
                },
              ]}
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
                  { backgroundColor: lang === "ar" ? "#3f51b5" : "#e5e5e5" },
                ]}
                onPress={() => switchLang("ar")}
              >
                <Text
                  style={[
                    styles.langText,
                    { color: lang === "ar" ? "#fff" : "#000" },
                  ]}
                >
                  Arabic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.langButton,
                  { backgroundColor: lang === "en" ? "#3f51b5" : "#e5e5e5" ,
                  },
                ]}
                onPress={() => switchLang("en")}
              >
                <Text
                  style={[
                    styles.langText,
                    { color: lang === "en" ? "#fff" : "#000" },
                  ]}
                >
                  English
                </Text>
              </TouchableOpacity>
            </View>

            <GlobalButton onPress={handleSubmit} loading={lod} title={t("Sign In")} />

            {/* Sign Up Link */}
            <Text style={[styles.signupText,{color:theme.font_dark}]}>
              Don’t have an account ? {" "}
              <Text style={[styles.signupLink,{color:theme.border_dark}]} onPress={() => setMethodLogType("signUp")}>
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
    justifyContent: "center",
    padding: 20,
    gap:20
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
    fontWeight: "bold",
  },
});

export default SignInContent;
