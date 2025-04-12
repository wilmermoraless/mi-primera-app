import { Image, StyleSheet, Platform, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Gallery from "react-native-awesome-gallery";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const images = ["https://image1", "https://image2"];

export default function HomeScreen() {
  const [usuario, setUsuario] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email || "Usuario");
      }
    };

    getCurrentUser();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserName(session.user.user_metadata?.full_name || session.user.email || "Usuario");
      } else {
        setUserName("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/beach.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">¡Bienvenido {userName}!</ThemedText>
        <ThemedText type="subtitle">Visita las playas de Nicaragua</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Gallery
          data={images}
          onIndexChange={(newIndex) => {
            console.log(newIndex);
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
