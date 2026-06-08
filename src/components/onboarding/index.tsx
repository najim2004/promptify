import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { BrandHeader } from "./brand-header";
import { DotIndicator } from "./dot-indicator";
import { GradientButton } from "./gradient-button";

const { width } = Dimensions.get("window");

type SlideItem = {
  id: string;
  image: any;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  showSkip?: boolean;
  showLogo?: boolean;
};

const slides: SlideItem[] = [
  {
    id: "1",
    image: require("@/assets/images/onboarding/onboarding-1.png"),
    showSkip: true,
    title: (
      <>
        <Text>Discover{"\n"}</Text>
        <Text style={{ color: "#7047F8" }}>Powerful</Text>
        <Text> Prompts</Text>
      </>
    ),
    description:
      "Explore high-quality prompts for AI tools\nlike Midjourney, ChatGPT, Runway and more.",
    buttonText: "Next",
  },
  {
    id: "2",
    image: require("@/assets/images/onboarding/onboarding-2.png"),
    title: <>Save & Copy{"\n"}Instantly</>,
    description: "Save your favorite prompts and\ncopy them anytime you need.",
    buttonText: "Next",
  },
  {
    id: "3",
    image: require("@/assets/images/onboarding/onboarding-3.png"),
    showLogo: true,
    title: <>Learn From{"\n"}Real Examples</>,
    description:
      "View example outputs, usage\ntips, and create better results.",
    buttonText: "Get Started",
  },
];

type Props = {
  onFinish?: () => void;
};

export default function OnboardingScreen({ onFinish }: Props) {
  const flatListRef = useRef<FlatList<SlideItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      onFinish?.();
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true,
    });
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const theme = useTheme();
  const isDark = theme.background === "#000000";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={theme.background} />

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item, index }) => (
          <View style={[styles.slide, { backgroundColor: theme.background }]}>
            <BrandHeader
              showLogo={item.showLogo}
              showSkip={item.showSkip}
              onSkip={handleSkip}
            />

            <View
              style={[
                styles.imageWrap,
                index === 0 && styles.firstImageWrap,
                index === 1 && styles.secondImageWrap,
                index === 2 && styles.thirdImageWrap,
              ]}
            >
              <Image
                source={item.image}
                style={styles.illustration}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            </View>

            <View style={styles.textContent}>
              <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.description, { color: theme.textSecondary }]}>{item.description}</Text>
            </View>

            <View style={styles.bottomArea}>
              <DotIndicator count={slides.length} activeIndex={activeIndex} />
              <GradientButton text={item.buttonText} onPress={handleNext} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slide: {
    width,
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
  },
  imageWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  firstImageWrap: {
    marginTop: 42,
    height: 350,
  },
  secondImageWrap: {
    marginTop: 58,
    height: 380,
  },
  thirdImageWrap: {
    marginTop: 46,
    height: 360,
  },
  illustration: {
    width: width * 0.82,
    height: "100%",
  },
  textContent: {
    alignItems: "center",
    marginTop: 14,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    lineHeight: 45,
    textAlign: "center",
    color: "#111622",
    letterSpacing: 0.2,
  },
  description: {
    marginTop: 18,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    lineHeight: 32,
    textAlign: "center",
    color: "#596071",
    letterSpacing: 0.2,
  },
  bottomArea: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 34,
  },
});
