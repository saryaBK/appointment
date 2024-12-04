import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, Text } from "react-native";
import * as Notifications from "expo-notifications";
import Home from "./screens/Home";
import Welcome from "./screens/Welcome";
import Profile from "./screens/Profile";
import BranchesDetails from "./screens/BranchesDetails";
import EmployeeDetails from "./screens/EmployeeDetails";
import MyAppointments from "./screens/MyAppointments";
import { ThemeProvider } from "./context/useTheme/useTheme";
import { LanguageProvider } from "./context/useLang/useLang";
import UserContext from "./context/useUser/useUser";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      // console.log("Notification Received:", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      // console.log("Notification Clicked:", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        sound: 'notification.mp3'
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log("Expo Push Token:", token);

    return token;
  }

  if (!fontLoaded) return <Text>.</Text>;

  const Tab = createBottomTabNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BranchesDetails" component={BranchesDetails} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      </Stack.Navigator>
    );
  }


  function ProfileStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  }

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "HomeStack") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MyAppointments") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "ProfileStack") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={28} color="#8146F0" />;
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", height: 45 },
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: "Home" }} />
        <Tab.Screen name="MyAppointments" component={MyAppointments} options={{ title: "MyAppointments" }} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Profile" }} />
      </Tab.Navigator>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <UserContext>
        <ThemeProvider>
          <StatusBar style="auto" animated={true} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Main" component={BottomTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
        </UserContext>
        <Toast />
      </LanguageProvider>
    </QueryClientProvider>
  );
}



