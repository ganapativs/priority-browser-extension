import { Box, Flex, Container, Theme } from "@radix-ui/themes";
import "./app.css";
import MemoizedDate from "./components/Date";
import Age from "./components/Age";
import Priority from "./components/Priority";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [monochrome, setMonochrome] = useState(() => {
    const stored = localStorage.getItem("monochrome");
    if (stored) return stored === "true";
    return false;
  });
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return "dark";
  });
  const [visibleItems, setVisibleItems] = useState(() => {
    const stored = localStorage.getItem("items");
    if (stored) return JSON.parse(stored);
    return ["date", "age"];
  });

  function onThemeChange(theme) {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  function onMonochromeChange(monochrome) {
    localStorage.setItem("monochrome", monochrome === true);
    setMonochrome(monochrome);
  }

  function onVisibleItemsChange(items) {
    localStorage.setItem("items", JSON.stringify(items));
    setVisibleItems(items);
  }

  return (
    <Theme
      accentColor="gold"
      grayColor="slate"
      radius="full"
      appearance={theme}
      panelBackground="translucent"
    >
      <Box
        height="100vh"
        minHeight="500px"
        maxWidth="95%"
        mx="auto"
        overflow="hidden"
      >
        <Container height="100vh" maxWidth="1700px" minWidth="850px">
          <Header
            theme={theme}
            onThemeChange={onThemeChange}
            monochrome={monochrome}
            onMonochromeChange={onMonochromeChange}
            visibleItems={visibleItems}
            onVisibleItemsChange={onVisibleItemsChange}
          />
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
            <Box mt="4" mb="8" minWidth="600px" width="100%">
              <Priority />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Theme>
  );
}

export default App;
