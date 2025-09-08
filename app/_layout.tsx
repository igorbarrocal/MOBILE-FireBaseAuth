import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/services/i18n";

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
       </ThemeProvider>
    </I18nextProvider>
    
  );
}
