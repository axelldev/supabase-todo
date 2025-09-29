import { Button } from "@/components/Button";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Form {
  email: string;
  password: string;
}

export default function Index() {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const isValid = useMemo(() => {
    return form.email.length > 0 && form.password.length > 0;
  }, [form.email, form.password]);

  const handleChange = (name: keyof Form, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Supabase Todo</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoComplete="email"
        autoFocus={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(value) => handleChange("password", value)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="visible-password"
        autoComplete="password"
      />
      <Button onPress={() => {}} disabled={!isValid}>
        Sign In
      </Button>
      <Button
        onPress={() => {}}
        disabled={!isValid}
        colors={{ backgroundColor: "#6B7280", textColor: "#fff" }}
      >
        Sign Up
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#151515",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#808080",
    color: "#fff",
    backgroundColor: "#202020",
    fontSize: 18,
    padding: 16,
  },
});
