import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

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
  image?: ImageSourcePropType;
  duration?: string;
};

const prompts: PromptCard[] = [
  {
    id: "1",
    type: "image",
    title: "Cinematic cyberpunk city at night with neon lights and rain reflections",
    tool: "Midjourney",
    image: require("@/assets/promptnest/cyberpunk.png"),
  },
  {
    id: "2",
    type: "video",
    title: "Astronaut exploring a distant planet in 4K",
    tool: "Runway",
    image: require("@/assets/promptnest/astronaut.png"),
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
    title: "Cozy cabin in the woods surrounded by mist and a flowing river",
    tool: "Midjourney",
    image: require("@/assets/promptnest/cabin.png"),
  },
  {
    id: "5",
    type: "video",
    title: "Cinematic portrait with neon lighting and bokeh",
    tool: "Runway",
    image: require("@/assets/promptnest/portrait.png"),
    duration: "0:06",
  },
  {
    id: "6",
    type: "code",
    title: "Python function to generate Fibonacci sequence",
    tool: "ChatGPT",
    image: require("@/assets/promptnest/code.png"),
  },
];

const categories = [
  { label: "All", icon: null },
  { label: "AI Image", icon: "image-outline" },
  { label: "AI Video", icon: "play-outline" },
  { label: "ChatGPT", icon: "sparkles-outline" },
  { label: "Design", icon: "brush-outline" },
];

export default function PromptNestHomeScreen() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const leftColumn = prompts.filter((_, index) => index % 2 === 0);
  const rightColumn = prompts.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandArea}>
            <Image
              source={require("@/assets/promptnest/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>PromptNest</Text>
          </View>

          <TouchableOpacity activeOpacity={0.75} style={styles.notificationBtn}>
            <Feather name="bell" size={22} color="#111827" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Feather name="search" size={20} color="#374151" />
          <TextInput
            placeholder="Search prompts, tools, or categories..."
            placeholderTextColor="#606879"
            style={styles.searchInput}
          />
        </View>

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
                style={[styles.chip, isActive && styles.activeChip]}
              >
                {item.icon && (
                  <Ionicons
                    name={item.icon as any}
                    size={16}
                    color={isActive ? "#FFFFFF" : "#1F2937"}
                    style={styles.chipIcon}
                  />
                )}
                <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.feedContent,
            { paddingBottom: insets.bottom + 84 },
          ]}
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

        <BottomTabBar bottomInset={insets.bottom} />
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
            <MaterialCommunityIcons
              name="message-text"
              size={12}
              color="#FFFFFF"
            />
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
              style={[
                styles.cardImage,
                isCode && styles.codeImage,
              ]}
              resizeMode="cover"
            />
          )}

          <View style={styles.mediaIcon}>
            <Ionicons
              name={item.type === "video" ? "videocam" : "image"}
              size={12}
              color="#7648F8"
            />
          </View>

          {item.type === "video" && (
            <>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={22} color="#111827" />
              </View>

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
            {item.tool === "ChatGPT" ? (
              <MaterialCommunityIcons name="chat-processing" size={16} color="#20B486" />
            ) : item.tool === "Runway" ? (
              <Text style={styles.runwayIcon}>R</Text>
            ) : (
              <Text style={styles.midjourneyIcon}>△</Text>
            )}

            <Text style={styles.toolName}>{item.tool}</Text>
          </View>

          <Feather name="bookmark" size={18} color="#4B5563" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function BottomTabBar({ bottomInset }: { bottomInset: number }) {
  const tabs = [
    { label: "Home", icon: "home", active: true },
    { label: "Search", icon: "search", active: false },
    { label: "Categories", icon: "grid", active: false },
    { label: "Saved", icon: "bookmark", active: false },
    { label: "Profile", icon: "user", active: false },
  ];

  return (
    <View style={[styles.bottomBar, { paddingBottom: Math.max(bottomInset, 12) }]}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.label} activeOpacity={0.75} style={styles.tabItem}>
          <Feather
            name={tab.icon as any}
            size={22}
            color={tab.active ? "#7047F8" : "#4B5563"}
          />
          <Text style={[styles.tabText, tab.active && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
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

  searchBox: {
    marginHorizontal: HORIZONTAL_PADDING,
    height: 48,
    borderRadius: 16,
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

  categoryRow: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
    paddingBottom: 12,
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
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -22,
    marginTop: -22,
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
    borderRadius: 8,
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

  runwayIcon: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: "#111827",
  },

  midjourneyIcon: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#111827",
  },

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
