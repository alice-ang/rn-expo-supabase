import { View, Text, ActivityIndicator, Button } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, initialized } = useAuth();

  if (initialized) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  // if (!isAdmin) {
  //   return <Redirect href={"/(tabs)"} />;
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(tabs)"} asChild>
        <Button title="User" />
      </Link>
      {/* <Link href={"/(admin)"} asChild>
        <Button title="Admin" />
      </Link> */}

      <Button onPress={() => supabase.auth.signOut()} title="Sign out" />
    </View>
  );
};

export default index;
