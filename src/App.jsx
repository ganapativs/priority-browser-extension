import { Box, Flex, Container, Theme } from "@radix-ui/themes";
import "./app.css";
import MemoizedDate from "./components/Date";
import Age from "./components/Age";
import Priority from "./components/Priority";
import Header from "./components/Header";
import { useContext } from "react";
import {
  PreferenceContext,
  withPreferenceManager,
} from "./components/PreferenceManager";

function App() {
  const preference = useContext(PreferenceContext);
  const { items = [] } = preference;
  const showDate = items.includes("date");
  const showAge = items.includes("age");
  const hasMultipleItems = showDate && showAge;

  return (
    <Theme
      accentColor="gold"
      grayColor="slate"
      radius="full"
      appearance={preference.theme}
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
          <Header />
          {/* https://stackoverflow.com/a/33148425/2627022 */}
          <Flex
            direction="column"
            gap="2"
            height="100%"
            align="center"
            justify="center"
          >
            <Flex gap="9" minWidth="850px">
              {showDate ? (
                <Flex
                  flexGrow="1"
                  flexShrink="1"
                  flexBasis="50%"
                  p="4"
                  align="center"
                  {...(!hasMultipleItems
                    ? { justify: "center", flexBasis: "100%" }
                    : {})}
                >
                  <Flex align="center" justify="center" width="385px">
                    <MemoizedDate centerMode={!hasMultipleItems} />
                  </Flex>
                </Flex>
              ) : null}
              {hasMultipleItems ? <div className="cross-divider"></div> : null}
              {showAge ? (
                <Box
                  flexGrow="1"
                  flexShrink="1"
                  flexBasis="50%"
                  p="4"
                  {...(!hasMultipleItems
                    ? { justify: "center", align: "center", flexBasis: "100%" }
                    : {})}
                >
                  <Flex
                    align="center"
                    justify="end"
                    width="385px"
                    {...(!hasMultipleItems
                      ? {
                          justify: "center",
                        }
                      : {})}
                    style={hasMultipleItems ? {} : { textAlign: "left" }}
                  >
                    <Age centerMode={!hasMultipleItems} />
                  </Flex>
                </Box>
              ) : null}
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

const AppComponent = withPreferenceManager(App);

export default AppComponent;
