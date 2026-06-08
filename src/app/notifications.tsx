import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, type ImageProps } from "expo-image";
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

const HORIZONTAL_PADDING = 16;

type NotificationItem = {
  id: string;
  type: "trend" | "category" | "image" | "idea" | "code";
  title: string;
  description: string;
  linkText?: string;
  time: string;
  isUnread: boolean;
  image?: ImageProps["source"];
  gradientColors?: readonly [string, string, ...string[]];
  iconName?: string;
};

const notificationsList: NotificationItem[] = [
  {
    id: "1",
    type: "trend",
    title: "New trending prompts are live 🔥",
    description: "Check out the latest trending prompts across AI Image, Video, and more.",
    linkText: "Explore now →",
    time: "2m",
    isUnread: true,
    gradientColors: ["#9F82FF", "#5D3CDB"] as const,
    iconName: "trending-up",
  },
  {
    id: "2",
    type: "category",
    title: "Your saved category has new prompts",
    description: "We added 12 new prompts to your saved \"Marketing\" category.",
    time: "1h",
    isUnread: true,
    gradientColors: ["#2EC092", "#0E7C58"] as const,
    iconName: "bookmark",
  },
  {
    id: "3",
    type: "image",
    title: "Editor's pick: Cyberpunk prompts ✦",
    description: "Explore handpicked cyberpunk prompts perfect for stunning AI art and videos.",
    linkText: "View collection →",
    time: "3h",
    isUnread: true,
    image: require("@/assets/promptify/cyberpunk.png"),
  },
  {
    id: "4",
    type: "idea",
    title: "Weekly inspiration is ready ✨",
    description: "Discover fresh ideas and prompts to fuel your creativity this week.",
    linkText: "Get inspired →",
    time: "Yesterday",
    isUnread: true,
    gradientColors: ["#EBE8FF", "#D7D0FF"] as const, // Light purple
    iconName: "lightbulb",
  },
  {
    id: "5",
    type: "code",
    title: "New prompt format: Code </>",
    description: "Use structured code prompts to get more accurate and powerful AI outputs.",
    linkText: "Try it out →",
    time: "2d",
    isUnread: true,
    image: require("@/assets/promptify/code.png"),
  },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        {/* Brand Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Feather name="arrow-left" size={20} color="#111827" />
          </TouchableOpacity>

          <View style={styles.brandArea}>
            <Image
              source={require("@/assets/promptify/logo.png")}
              style={styles.logo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
            <Text style={styles.brandText}>Promptify</Text>
          </View>

          <TouchableOpacity activeOpacity={0.75} style={styles.notificationBtn}>
            <Feather name="bell" size={22} color="#111827" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Title area */}
        <View style={styles.titleArea}>
          <Text style={styles.pageTitle}>Notifications</Text>
          <Text style={styles.pageSubtitle}>Stay updated with the latest from Promptify.</Text>
        </View>

        {/* List of notifications */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        >
          {notificationsList.map((item) => (
            <View key={item.id} style={styles.notificationCard}>
              {/* Left Side Icon/Image */}
              {item.image ? (
                <Image source={item.image} style={styles.cardImage} contentFit="cover" />
              ) : item.gradientColors ? (
                <LinearGradient
                  colors={item.gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Feather
                    name={item.iconName as any}
                    size={20}
                    color={item.type === "idea" ? "#7047F8" : "#FFFFFF"}
                  />
                </LinearGradient>
              ) : null}

              {/* Right Side Content */}
              <View style={styles.cardRight}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardTime}>{item.time}</Text>
                </View>

                <Text style={styles.cardDescription}>{item.description}</Text>

                {item.linkText && (
                  <TouchableOpacity activeOpacity={0.7} style={styles.linkButton}>
                    <Text style={styles.linkText}>{item.linkText}</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Unread Dot Indicator */}
              {item.isUnread && <View style={styles.unreadDot} />}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
    color: "#111827",
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
  titleArea: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 10,
    marginBottom: 20,
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: "#111827",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 12,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 16,
    position: "relative",
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  cardImage: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 16,
  },
  iconGradient: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardRight: {
    flex: 1,
    paddingRight: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#111827",
    flex: 1,
    paddingRight: 8,
    lineHeight: 18,
  },
  cardTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  cardDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
    marginBottom: 8,
  },
  linkButton: {
    alignSelf: "flex-start",
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#7047F8",
  },
  unreadDot: {
    position: "absolute",
    right: 16,
    bottom: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7047F8",
  },
});
