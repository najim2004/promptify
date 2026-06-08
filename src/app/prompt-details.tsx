import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "@/hooks/use-theme";
import { useVideoPlayer, VideoView } from "expo-video";

const { width } = Dimensions.get("window");

// Mock related prompts for the related feed
const RELATED_PROMPTS = [
  {
    id: "r1",
    type: "video",
    title: "Cyberpunk city at night with flying cars",
    tool: "Runway",
    duration: "0:06",
    image: require("@/assets/promptify/cyberpunk.png"),
  },
  {
    id: "r2",
    type: "video",
    title: "Futuristic sports car racing at night",
    tool: "Midjourney",
    duration: "0:07",
    image: require("@/assets/promptify/futuristic_car.png"),
  },
];

const DUMMY_VIDEO_URL =
  "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4";

export default function PromptDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const params = useLocalSearchParams();

  const isDark = theme.background === "#000000";
  const bgColor = isDark ? "#121214" : "#F8FAFC";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#E5E7EB";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;

  // Retrieve params with default fallbacks (e.g., matching the astronaut screen in the screenshot)
  const title = (params.title as string) || "Astronaut exploring a distant planet in 4K";
  const tool = (params.tool as string) || "Runway";
  const type = (params.type as string) || "video";
  const duration = (params.duration as string) || "0:08";
  
  // Choose standard high-quality assets if no image is passed
  let mediaSource = require("@/assets/promptify/astronaut.png");
  if (params.image === "@/assets/promptify/enchanted_forest.png" || params.image === "enchanted_forest.png") {
    mediaSource = require("@/assets/promptify/enchanted_forest.png");
  } else if (params.image === "@/assets/promptify/futuristic_car.png" || params.image === "futuristic_car.png") {
    mediaSource = require("@/assets/promptify/futuristic_car.png");
  } else if (params.image === "@/assets/promptify/cyberpunk.png" || params.image === "cyberpunk.png") {
    mediaSource = require("@/assets/promptify/cyberpunk.png");
  }

  // Voting state (Reddit style)
  const [voteCount, setVoteCount] = useState(342);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  // Saved / Copied / Fullscreen state tracking
  const [isSaved, setIsSaved] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  // Video player configuration
  const player = useVideoPlayer(DUMMY_VIDEO_URL, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  // The actual prompt string
  const promptText =
    "Astronaut exploring a distant planet, rocky alien landscape with mountains and canyons, twin moons in the sky, dramatic lighting, cinematic composition, realistic 4K, ultra detailed.";

  const handleUpvote = () => {
    if (userVote === "up") {
      setUserVote(null);
      setVoteCount((prev) => prev - 1);
    } else {
      setVoteCount((prev) => prev + (userVote === "down" ? 2 : 1));
      setUserVote("up");
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setUserVote(null);
      setVoteCount((prev) => prev + 1);
    } else {
      setVoteCount((prev) => prev - (userVote === "up" ? 2 : 1));
      setUserVote("down");
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(promptText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Immersive status bar setup */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Floating Header (No Background, Only Floating Circular Buttons) */}
      <View style={[styles.headerOverlay, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.circleHeaderBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleHeaderBtn} activeOpacity={0.7}>
          <Feather name="more-horizontal" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        {/* Full screen width bleed top media component */}
        <View style={styles.mediaContainer}>
          {type === "video" ? (
            <VideoView
              style={styles.mediaCover}
              player={player}
              nativeControls={false}
            />
          ) : (
            <Image source={mediaSource} style={styles.mediaCover} contentFit="cover" />
          )}
          
          {/* Top category/format tag overlay */}
          <View style={styles.mediaFormatBadge}>
            <Ionicons
              name={type === "video" ? "play" : "image"}
              size={14}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.mediaFormatText}>
              {type === "video" ? "AI Video" : "AI Image"}
            </Text>
          </View>

          {/* Full View Expand Button */}
          <TouchableOpacity
            style={styles.fullViewBtn}
            onPress={() => setIsFullView(true)}
            activeOpacity={0.8}
          >
            <Feather name="maximize-2" size={13} color="#FFFFFF" style={{ marginRight: 5 }} />
            <Text style={styles.fullViewText}>Full View</Text>
          </TouchableOpacity>

          {/* Video Duration Badge */}
          {type === "video" && (
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          )}
        </View>

        {/* Content Body */}
        <View style={styles.contentBody}>
          
          {/* Title Text */}
          <Text style={[styles.mainTitle, { color: textColor }]}>
            {title}
          </Text>

          {/* Combined Vote and Save Row (Highly Visible Right Below Title) */}
          <View style={styles.voteSaveRow}>
            {/* Reddit-style up/down voting container */}
            <View style={[styles.voteContainer, { backgroundColor: cardBg, borderColor }]}>
              <TouchableOpacity
                onPress={handleUpvote}
                activeOpacity={0.7}
                style={styles.voteBtn}
              >
                <Feather
                  name="arrow-up"
                  size={18}
                  color={userVote === "up" ? "#FF4500" : isDark ? "#94A3B8" : "#4B5563"}
                />
              </TouchableOpacity>
              
              <Text
                style={[
                  styles.voteCountText,
                  { color: textColor },
                  userVote === "up" && styles.upvotedColor,
                  userVote === "down" && styles.downvotedColor,
                ]}
              >
                {voteCount}
              </Text>

              <TouchableOpacity
                onPress={handleDownvote}
                activeOpacity={0.7}
                style={styles.voteBtn}
              >
                <Feather
                  name="arrow-down"
                  size={18}
                  color={userVote === "down" ? "#5F99FF" : isDark ? "#94A3B8" : "#4B5563"}
                />
              </TouchableOpacity>
            </View>

            {/* Save Button Next to Voting Widget */}
            <TouchableOpacity
              style={[
                styles.saveButtonCompact,
                {
                  backgroundColor: isSaved ? "#7047F8" : cardBg,
                  borderColor: isSaved ? "#7047F8" : borderColor,
                },
              ]}
              onPress={() => setIsSaved(!isSaved)}
              activeOpacity={0.75}
            >
              <Feather
                name="bookmark"
                size={16}
                color={isSaved ? "#FFFFFF" : textColor}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.saveButtonCompactText, { color: isSaved ? "#FFFFFF" : textColor }]}>
                {isSaved ? "Saved" : "Save Prompt"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tag Chips Area */}
          <View style={styles.tagChipsRow}>
            <View style={[styles.tagBadge, { backgroundColor: isDark ? "#2A1F5C" : "#ECE7FF" }]}>
              <MaterialCommunityIcons
                name="chat-processing"
                size={14}
                color="#7047F8"
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tagBadgeText, { color: "#7047F8" }]}>{tool}</Text>
            </View>

            <View style={[styles.tagBadge, { backgroundColor: isDark ? "#23242A" : "#ECEEF4" }]}>
              <Feather name="video" size={14} color={textColor} style={{ marginRight: 6 }} />
              <Text style={[styles.tagBadgeText, { color: textColor }]}>
                {type === "video" ? "AI Video" : "AI Image"}
              </Text>
            </View>

            <View style={[styles.tagBadge, { backgroundColor: isDark ? "#23242A" : "#ECEEF4" }]}>
              <Ionicons name="flame" size={14} color="#C65A11" style={{ marginRight: 6 }} />
              <Text style={[styles.tagBadgeText, { color: textColor }]}>Popular</Text>
            </View>
          </View>

          {/* Stats Segment */}
          <View style={[styles.statsPanel, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, { backgroundColor: isDark ? "#23242A" : "#F1F5F9" }]}>
                <Feather name="eye" size={16} color="#7047F8" />
              </View>
              <Text style={[styles.statValue, { color: textColor }]}>8.7K</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, { backgroundColor: isDark ? "#23242A" : "#F1F5F9" }]}>
                <Feather name="copy" size={16} color="#20B486" />
              </View>
              <Text style={[styles.statValue, { color: textColor }]}>3.2K</Text>
              <Text style={styles.statLabel}>Copied</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconCircle, { backgroundColor: isDark ? "#23242A" : "#F1F5F9" }]}>
                <Feather name="bookmark" size={16} color="#C65A11" />
              </View>
              <Text style={[styles.statValue, { color: textColor }]}>1.9K</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>

          {/* Prompt Header */}
          <View style={styles.promptHeader}>
            <Ionicons name="sparkles" size={18} color="#7047F8" />
            <Text style={[styles.promptTitle, { color: textColor }]}>Prompt</Text>
          </View>

          {/* Prompt Details Block */}
          <View style={[styles.promptBox, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.promptContentText, { color: textColor }]}>
              {promptText}
            </Text>
          </View>

          {/* Copy Action Button */}
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopy}
            activeOpacity={0.85}
          >
            <Feather name={copiedText ? "check" : "copy"} size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.copyButtonText}>
              {copiedText ? "Copied to Clipboard!" : "Copy Prompt"}
            </Text>
          </TouchableOpacity>

          {/* Related Prompts Header */}
          <View style={styles.relatedHeaderRow}>
            <Text style={[styles.relatedTitle, { color: textColor }]}>Related Video Prompts</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* Related Prompts Cards Row */}
          <View style={styles.relatedGrid}>
            {RELATED_PROMPTS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.relatedCard, { backgroundColor: cardBg, borderColor }]}
                activeOpacity={0.8}
              >
                <View style={styles.relatedCardImageBox}>
                  <Image source={item.image} style={styles.relatedCardImage} contentFit="cover" />
                  <View style={styles.relatedPlayIcon}>
                    <Ionicons name="play" size={10} color="#FFFFFF" />
                  </View>
                  <View style={styles.relatedDuration}>
                    <Text style={styles.relatedDurationText}>{item.duration}</Text>
                  </View>
                </View>
                <View style={styles.relatedCardFooter}>
                  <Text style={[styles.relatedCardTitle, { color: textColor }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.relatedCardRow}>
                    <Text style={styles.relatedCardTool}>{item.tool}</Text>
                    <Feather name="bookmark" size={14} color={textSecondaryColor} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Full View Modal Backdrop */}
      <Modal
        visible={isFullView}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setIsFullView(false)}
      >
        <View style={styles.fullScreenModal}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          
          {type === "video" ? (
            <VideoView
              style={styles.fullScreenVideo}
              player={player}
              nativeControls={true}
            />
          ) : (
            <Image source={mediaSource} style={styles.fullScreenImage} contentFit="contain" />
          )}

          <TouchableOpacity
            style={[styles.closeModalBtn, { top: Math.max(insets.top, 20) }]}
            onPress={() => setIsFullView(false)}
            activeOpacity={0.7}
          >
            <Feather name="x" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  circleHeaderBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaContainer: {
    width: width,
    height: 400,
    position: "relative",
    backgroundColor: "#000000",
  },
  mediaCover: {
    width: "100%",
    height: "100%",
  },
  mediaFormatBadge: {
    position: "absolute",
    top: Platform.OS === "ios" ? 110 : 90,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  mediaFormatText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  fullViewBtn: {
    position: "absolute",
    left: 16,
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(112, 71, 248, 0.75)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  fullViewText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#FFFFFF",
  },
  durationBadge: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  durationText: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 11,
  },
  contentBody: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  mainTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    lineHeight: 30,
    marginBottom: 16,
  },
  voteSaveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  voteBtn: {
    padding: 8,
  },
  voteCountText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    paddingHorizontal: 4,
    minWidth: 28,
    textAlign: "center",
  },
  upvotedColor: {
    color: "#FF4500",
  },
  downvotedColor: {
    color: "#5F99FF",
  },
  saveButtonCompact: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonCompactText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
  tagChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tagBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagBadgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  statsPanel: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  statValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  statLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 1,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  promptHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  promptTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginLeft: 6,
  },
  promptBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  promptContentText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  copyButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#7047F8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 34,
  },
  copyButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  relatedHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  relatedTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  viewAllText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#7047F8",
  },
  relatedGrid: {
    flexDirection: "row",
    gap: 12,
  },
  relatedCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  relatedCardImageBox: {
    height: 100,
    position: "relative",
  },
  relatedCardImage: {
    width: "100%",
    height: "100%",
  },
  relatedPlayIcon: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(112, 71, 248, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  relatedDuration: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  relatedDurationText: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 9,
  },
  relatedCardFooter: {
    padding: 10,
  },
  relatedCardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 6,
  },
  relatedCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  relatedCardTool: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: "#7047F8",
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  fullScreenVideo: {
    width: "100%",
    height: "100%",
  },
  closeModalBtn: {
    position: "absolute",
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
