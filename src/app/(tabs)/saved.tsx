import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, type ImageProps } from "expo-image";
import React from "react";
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

const savedPrompts: PromptCard[] = [
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

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const leftColumn = savedPrompts.filter((_, index) => index % 2 === 0);
  const rightColumn = savedPrompts.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        {/* Brand Header */}
        <View style={styles.header}>
          <View style={styles.brandArea}>
            <Image
              source={require("@/assets/promptify/logo.png")}
              style={styles.logo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
            <Text style={styles.brandText}>Promptify</Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Title area */}
        <View style={styles.titleArea}>
          <Text style={styles.pageTitle}>Saved Prompts</Text>
          <Text style={styles.pageSubtitle}>Your saved prompts, ready when you are.</Text>
        </View>

        {/* Prompts Feed */}
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
  const isText = item.type === "text";
  const isCode = item.type === "code";

  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card}>
      {isText ? (
        <View style={styles.textCardBody}>
          <View style={styles.smallPurpleIcon}>
            <MaterialCommunityIcons name="message-text" size={14} color="#FFFFFF" />
          </View>

          <Text style={styles.textPromptTitle} numberOfLines={6}>
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
          <Text style={styles.cardTitle} numberOfLines={2}>
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
              <Ionicons name="infinite" size={16} color="#111827" />
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

          <Feather name="bookmark" size={18} color="#7047F8" />
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
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#7047F8",
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
