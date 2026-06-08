import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Form states
  const [fullName, setFullName] = useState("Ava Morgan");
  const [username, setUsername] = useState("avamorgan");
  const [email, setEmail] = useState("ava.morgan@example.com");
  const [bio, setBio] = useState(
    "AI enthusiast, prompt creator, and explorer of creative possibilities."
  );

  // Preferred categories state
  const [categories, setCategories] = useState([
    { id: "1", name: "AI Image", icon: "image-outline" },
    { id: "2", name: "AI Video", icon: "play-circle-outline" },
    { id: "3", name: "ChatGPT", icon: "chatbubble-ellipses-outline" },
    { id: "4", name: "Design", icon: "color-palette-outline" },
  ]);

  const handleRemoveCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* Header with Back Button */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                activeOpacity={0.75}
              >
                <Feather name="arrow-left" size={22} color="#1E293B" />
              </TouchableOpacity>

              <View style={styles.brandArea}>
                <Image
                  source={require("@/assets/promptify/logo.png")}
                  style={styles.logo}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                />
                <Text style={styles.brandText}>PromptNest</Text>
              </View>
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
            {/* Page Title */}
            <Text style={styles.pageTitle}>Edit Profile</Text>
            <Text style={styles.pageSubtitle}>Update your personal information</Text>

            {/* Large Avatar Section */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require("@/assets/promptify/portrait.png")}
                  style={styles.avatarImage}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
                <TouchableOpacity activeOpacity={0.9} style={styles.cameraOverlay}>
                  <Ionicons name="camera-outline" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Input Fields */}
            <View style={styles.formContainer}>
              {/* Full Name */}
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={18} color="#7047F8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Username */}
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.atSymbol}>@</Text>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                />
              </View>

              {/* Email Address */}
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={18} color="#7047F8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Bio */}
              <Text style={styles.inputLabel}>Bio</Text>
              <View style={styles.bioWrapper}>
                <View style={styles.bioInputRow}>
                  <Feather name="edit-3" size={18} color="#7047F8" style={styles.bioIcon} />
                  <TextInput
                    style={styles.bioInput}
                    value={bio}
                    onChangeText={(text) => {
                      if (text.length <= 150) setBio(text);
                    }}
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={4}
                  />
                </View>
                <Text style={styles.charCounter}>{bio.length}/150</Text>
              </View>
            </View>

            {/* Preferred Categories Section */}
            <Text style={styles.sectionTitle}>Preferred Categories</Text>
            <View style={styles.categoriesContainer}>
              <View style={styles.tagsContainer}>
                {categories.map((category) => (
                  <View key={category.id} style={styles.tag}>
                    <Ionicons
                      name={category.icon as any}
                      size={14}
                      color="#7047F8"
                      style={styles.tagIcon}
                    />
                    <Text style={styles.tagText}>{category.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveCategory(category.id)}
                      activeOpacity={0.7}
                      style={styles.removeTagBtn}
                    >
                      <Feather name="x" size={14} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity activeOpacity={0.7} style={styles.addTagBtn}>
                  <Feather name="plus" size={14} color="#64748B" style={styles.addTagIcon} />
                  <Text style={styles.addTagText}>Add Category</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Save Changes Button */}
            <TouchableOpacity activeOpacity={0.85} style={styles.saveBtn} onPress={() => router.back()}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
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
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: "#0F172A",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#64748B",
    marginBottom: 28,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7047F8",
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#7047F8",
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  atSymbol: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#7047F8",
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#1E293B",
    paddingVertical: 0,
  },
  bioWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
  },
  bioInputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bioIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  bioInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#1E293B",
    textAlignVertical: "top",
    paddingVertical: 0,
    minHeight: 80,
  },
  charCounter: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#94A3B8",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12,
  },
  categoriesContainer: {
    backgroundColor: "#FCFDFE",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    borderRadius: 20,
    padding: 16,
    marginBottom: 36,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3FF",
    borderWidth: 1,
    borderColor: "#EBE9FE",
    borderRadius: 12,
    paddingVertical: 6,
    paddingLeft: 10,
    paddingRight: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#0F172A",
    marginRight: 6,
  },
  removeTagBtn: {
    padding: 2,
  },
  addTagBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  addTagIcon: {
    marginRight: 6,
  },
  addTagText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#64748B",
  },
  saveBtn: {
    backgroundColor: "#7047F8",
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
  },
  saveBtnText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
