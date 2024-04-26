// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Box, Flex, Separator, Container } from "@radix-ui/themes";
import "./app.css";
import MemoizedDate from "./components/Date";
import Age from "./components/Age";

function App() {
  return (
    <Box
      height="100vh"
      minHeight="600px"
      maxWidth="95%"
      mx="auto"
      overflow="hidden"
    >
      <Container height="100vh" maxWidth="1800px" minWidth="1024px">
        <Flex direction="column" height="100%">
          {/* https://stackoverflow.com/a/33148425/2627022 */}
          <Box flexGrow="1" flexShrink="1" flexBasis="50%" overflow="hidden">
            <Flex gap="2" height="100%">
              <Box flexGrow="1" flexShrink="1" flexBasis="50%" p="4">
                {/* <Flex direction="column" gap="2" height="100%">
                  <Box>
                    <Box py="2">Header</Box>
                  </Box>
                  <Separator size="4" color="amber" />
                  <Box flexGrow="1" flexShrink="1" flexBasis="50%">
                    <MemoizedDate />
                  </Box>
                  <Box flexGrow="1" flexShrink="1" flexBasis="50%">
                    Left bottom
                  </Box>
                </Flex> */}
                {/* <Box>
                  <Box py="2">Header</Box>
                </Box>
                <Separator size="4" color="amber" /> */}
                {/* <Box flexGrow="1" flexShrink="1" flexBasis="50%"> */}
                <MemoizedDate />
                <Age />
                {/* </Box> */}
              </Box>
              <Box
                flexGrow="1"
                flexShrink="1"
                flexBasis="100%"
                p="4"
                className="layout--right"
                overflow="auto"
              >
                <div>Right</div>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
