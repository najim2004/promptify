import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

const HORIZONTAL_PADDING = 16;

const categoriesList = [
  {
    id: "1",
    name: "AI Image",
    count: "4.7K Prompts",
    colors: ["#F3A052", "#C65A11"] as const,
    iconType: "feather",
    iconName: "image",
  },
  {
    id: "2",
    name: "AI Video",
    count: "3.2K Prompts",
    colors: ["#5D54FA", "#2F26B8"] as const,
    iconType: "feather",
    iconName: "video",
  },
  {
    id: "3",
    name: "ChatGPT",
    count: "8.6K Prompts",
    colors: ["#2EC092", "#0E7C58"] as const,
    iconType: "material-community",
    iconName: "chat-processing-outline",
  },
  {
    id: "4",
    name: "Design",
    count: "2.1K Prompts",
    colors: ["#9F82FF", "#5D3CDB"] as const,
    iconType: "feather",
    iconName: "pen-tool",
  },
  {
    id: "5",
    name: "Marketing",
    count: "5.4K Prompts",
    colors: ["#EC609B", "#B72064"] as const,
    iconType: "material-community",
    iconName: "bullhorn-outline",
  },
  {
    id: "6",
    name: "Coding",
    count: "3.7K Prompts",
    colors: ["#3DCA74", "#1E6C3B"] as const,
    iconType: "feather",
    iconName: "code",
  },
  {
    id: "7",
    name: "Business",
    count: "4.1K Prompts",
    colors: ["#398EFA", "#104DA5"] as const,
    iconType: "feather",
    iconName: "bar-chart-2",
  },
  {
    id: "8",
    name: "Productivity",
    count: "3.0K Prompts",
    colors: ["#F9AC34", "#C67608"] as const,
    iconType: "material-community",
    iconName: "file-check-outline",
  },
];

export default function ExploreCategoriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.background === "#000000";
  const bgColor = isDark ? "#121214" : "#F8FAFC";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#F3F4F6";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const headerBg = isDark ? "#1E2022" : "#FFFFFF";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: headerBg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={headerBg} />

      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {/* Brand Header */}
        <View style={[styles.header, { backgroundColor: headerBg }]}>
          <View style={styles.brandArea}>
            <Image
              source={require("@/assets/promptify/logo.png")}
              style={styles.logo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
            <Text style={[styles.brandText, { color: textColor }]}>PromptNest</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.notificationBtn}
            onPress={() => router.push("/notifications" as any)}
          >
            <Feather name="bell" size={22} color={textColor} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Categories Section Title */}
        <View style={styles.titleRow}>
          <Text style={[styles.pageTitle, { color: textColor }]}>Categories</Text>
          <TouchableOpacity
            style={[
              styles.searchButton,
              {
                backgroundColor: cardBg,
                borderColor: isDark ? "#2D3035" : "#E5E7EB",
              },
            ]}
            activeOpacity={0.75}
          >
            <Feather name="search" size={20} color={isDark ? "#94A3B8" : "#374151"} />
          </TouchableOpacity>
        </View>

        {/* Scrollable list */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 84 }]}
        >
          {categoriesList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.categoryCard, { backgroundColor: cardBg, borderColor }]}
              activeOpacity={0.8}
              onPress={() => router.push("/explore/category-details" as any)}
            >
              <View style={styles.cardLeft}>
                <LinearGradient
                  colors={item.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  {item.iconType === "feather" ? (
                    <Feather name={item.iconName as any} size={20} color="#FFFFFF" />
                  ) : (
                    <MaterialCommunityIcons name={item.iconName as any} size={22} color="#FFFFFF" />
                  )}
                </LinearGradient>

                <View style={styles.textGroup}>
                  <Text style={[styles.categoryName, { color: textColor }]}>{item.name}</Text>
                  <Text style={[styles.categoryCount, { color: textSecondaryColor }]}>
                    {item.count}
                  </Text>
                </View>
              </View>

              <Feather name="chevron-right" size={20} color={isDark ? "#4B5563" : "#9CA3AF"} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  brandText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    letterSpacing: 0.1,
  },
  notificationBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 1,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#7047F8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9,
    color: "#FFFFFF",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 10,
    marginBottom: 16,
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textGroup: {
    justifyContent: "center",
  },
  categoryName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    marginBottom: 2,
  },
  categoryCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
});
