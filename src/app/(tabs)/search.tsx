import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, type ImageProps } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
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
  tool: "Midjourney" | "Runway" | "ChatGPT";
  image?: ImageProps["source"];
  duration?: string;
};

const searchPrompts: PromptCard[] = [
  {
    id: "1",
    type: "image",
    title: "Cinematic cyberpunk city at night with neon lights and rain reflections",
    tool: "Midjourney",
    image: require("@/assets/promptify/cyberpunk.png"),
  },
  {
    id: "2",
    type: "image",
    title: "Cyberpunk girl portrait with neon lights and futuristic makeup",
    tool: "Runway",
    image: require("@/assets/promptify/portrait.png"),
  },
  {
    id: "3",
    type: "text",
    title:
      "Write a short story set in a cyberpunk future where AI controls the city and hackers fight for freedom.",
    tool: "ChatGPT",
  },
  {
    id: "4",
    type: "video",
    title: "Cinematic cyberpunk bike chase through neon city at night",
    tool: "Runway",
    image: require("@/assets/promptify/bike_chase.png"),
    duration: "0:08",
  },
  {
    id: "5",
    type: "image",
    title: "Cyberpunk street scene with neon signs and wet reflections",
    tool: "Midjourney",
    image: require("@/assets/promptify/street_scene.png"),
  },
  {
    id: "6",
    type: "code",
    title: "Python function to generate a cyberpunk scene with neon lighting",
    tool: "ChatGPT",
    image: require("@/assets/promptify/code_cyberpunk.png"),
  },
];

const categories = [
  { label: "All", icon: null },
  { label: "AI Image", icon: "image-outline" },
  { label: "AI Video", icon: "play-outline" },
  { label: "ChatGPT", icon: "sparkles-outline" },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.background === "#000000";
  const bgColor = isDark ? "#121214" : "#F8FAFC";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#E3E5EE";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const headerBg = isDark ? "#1E2022" : "#FFFFFF";

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter selection states
  const [selectedCategory, setSelectedCategory] = useState("AI");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState("Image");
  const [selectedSort, setSelectedSort] = useState("Latest");

  const leftColumn = searchPrompts.filter((_, index) => index % 2 === 0);
  const rightColumn = searchPrompts.filter((_, index) => index % 2 !== 0);

  const resetFilters = () => {
    setSelectedCategory("AI");
    setSelectedTool(null);
    setSelectedMediaType("Image");
    setSelectedSort("Latest");
  };

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

        <View style={styles.searchRow}>
          <View style={[styles.searchBoxCustom, { backgroundColor: cardBg, borderColor }]}>
            <Feather name="search" size={20} color={isDark ? "#94A3B8" : "#374151"} />
            <TextInput
              defaultValue="cyberpunk"
              placeholder="Search prompts, tools, or categories..."
              placeholderTextColor={isDark ? "#64748B" : "#606879"}
              style={[styles.searchInput, { color: textColor }]}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: cardBg, borderColor }]}
            activeOpacity={0.75}
            onPress={() => setIsFilterVisible(true)}
          >
            <Feather name="sliders" size={20} color={isDark ? "#94A3B8" : "#374151"} />
          </TouchableOpacity>
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
                      { color: isActive ? "#FFFFFF" : isDark ? "#94A3B8" : "#1F2937" },
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

        {/* Filter Modal */}
        <Modal
          visible={isFilterVisible}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={() => setIsFilterVisible(false)}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => setIsFilterVisible(false)}
                activeOpacity={0.75}
              >
                <Feather name="arrow-left" size={22} color="#111827" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={resetFilters} activeOpacity={0.7} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalContent}>
              
              {/* Category Section */}
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBg}>
                  <Feather name="grid" size={16} color="#7047F8" />
                </View>
                <Text style={styles.sectionHeading}>Category</Text>
              </View>
              <View style={styles.filterOptionsRow}>
                {["AI", "AI Image", "AI Video", "ChatGPT"].map((cat) => {
                  const isActive = selectedCategory === cat;
                  const icon = cat === "AI" ? "sparkles" : cat === "AI Image" ? "image" : cat === "AI Video" ? "play" : "message-square";
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.filterChip, isActive && styles.activeFilterChip]}
                      onPress={() => setSelectedCategory(cat)}
                    >
                      <Feather name={icon as any} size={15} color={isActive ? "#7047F8" : "#4B5563"} style={styles.filterChipIcon} />
                      <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>{cat}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* AI Tool Section */}
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBg}>
                  <Feather name="briefcase" size={16} color="#7047F8" />
                </View>
                <Text style={styles.sectionHeading}>AI Tool</Text>
              </View>
              <View style={styles.filterOptionsGrid}>
                {[
                  { name: "Midjourney", icon: "boat-outline", type: "ionicons" },
                  { name: "DALL·E", icon: "chat-processing-outline", type: "material" },
                  { name: "Runway", icon: "infinite", type: "ionicons" },
                  { name: "ChatGPT", icon: "chat-processing-outline", type: "material" },
                ].map((tool) => {
                  const isActive = selectedTool === tool.name;
                  return (
                    <TouchableOpacity
                      key={tool.name}
                      style={[styles.filterChip, isActive && styles.activeFilterChip]}
                      onPress={() => setSelectedTool(isActive ? null : tool.name)}
                    >
                      {tool.type === "ionicons" ? (
                        <Ionicons name={tool.icon as any} size={15} color={isActive ? "#7047F8" : "#4B5563"} style={styles.filterChipIcon} />
                      ) : (
                        <MaterialCommunityIcons name={tool.icon as any} size={15} color={isActive ? "#7047F8" : "#4B5563"} style={styles.filterChipIcon} />
                      )}
                      <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>{tool.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Media Type Section */}
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBg}>
                  <Feather name="folder" size={16} color="#7047F8" />
                </View>
                <Text style={styles.sectionHeading}>Media Type</Text>
              </View>
              <View style={styles.filterOptionsRow}>
                {[
                  { name: "Image", icon: "image" },
                  { name: "Video", icon: "play-circle" },
                  { name: "Text", icon: "align-left" },
                ].map((media) => {
                  const isActive = selectedMediaType === media.name;
                  return (
                    <TouchableOpacity
                      key={media.name}
                      style={[styles.filterChip, isActive && styles.activeFilterChip]}
                      onPress={() => setSelectedMediaType(media.name)}
                    >
                      <Feather name={media.icon as any} size={15} color={isActive ? "#7047F8" : "#4B5563"} style={styles.filterChipIcon} />
                      <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>{media.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Sort By Section */}
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBg}>
                  <MaterialCommunityIcons name="swap-vertical" size={16} color="#7047F8" />
                </View>
                <Text style={styles.sectionHeading}>Sort By</Text>
              </View>
              <View style={styles.filterOptionsGrid}>
                {[
                  { name: "Latest", icon: "clock" },
                  { name: "Most Popular", icon: "flame" },
                  { name: "Most Copied", icon: "copy" },
                  { name: "Most Saved", icon: "bookmark" },
                ].map((sort) => {
                  const isActive = selectedSort === sort.name;
                  return (
                    <TouchableOpacity
                      key={sort.name}
                      style={[styles.filterChip, isActive && styles.activeFilterChip]}
                      onPress={() => setSelectedSort(sort.name)}
                    >
                      <Feather name={sort.icon as any} size={15} color={isActive ? "#7047F8" : "#4B5563"} style={styles.filterChipIcon} />
                      <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>{sort.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Apply Filters Button */}
              <TouchableOpacity
                style={styles.applyButton}
                activeOpacity={0.88}
                onPress={() => setIsFilterVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

function PromptCardItem({ item }: { item: PromptCard }) {
  const router = useRouter();
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
      onPress={() => {
        router.push({
          pathname: "/prompt-details",
          params: {
            id: item.id,
            title: item.title,
            tool: item.tool,
            type: item.type,
            duration: item.duration || "",
            image: typeof item.image === "string" ? item.image : ""
          }
        });
      }}
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: HORIZONTAL_PADDING,
    gap: 10,
  },
  searchBoxCustom: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#DCDDE6",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#DCDDE6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
  midjourneyToolText: {
    color: "#7047F8",
  },

  /* Modal Styles */
  modalSafeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF4",
  },
  modalBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E2EA",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#111827",
  },
  resetButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resetButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#7047F8",
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionHeading: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#111827",
  },
  filterOptionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 32,
  },
  filterOptionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 32,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#E0E2EA",
    backgroundColor: "#FFFFFF",
  },
  activeFilterChip: {
    borderColor: "#7047F8",
    backgroundColor: "#F5F3FF",
  },
  filterChipIcon: {
    marginRight: 6,
  },
  filterChipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#4B5563",
  },
  activeFilterChipText: {
    color: "#7047F8",
  },
  applyButton: {
    backgroundColor: "#7047F8",
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  applyButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
