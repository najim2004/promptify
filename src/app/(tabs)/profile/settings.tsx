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
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";

const { width } = Dimensions.get("window");

export default function SettingsScreen() {
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

  // Switch states
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

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
          <Text style={[styles.pageTitle, { color: textColor }]}>Settings</Text>

          {/* Section 1: Preferences */}
          <Text style={[styles.sectionHeader, { color: textSecondaryColor }]}>PREFERENCES</Text>
          <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
            <SettingsItem
              icon={<Ionicons name="color-palette-outline" size={22} color="#7047F8" />}
              title="Appearance"
              subtitle="Light"
              onPress={() => router.push("/profile/appearance" as any)}
            />
            
            <SettingsItem
              icon={<Ionicons name="globe-outline" size={22} color="#7047F8" />}
              title="Language"
              subtitle="English"
              onPress={() => {}}
            />

            <SettingsItem
              icon={<Feather name="bell" size={20} color="#7047F8" />}
              title="Notifications"
              subtitle="Push notifications"
              rightControl={
                <ToggleSwitch
                  value={notifications}
                  onValueChange={() => setNotifications(!notifications)}
                />
              }
            />

            <SettingsItem
              icon={<Ionicons name="play-circle-outline" size={22} color="#7047F8" />}
              title="Autoplay Videos"
              subtitle="Automatically play preview videos"
              rightControl={
                <ToggleSwitch
                  value={autoplay}
                  onValueChange={() => setAutoplay(!autoplay)}
                />
              }
            />

            <SettingsItem
              icon={<Ionicons name="moon-outline" size={22} color="#7047F8" />}
              title="Reduce Motion"
              subtitle="Minimize animations"
              isLast
              rightControl={
                <ToggleSwitch
                  value={reduceMotion}
                  onValueChange={() => setReduceMotion(!reduceMotion)}
                />
              }
            />
          </View>

          {/* Section 2: Support & Legal */}
          <Text style={[styles.sectionHeader, { color: textSecondaryColor }]}>SUPPORT & LEGAL</Text>
          <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
            <SettingsItem
              icon={<Ionicons name="shield-checkmark-outline" size={22} color="#7047F8" />}
              title="Privacy Policy"
              onPress={() => {}}
            />

            <SettingsItem
              icon={<Ionicons name="document-text-outline" size={22} color="#7047F8" />}
              title="Terms of Service"
              onPress={() => {}}
            />

            <SettingsItem
              icon={<Ionicons name="trash-outline" size={20} color="#7047F8" />}
              title="Clear Cache"
              value="12.4 MB"
              onPress={() => {}}
            />

            <SettingsItem
              icon={<Ionicons name="information-circle-outline" size={22} color="#7047F8" />}
              title="App Version"
              value="1.2.0 (124)"
              isLast
            />
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.logoutBtn,
              {
                backgroundColor: isDark ? "#2A1820" : "#FAF9FF",
                borderColor: isDark ? "#4A1A22" : "#EBE9FE",
              },
            ]}
            onPress={() => {}}
          >
            <Feather name="log-out" size={18} color="#7047F8" style={styles.logoutIcon} />
            <Text style={styles.logoutBtnText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Custom Toggle Switch
function ToggleSwitch({ value, onValueChange }: { value: boolean; onValueChange: () => void }) {
  const theme = useTheme();
  const isDark = theme.background === "#000000";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onValueChange}
      style={[
        styles.switchTrack,
        value ? styles.switchTrackOn : styles.switchTrackOff,
        !value && isDark && { backgroundColor: "#334155" },
      ]}
    >
      <View style={[styles.switchThumb, value ? styles.switchThumbOn : styles.switchThumbOff]} />
    </TouchableOpacity>
  );
}

// Settings Item Component
interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  isLast?: boolean;
  rightControl?: React.ReactNode;
}

function SettingsItem({
  icon,
  title,
  subtitle,
  value,
  onPress,
  isLast = false,
  rightControl,
}: SettingsItemProps) {
  const Container = onPress ? TouchableOpacity : View;
  const theme = useTheme();
  const isDark = theme.background === "#000000";
  const borderColor = isDark ? "#2D3035" : "#F1F5F9";
  const textColor = theme.text;
  const textSecondaryColor = theme.textSecondary;

  return (
    <Container
      activeOpacity={0.7}
      style={[
        styles.itemContainer,
        { borderBottomColor: borderColor },
        isLast && styles.noBorder,
      ]}
      onPress={onPress}
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconWrapper}>{icon}</View>
        <View style={styles.textWrapper}>
          <Text style={[styles.itemTitle, { color: textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.itemSubtitle, { color: textSecondaryColor }]}>{subtitle}</Text>
          )}
        </View>
      </View>

      {rightControl ? (
        rightControl
      ) : (
        <View style={styles.itemRight}>
          {value && <Text style={[styles.valueText, { color: textSecondaryColor }]}>{value}</Text>}
          {onPress && (
            <Feather name="chevron-right" size={18} color={isDark ? "#4B5563" : "#94A3B8"} />
          )}
        </View>
      )}
    </Container>
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
    marginBottom: 24,
  },
  sectionHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    marginRight: 16,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
  },
  itemSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginTop: 2,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginRight: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#7047F8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    marginTop: 8,
    borderWidth: 1,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutBtnText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#7047F8",
    fontSize: 16,
  },
  // Custom switch styling
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  switchTrackOn: {
    backgroundColor: "#7047F8",
  },
  switchTrackOff: {
    backgroundColor: "#E2E8F0",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  switchThumbOn: {
    alignSelf: "flex-end",
  },
  switchThumbOff: {
    alignSelf: "flex-start",
  },
});
