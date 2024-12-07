import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/useUser/useUser";
import { useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postSignUp } from "../../apiMethods/apiCall/post";
import GlobalButton from "../GlobalButton/GlobalButton";
import { t } from "i18next";
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import useTheme from "../../context/useTheme/useTheme";

// Validation Schema with Yup
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpContent = () => {
  const { user, setMethodLogType, methodLogType,setUser } = useUser();
  const [lod ,setLod] = useState(false)
  const queryClient = useQueryClient()
  const { theme ,setIsEnabled,isEnabled,toggleTheme} = useTheme();
  
  const handleSignUp = async (values) => {
    const sendData = {
      email: values.email,
      password: values.password,
    };
    setLod(true);
    const send = await postSignUp(sendData);
    const S_Id = send?.res?.headers?.get('s_id');
    if (S_Id) {
        await AsyncStorage.setItem('s_id', JSON.stringify(S_Id));
    }
    if (send && send?.data?.data) {
      setUser(send?.data?.data);
      const userData = send?.data?.data;
      if (userData) {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } 
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['account'] });
      }, 100);
    }
    setLod(false); 
  };
  return (
    <View style={[styles.container,{backgroundColor:theme.bg_dark}]}>
      <View style={{display:"flex",alignItems:"center"}}>
        <WelcomeLogo />
     </View>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.white_color,
                    color: theme.dark_color, 
                    borderColor:theme.border_dark
                  },
                ]}
                placeholder="Email"
                placeholderTextColor="#aaa"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
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
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.white_color,
                    color: theme.dark_color, 
                    borderColor:theme.border_dark
                  },
                ]}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>

            <GlobalButton 
            onPress={handleSubmit} 
            loading={lod}
            title={t("Sign Up")} />

            <Text style={[styles.footerText,{color:theme.font_dark}]}>
              Already have an account ? {" "}
              <Text style={[styles.link,{color:theme.border_dark}]} onPress={() => setMethodLogType('login')}>Sign in</Text>
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
    color: "#4A4A4A",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#6C63FF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#4A4A4A",
  },
  link: {
    color: "#6C63FF",
    fontWeight: "bold",
  },
});

export default SignUpContent;
