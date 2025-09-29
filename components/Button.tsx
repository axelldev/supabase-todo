import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  colors?: ButtonColors;
}

interface ButtonColors {
  backgroundColor: string;
  textColor: string;
}

export const Button = ({
  children,
  onPress,
  disabled,
  colors = { backgroundColor: "#3ECF8E", textColor: "#fff" },
}: ButtonProps) => {
  const opacity = disabled ? 0.5 : 1;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.backgroundColor },
        {
          opacity: pressed ? 0.5 : opacity,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: colors.textColor }]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 8,
    padding: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
