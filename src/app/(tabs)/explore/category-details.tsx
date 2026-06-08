import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, type ImageProps } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

const { width } = Dimensions.get("window");

const HORIZONTAL_PADDING = 16;
const COLUMN_GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

type PromptCardType = "image" | "video" | "text" | "code";

type PromptCard = {
  id: string;
  type: PromptCardType;
  title: string;
  tool: "Midjourney" | "Runway" | "ChatGPT" | "DALL·E";
  image?: ImageProps["source"];
  duration?: string;
};

const categoryPrompts: PromptCard[] = [
  {
    id: "1",
    type: "image",
    title: "Enchanted forest with ancient trees, magical light, and a hidden castle",
    tool: "Midjourney",
    image: require("@/assets/promptify/enchanted_forest.png"),
  },
  {
    id: "2",
    type: "image",
    title: "Astronaut exploring a distant planet, cinematic sci-fi landscape",
    tool: "Runway",
    image: require("@/assets/promptify/astronaut.png"),
  },
  {
    id: "3",
    type: "image",
    title: "Futuristic sports car racing through a neon city at night",
    tool: "Midjourney",
    image: require("@/assets/promptify/futuristic_car.png"),
  },
  {
    id: "4",
    type: "image",
    title: "Cinematic portrait of a woman with neon lighting and bokeh background",
    tool: "DALL·E",
    image: require("@/assets/promptify/portrait.png"),
  },
  {
    id: "5",
    type: "image",
    title: "Cozy cabin in the woods surrounded by mist and a flowing river",
    tool: "Midjourney",
    image: require("@/assets/promptify/cabin.png"),
  },
  {
    id: "6",
    type: "image",
    title: "Cinematic cyberpunk city at night with neon lights and rain reflections",
    tool: "Midjourney",
    image: require("@/assets/promptify/cyberpunk.png"),
  },
];

const filterChips = [
  { label: "Latest", icon: "clock" },
  { label: "Popular", icon: "flame" },
  { label: "Most Copied", icon: "copy" },
  { label: "Filter", icon: "sliders" },
];

export default function CategoryDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.background === "#000000";
  const bgColor = isDark ? "#121214" : "#F8FAFC";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#E5E7EB";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const headerBg = isDark ? "#1E2022" : "#FFFFFF";

  const [activeFilter, setActiveFilter] = useState("Latest");

  const leftColumn = categoryPrompts.filter((_, index) => index % 2 === 0);
  const rightColumn = categoryPrompts.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: headerBg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={headerBg} />

      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: headerBg }]}>
          <TouchableOpacity
            style={[styles.backButton, { borderColor, backgroundColor: cardBg }]}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Feather name="arrow-left" size={20} color={textColor} />
          </TouchableOpacity>

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

        {/* Category Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={["#F3A052", "#C65A11"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Feather name="image" size={26} color="#FFFFFF" />
          </LinearGradient>

          <View style={styles.bannerTextContainer}>
            <Text style={[styles.bannerTitle, { color: textColor }]}>AI Image</Text>
            <Text style={[styles.bannerDescription, { color: textSecondaryColor }]}>
              Explore high-quality image generation prompts
            </Text>
            <Text style={[styles.bannerCount, { color: textSecondaryColor }]}>4.7K Prompts</Text>
          </View>
        </View>

        {/* Filter Chips */}
        <View style={{ height: 62 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {filterChips.map((item) => {
              const isActive = activeFilter === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.8}
                  style={[
                    styles.chip,
                    { backgroundColor: cardBg, borderColor },
                    isActive && styles.activeChip
                  ]}
                  onPress={() => setActiveFilter(item.label)}
                >
                  <Feather
                    name={item.icon as any}
                    size={15}
                    color={isActive ? "#FFFFFF" : isDark ? "#94A3B8" : "#1F2937"}
                    style={styles.chipIcon}
                  />
                  <Text style={[
                    styles.chipText,
                    { color: isDark ? "#94A3B8" : "#1F2937" },
                    isActive && styles.activeChipText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Feed Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.feedContent, { paddingBottom: insets.bottom + 84 }]}
        >
          <View style={styles.grid}>
            <View style={styles.column}>
              {leftColumn.map((item) => (
                <PromptCardItem key={item.id} item={item} />
              ))}
            </View>

            <View style={styles.column}>
              {rightColumn.map((item) => (
                <PromptCardItem key={item.id} item={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function PromptCardItem({ item }: { item: PromptCard }) {
  const theme = useTheme();
  const isDark = theme.background === "#000000";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#E5E7EB";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;

  const isText = item.type === "text";
  const isCode = item.type === "code";

  return (
    <TouchableOpacity activeOpacity={0.86} style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
      {isText ? (
        <View style={[styles.textCardBody, { backgroundColor: isDark ? "#25262B" : "#FAF9FF" }]}>
          <View style={styles.smallPurpleIcon}>
            <MaterialCommunityIcons name="message-text" size={14} color="#FFFFFF" />
          </View>

          <Text style={[styles.textPromptTitle, { color: textColor }]} numberOfLines={6}>
            {item.title}
          </Text>
        </View>
      ) : (
        <View style={styles.imageBox}>
          {item.image && (
            <Image
              source={item.image}
              style={[styles.cardImage, isCode && styles.codeImage]}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          )}

          <View style={styles.mediaIcon}>
            <Ionicons
              name={item.type === "video" ? "play" : isCode ? "code-slash" : "image"}
              size={12}
              color="#FFFFFF"
            />
          </View>

          {item.type === "video" && (
            <>
              {item.duration && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              )}
            </>
          )}
        </View>
      )}

      <View style={styles.cardFooter}>
        {!isText && (
          <Text style={[styles.cardTitle, { color: textColor }]} numberOfLines={2}>
            {item.title}
          </Text>
        )}

        <View style={styles.toolRow}>
          <View style={styles.toolInfo}>
            {item.tool === "ChatGPT" || item.tool === "DALL·E" ? (
              <MaterialCommunityIcons
                name="chat-processing"
                size={16}
                color={item.tool === "ChatGPT" ? "#20B486" : "#7047F8"}
              />
            ) : item.tool === "Runway" ? (
              <Ionicons name="infinite" size={16} color={textColor} />
            ) : (
              <Ionicons name="boat-outline" size={16} color="#7047F8" />
            )}

            <Text
              style={[
                styles.toolName,
                (item.tool === "Midjourney" || item.tool === "DALL·E") && styles.purpleToolText,
              ]}
            >
              {item.tool}
            </Text>
          </View>

          <Feather name="bookmark" size={18} color={textSecondaryColor} />
        </View>
      </View>
    </TouchableOpacity>
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
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 12,
    marginBottom: 16,
  },
  iconGradient: {
    width: 68,
    height: 68,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#111827",
    marginBottom: 2,
  },
  bannerDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    lineHeight: 16,
  },
  bannerCount: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
  },
  categoryRow: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 4,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E0E2EA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: "#7047F8",
    borderColor: "#7047F8",
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#1F2937",
  },
  activeChipText: {
    color: "#FFFFFF",
  },
  feedContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  grid: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  column: {
    width: CARD_WIDTH,
    marginRight: COLUMN_GAP,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E5EE",
    marginBottom: 12,
    overflow: "hidden",
  },
  imageBox: {
    width: "100%",
    height: 130,
    backgroundColor: "#F4F5FA",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  codeImage: {
    backgroundColor: "#111827",
  },
  mediaIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#7047F8",
    alignItems: "center",
    justifyContent: "center",
  },
  durationBadge: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "#111111",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 11,
  },
  textCardBody: {
    minHeight: 180,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#FAF9FF",
  },
  smallPurpleIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#7047F8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  textPromptTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
    color: "#111827",
  },
  cardFooter: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
    color: "#111827",
    marginBottom: 8,
  },
  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toolInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  toolName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#7047F8",
    marginLeft: 6,
  },
  purpleToolText: {
    color: "#7047F8",
  },
});
