import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, type ImageProps } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

const homePrompts: PromptCard[] = [
  {
    id: "1",
    type: "image",
    title: "Cinematic cyberpunk city at night with neon lights and rain reflections",
    tool: "Midjourney",
    image: require("@/assets/promptify/cyberpunk.png"),
  },
  {
    id: "2",
    type: "video",
    title: "Astronaut exploring a distant planet in 4K",
    tool: "Runway",
    image: require("@/assets/promptify/astronaut.png"),
    duration: "0:08",
  },
  {
    id: "3",
    type: "text",
    title:
      "Write a Twitter thread about the future of AI in education. Include 5 key points and end with a call to action for teachers.",
    tool: "ChatGPT",
  },
  {
    id: "4",
    type: "image",
    title: "Minimal logo design for an AI productivity app",
    tool: "DALL·E",
    image: require("@/assets/promptify/logo_design.png"),
  },
  {
    id: "5",
    type: "image",
    title: "SaaS landing page design for a productivity tool",
    tool: "DALL·E",
    image: require("@/assets/promptify/saas_design.png"),
  },
  {
    id: "6",
    type: "code",
    title: "Python function to generate Fibonacci sequence",
    tool: "ChatGPT",
    image: require("@/assets/promptify/code.png"),
  },
];

const categories = [
  { label: "All", icon: null },
  { label: "AI Image", icon: "image-outline" },
  { label: "AI Video", icon: "play-outline" },
  { label: "ChatGPT", icon: "sparkles-outline" },
  { label: "Design", icon: "brush-outline" },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  const isDark = theme.background === "#000000";
  const bgColor = isDark ? "#121214" : "#F8FAFC";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#E3E5EE";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const headerBg = isDark ? "#1E2022" : "#FFFFFF";

  const leftColumn = homePrompts.filter((_, index) => index % 2 === 0);
  const rightColumn = homePrompts.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: headerBg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={headerBg} />

      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {/* Header */}
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

        {showOfflineAlert ? (
          <NoInternetView onDismiss={() => setShowOfflineAlert(false)} />
        ) : (
          <>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: cardBg,
                  borderColor: isDark ? "#2D3035" : "#DCDDE6",
                },
              ]}
            >
              <Feather name="search" size={20} color={isDark ? "#94A3B8" : "#374151"} />
              <TextInput
                placeholder="Search prompts, tools, or categories..."
                placeholderTextColor={isDark ? "#64748B" : "#606879"}
                style={[styles.searchInput, { color: textColor }]}
              />
            </View>

            <View style={{ height: 66 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryRow}
              >
                {categories.map((item, index) => {
                  const isActive = index === 0;

                  return (
                    <TouchableOpacity
                      key={item.label}
                      activeOpacity={0.8}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isActive ? "#7047F8" : cardBg,
                          borderColor: isActive ? "#7047F8" : borderColor,
                        },
                      ]}
                    >
                      {item.icon && (
                        <Ionicons
                          name={item.icon as any}
                          size={16}
                          color={isActive ? "#FFFFFF" : isDark ? "#94A3B8" : "#1F2937"}
                          style={styles.chipIcon}
                        />
                      )}
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color: isActive ? "#FFFFFF" : isDark ? "#94A3B8" : "#1F2937",
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

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
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

function NoInternetView({ onDismiss }: { onDismiss: () => void }) {
  const theme = useTheme();
  const isDark = theme.background === "#000000";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const bgColor = isDark ? "#121214" : "#FFFFFF";

  return (
    <View style={[styles.offlineContainer, { backgroundColor: bgColor }]}>
      <Image
        source={require("@/assets/promptify/no_internet.png")}
        style={styles.offlineImage}
        contentFit="contain"
      />
      
      <Text style={[styles.offlineTitle, { color: textColor }]}>No Internet Connection</Text>
      <Text style={[styles.offlineSubtitle, { color: textSecondaryColor }]}>
        Looks like you're offline. Check your connection and try again.
      </Text>

      <TouchableOpacity style={styles.tryAgainBtn} activeOpacity={0.8} onPress={onDismiss}>
        <Ionicons name="refresh-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.tryAgainText}>Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7} onPress={onDismiss}>
        <Ionicons name="settings-outline" size={18} color="#7047F8" style={{ marginRight: 8 }} />
        <Text style={styles.settingsText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

function PromptCardItem({ item }: { item: PromptCard }) {
  const isText = item.type === "text";
  const isCode = item.type === "code";
  const theme = useTheme();

  const isDark = theme.background === "#000000";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#E3E5EE";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const textBodyBg = isDark ? "#242629" : "#FAF9FF";

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={[styles.card, { backgroundColor: cardBg, borderColor }]}
    >
      {isText ? (
        <View style={[styles.textCardBody, { backgroundColor: textBodyBg }]}>
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
            {item.tool === "ChatGPT" ? (
              <MaterialCommunityIcons name="chat-processing" size={16} color="#20B486" />
            ) : item.tool === "Runway" ? (
              <Ionicons name="infinite" size={16} color={isDark ? "#FFFFFF" : "#111827"} />
            ) : (
              <Ionicons name="boat-outline" size={16} color="#7047F8" />
            )}

            <Text
              style={[
                styles.toolName,
                item.tool === "Midjourney" && styles.midjourneyToolText,
                { color: isDark ? "#A78BFA" : "#7047F8" },
              ]}
            >
              {item.tool}
            </Text>
          </View>

          <Feather name="bookmark" size={18} color={isDark ? "#94A3B8" : "#4B5563"} />
        </View>
      </View>
    </TouchableOpacity>
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
  searchBox: {
    marginHorizontal: HORIZONTAL_PADDING,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    paddingVertical: 0,
  },
  categoryRow: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
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
    borderRadius: 12,
    borderWidth: 1,
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
    marginLeft: 6,
  },
  midjourneyToolText: {
    color: "#7047F8",
  },
  offlineContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  offlineImage: {
    width: 240,
    height: 240,
    marginBottom: 32,
  },
  offlineTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
  offlineSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  tryAgainBtn: {
    backgroundColor: "#7047F8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 26,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#7047F8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  tryAgainText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 15,
  },
  settingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  settingsText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#7047F8",
    fontSize: 15,
  },
});
