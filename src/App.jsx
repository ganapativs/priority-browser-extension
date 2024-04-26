// import viteLogo from "/vite.svg";
import { Box, Flex, Container, Theme } from "@radix-ui/themes";
import "./app.css";
import MemoizedDate from "./components/Date";
import Age from "./components/Age";
import Priority from "./components/Priority";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return "dark";
  });

  function onThemeChange(theme) {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  return (
    <Theme
      accentColor="teal"
      grayColor="slate"
      radius="full"
      appearance={theme}
    >
      <Box
        height="100vh"
        minHeight="500px"
        maxWidth="95%"
        mx="auto"
        overflow="hidden"
      >
        <Container
          height="100vh"
          maxWidth="1700px"
          minWidth="850px"
          className="fadeIn"
        >
          {/* https://stackoverflow.com/a/33148425/2627022 */}
          <Flex
            direction="column"
            gap="2"
            height="100%"
            align="center"
            justify="center"
          >
            <Flex gap="9" minWidth="850px">
              <Flex
                flexGrow="1"
                flexShrink="1"
                flexBasis="50%"
                p="4"
                align="center"
              >
                <Flex align="center" justify="center" width="385px">
                  <MemoizedDate />
                </Flex>
              </Flex>
              <div className="cross-divider"></div>
              <Box flexGrow="1" flexShrink="1" flexBasis="50%" p="4">
                <Flex align="center" justify="end" width="385px">
                  <Age />
                </Flex>
              </Box>
            </Flex>
            <Box mt="4" mb="8">
              <Priority />
            </Box>
          </Flex>
          <Footer theme={theme} onThemeChange={onThemeChange} />
        </Container>
      </Box>
    </Theme>
  );
}

export default App;
