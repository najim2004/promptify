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
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
            <Text style={styles.brandText}>PromptNest</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.notificationBtn}
            onPress={() => router.push("/notifications" as any)}
          >
            <Feather name="bell" size={22} color="#111827" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 84 }]}
        >
          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/profile/edit-profile" as any)}
              >
                <Image
                  source={require("@/assets/promptify/portrait.png")}
                  style={styles.avatar}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Ava Morgan</Text>
                <Text style={styles.userEmail}>ava.morgan@example.com</Text>
                
                <View style={styles.badgeContainer}>
                  <Feather name="star" size={12} color="#7047F8" style={styles.badgeIcon} />
                  <Text style={styles.badgeTextLabel}>Prompt Explorer</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Feather name="bookmark" size={20} color="#7047F8" />
                <Text style={styles.statNumber}>128</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
              
              <View style={styles.verticalDivider} />

              <View style={styles.statItem}>
                <Feather name="copy" size={20} color="#10B981" />
                <Text style={styles.statNumber}>342</Text>
                <Text style={styles.statLabel}>Copied</Text>
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.statItem}>
                <Feather name="eye" size={20} color="#3B82F6" />
                <Text style={styles.statNumber}>12.6K</Text>
                <Text style={styles.statLabel}>Views</Text>
              </View>
            </View>
          </View>

          {/* Menu Sections Container */}
          <View style={styles.menuContainer}>
            <MenuItem
              icon={<Feather name="user" size={20} color="#7047F8" />}
              iconBg="#EEF2FF"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => router.push("/profile/edit-profile" as any)}
            />

            <MenuItem
              icon={<Feather name="folder" size={20} color="#7047F8" />}
              iconBg="#EEF2FF"
              title="My Collections"
              subtitle="Organize your favorite prompts"
              onPress={() => {}}
            />
            
            <MenuItem
              icon={<Feather name="copy" size={18} color="#10B981" />}
              iconBg="#ECFDF5"
              title="Recently Copied"
              subtitle="View your recently copied prompts"
              onPress={() => {}}
            />

            <MenuItem
              icon={<Feather name="settings" size={18} color="#3B82F6" />}
              iconBg="#EFF6FF"
              title="Settings"
              subtitle="Customize your app experience"
              onPress={() => router.push("/profile/settings" as any)}
            />

            <MenuItem
              icon={<Feather name="help-circle" size={18} color="#F59E0B" />}
              iconBg="#FEF3C7"
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() => {}}
            />

            <MenuItem
              icon={<Feather name="info" size={18} color="#6366F1" />}
              iconBg="#EEF2FF"
              title="About PromptNest"
              subtitle="Learn more about PromptNest"
              onPress={() => {}}
              isLast
            />
          </View>

          {/* Separate Log Out Card */}
          <View style={styles.logoutContainer}>
            <MenuItem
              icon={<Feather name="log-out" size={18} color="#EF4444" />}
              iconBg="#FEF2F2"
              title="Log Out"
              subtitle="Sign out of your account"
              onPress={() => {}}
              isDestructive
              isLast
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  isDestructive?: boolean;
  isLast?: boolean;
}

function MenuItem({ icon, iconBg, title, subtitle, onPress, isDestructive = false, isLast = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.menuItem, isLast && styles.noBorder]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconWrapper, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <View style={styles.menuTextWrapper}>
          <Text style={[styles.menuTitle, isDestructive && styles.destructiveText]}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color="#9CA3AF" />
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
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: "#1E293B",
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
    padding: 16,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7047F8",
  },
  profileInfo: {
    marginLeft: 18,
    flex: 1,
  },
  userName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#0F172A",
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#64748B",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF9FF",
    borderWidth: 1,
    borderColor: "#EBE9FE",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeTextLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#7047F8",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 18,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#0F172A",
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#64748B",
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#F1F5F9",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
    marginBottom: 16,
  },
  logoutContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTextWrapper: {
    marginLeft: 16,
    flex: 1,
  },
  menuTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#0F172A",
    marginBottom: 2,
  },
  destructiveText: {
    color: "#EF4444",
  },
  menuSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#64748B",
  },
});
