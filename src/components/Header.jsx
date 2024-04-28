/* eslint-disable react/prop-types */
import {
  Box,
  CheckboxCards,
  Flex,
  IconButton,
  Link,
  Popover,
  RadioCards,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import {
  GitHubLogoIcon,
  SunIcon,
  MoonIcon,
  TwitterLogoIcon,
  GearIcon,
  MixIcon,
} from "@radix-ui/react-icons";
import fullLogo from "/logo-full.svg";

const Header = ({
  theme,
  onThemeChange,
  monochrome,
  onMonochromeChange,
  visibleItems,
  onVisibleItemsChange,
}) => {
  return (
    <header className="header">
      <Flex align="center" gap="4" justify="left">
        <img
          src={fullLogo}
          alt="Priority Logo"
          height="20px"
          draggable="false"
          className="header-logo-full"
        />
        <Flex
          flexGrow="1"
          flexShrink="1"
          flexBasis="100%"
          align="center"
          gap="4"
          justify="end"
          className="header-links"
        >
          <Flex align="center" gap="1">
            <Popover.Root>
              <Popover.Trigger>
                <IconButton variant="soft" size="1">
                  <GearIcon />
                </IconButton>
              </Popover.Trigger>
              <Popover.Content width="250px" size="1">
                <Flex gap="2" direction="column" align="center">
                  <Box width="100%">
                    <Box mb="2">
                      <Text size="4" color="gold">
                        <Flex align="center" gap="1">
                          {theme === "dark" ? <MoonIcon /> : <SunIcon />} Theme
                        </Flex>
                      </Text>
                    </Box>
                    <RadioCards.Root
                      size="1"
                      columns="2"
                      color="gold"
                      defaultValue={`${theme}${monochrome ? "-mono" : ""}`}
                      onValueChange={(value) => {
                        const [newTheme, newMonochrome] = value.split("-");
                        onThemeChange(newTheme);
                        onMonochromeChange(newMonochrome === "mono");
                      }}
                    >
                      <RadioCards.Item value="dark">Dark</RadioCards.Item>
                      <RadioCards.Item value="dark-mono">
                        Dark Mono
                      </RadioCards.Item>
                      <RadioCards.Item value="light">Light</RadioCards.Item>
                      <RadioCards.Item value="light-mono">
                        Light Mono
                      </RadioCards.Item>
                    </RadioCards.Root>
                    <Box mt="4">
                      <Box mb="2">
                        <Text size="4" color="gold">
                          <Flex align="center" gap="1">
                            <MixIcon /> Visibility
                          </Flex>
                        </Text>
                      </Box>
                      <CheckboxCards.Root
                        defaultValue={visibleItems}
                        size="1"
                        columns="2"
                        onValueChange={(values) => {
                          onVisibleItemsChange(values);
                        }}
                      >
                        <CheckboxCards.Item value="date">
                          Date
                        </CheckboxCards.Item>
                        <CheckboxCards.Item value="age">Age</CheckboxCards.Item>
                      </CheckboxCards.Root>
                    </Box>
                  </Box>
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Flex>
          <Separator orientation="vertical" color="gray" size="1" />
          <Link
            href="https://github.com/ganapativs/priority-browser-extension?ref=priority-browser-extension"
            target="_blank"
            rel="noopener noreferrer"
            size="2"
          >
            <Tooltip content={`ganapativs/priority-browser-extension`}>
              <Flex align="center" gap="1">
                <GitHubLogoIcon />
              </Flex>
            </Tooltip>
          </Link>
          <Separator orientation="vertical" color="gray" size="1" />
          <Link
            href="https://x.com/ganapativs?ref=priority-browser-extension"
            target="_blank"
            rel="noopener noreferrer"
            size="2"
          >
            <Flex align="center" gap="1">
              <Tooltip content={`@ganapativs`}>
                <TwitterLogoIcon />
              </Tooltip>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
