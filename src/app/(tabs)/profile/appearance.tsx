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
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { getThemeMode, setThemeMode } from "@/hooks/use-color-scheme";

const { width } = Dimensions.get("window");

export default function AppearanceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const isDark = theme.background === "#000000";
  const bgColor = isDark ? "#121214" : "#F8FAFC";
  const cardBg = isDark ? "#1E2022" : "#FFFFFF";
  const borderColor = isDark ? "#2D3035" : "#F1F5F9";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;
  const headerBg = isDark ? "#1E2022" : "#FFFFFF";

  // Active theme state
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">(getThemeMode());

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: headerBg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={headerBg} />

      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {/* Header with Back Button */}
        <View style={[styles.header, { backgroundColor: headerBg }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.75}
            >
              <Feather name="arrow-left" size={22} color={textColor} />
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 84 }]}
        >
          {/* Page Title */}
          <Text style={[styles.pageTitle, { color: textColor }]}>Appearance</Text>
          <Text style={[styles.pageSubtitle, { color: textSecondaryColor }]}>
            Customize the look and feel of PromptNest
          </Text>

          {/* Section: Theme */}
          <Text style={[styles.sectionHeader, { color: textSecondaryColor }]}>THEME</Text>

          {/* Light Theme Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.themeCard,
              { backgroundColor: cardBg, borderColor },
              selectedTheme === "light" && styles.themeCardActive,
            ]}
            onPress={() => setSelectedTheme("light")}
          >
            <View style={styles.themePreviewContainer}>
              <View style={[styles.miniMockup, styles.miniMockupLight]}>
                <View style={styles.miniHeader}>
                  <View style={styles.miniLogo} />
                  <View style={styles.miniSearch} />
                </View>
                <View style={styles.miniBody}>
                  <View style={styles.miniLineLarge} />
                  <View style={styles.miniLineSmall} />
                </View>
                <View style={styles.miniFooter}>
                  <View style={[styles.miniDot, { backgroundColor: "#A78BFA" }]} />
                  <View style={[styles.miniDot, { backgroundColor: "#818CF8" }]} />
                  <View style={[styles.miniDot, { backgroundColor: "#FBCFE8" }]} />
                </View>
              </View>
            </View>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeTitle, { color: textColor }]}>Light</Text>
              <Text style={[styles.themeSubtitle, { color: textSecondaryColor }]}>
                Clean and bright interface
              </Text>
            </View>
            <View style={styles.radioButton}>
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: isDark ? "#4B5563" : "#CBD5E1" },
                  selectedTheme === "light" && styles.radioOuterActive,
                ]}
              >
                {selectedTheme === "light" && <View style={styles.radioInner} />}
              </View>
            </View>
          </TouchableOpacity>

          {/* Dark Theme Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.themeCard,
              { backgroundColor: cardBg, borderColor },
              selectedTheme === "dark" && styles.themeCardActive,
            ]}
            onPress={() => setSelectedTheme("dark")}
          >
            <View style={styles.themePreviewContainer}>
              <View style={[styles.miniMockup, styles.miniMockupDark]}>
                <View style={styles.miniHeader}>
                  <View style={[styles.miniLogo, { backgroundColor: "#475569" }]} />
                  <View style={[styles.miniSearch, { backgroundColor: "#334155" }]} />
                </View>
                <View style={styles.miniBody}>
                  <View style={[styles.miniLineLarge, { backgroundColor: "#334155" }]} />
                  <View style={[styles.miniLineSmall, { backgroundColor: "#334155" }]} />
                </View>
                <View style={styles.miniFooter}>
                  <View style={[styles.miniDot, { backgroundColor: "#4F46E5" }]} />
                  <View style={[styles.miniDot, { backgroundColor: "#312E81" }]} />
                  <View style={[styles.miniDot, { backgroundColor: "#831843" }]} />
                </View>
              </View>
            </View>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeTitle, { color: textColor }]}>Dark</Text>
              <Text style={[styles.themeSubtitle, { color: textSecondaryColor }]}>
                Easy on the eyes in low light
              </Text>
            </View>
            <View style={styles.radioButton}>
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: isDark ? "#4B5563" : "#CBD5E1" },
                  selectedTheme === "dark" && styles.radioOuterActive,
                ]}
              >
                {selectedTheme === "dark" && <View style={styles.radioInner} />}
              </View>
            </View>
          </TouchableOpacity>

          {/* System Default Theme Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.themeCard,
              { backgroundColor: cardBg, borderColor },
              selectedTheme === "system" && styles.themeCardActive,
            ]}
            onPress={() => setSelectedTheme("system")}
          >
            <View style={styles.themePreviewContainer}>
              <View style={[styles.miniMockup, styles.miniMockupSystem]}>
                {/* Light Side */}
                <View style={styles.systemLeftMock}>
                  <View style={styles.miniHeader}>
                    <View style={styles.miniLogo} />
                  </View>
                  <View style={styles.miniBody}>
                    <View style={styles.miniLineLarge} />
                  </View>
                  <View style={styles.miniFooter}>
                    <View style={[styles.miniDot, { backgroundColor: "#A78BFA" }]} />
                  </View>
                </View>
                {/* Dark Side */}
                <View style={styles.systemRightMock}>
                  <View style={styles.miniHeader}>
                    <View style={[styles.miniLogo, { backgroundColor: "#475569" }]} />
                  </View>
                  <View style={styles.miniBody}>
                    <View style={[styles.miniLineLarge, { backgroundColor: "#334155" }]} />
                  </View>
                  <View style={styles.miniFooter}>
                    <View style={[styles.miniDot, { backgroundColor: "#831843" }]} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeTitle, { color: textColor }]}>System Default</Text>
              <Text style={[styles.themeSubtitle, { color: textSecondaryColor }]}>
                Matches your device settings
              </Text>
            </View>
            <View style={styles.radioButton}>
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: isDark ? "#4B5563" : "#CBD5E1" },
                  selectedTheme === "system" && styles.radioOuterActive,
                ]}
              >
                {selectedTheme === "system" && <View style={styles.radioInner} />}
              </View>
            </View>
          </TouchableOpacity>

          {/* Apply Changes Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.applyBtn}
            onPress={() => {
              setThemeMode(selectedTheme);
              router.back();
            }}
          >
            <Feather name="check-circle" size={18} color="#FFFFFF" style={styles.applyBtnIcon} />
            <Text style={styles.applyBtnText}>Apply Changes</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
    marginRight: 8,
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginBottom: 24,
  },
  sectionHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  themeCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  themeCardActive: {
    borderColor: "#7047F8",
    borderWidth: 1.5,
  },
  themePreviewContainer: {
    marginRight: 16,
  },
  miniMockup: {
    width: 90,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    padding: 6,
    justifyContent: "space-between",
  },
  miniMockupLight: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
  },
  miniMockupDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  miniMockupSystem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    padding: 0,
    overflow: "hidden",
  },
  systemLeftMock: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 6,
    justifyContent: "space-between",
  },
  systemRightMock: {
    flex: 1,
    backgroundColor: "#1E293B",
    padding: 6,
    justifyContent: "space-between",
  },
  miniHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniLogo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7047F8",
    marginRight: 4,
  },
  miniSearch: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F1F5F9",
  },
  miniBody: {
    marginVertical: 4,
  },
  miniLineLarge: {
    width: "80%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    marginBottom: 2,
  },
  miniLineSmall: {
    width: "50%",
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#E2E8F0",
  },
  miniFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 3,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    marginBottom: 2,
  },
  themeSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  radioButton: {
    paddingHorizontal: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: {
    borderColor: "#7047F8",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7047F8",
  },
  applyBtn: {
    backgroundColor: "#7047F8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#7047F8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 20,
  },
  applyBtnIcon: {
    marginRight: 8,
  },
  applyBtnText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
