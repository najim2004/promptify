import React from "react";
import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, type ColorValue } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} bottomInset={insets.bottom} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: ColorValue }) => <Feather name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }: { color: ColorValue }) => <Feather name="search" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }: { color: ColorValue }) => <Feather name="grid" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }: { color: ColorValue }) => <Feather name="bookmark" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: { color: ColorValue }) => <Feather name="user" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

function CustomTabBar({ state, descriptors, navigation, bottomInset }: any) {
  return (
    <View style={[styles.bottomBar, { paddingBottom: Math.max(bottomInset, 12) }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;
        const color = isFocused ? "#7047F8" : "#4B5563";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconNode = options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color, size: 22 }) : null;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.75}
            onPress={onPress}
            style={styles.tabItem}
          >
            {iconNode}
            <Text style={[styles.tabText, isFocused && styles.activeTabText]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECEEF4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#4B5563",
  },
  activeTabText: {
    color: "#7047F8",
  },
});
