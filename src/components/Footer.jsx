import {
  Flex,
  IconButton,
  Link,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { GitHubLogoIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";

// eslint-disable-next-line react/prop-types
const Footer = ({ theme, onThemeChange }) => {
  return (
    <footer className="footer">
      <Flex align="center" gap="4" justify="center">
        <Flex align="center" gap="1">
          <Text size="2" color="gray">
            Theme
          </Text>
          <Tooltip
            content={`Current theme: ${theme}. Click to change the theme.`}
          >
            <IconButton
              variant="soft"
              size="1"
              onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Tooltip>
        </Flex>
        <Separator orientation="vertical" color="gray" size="1" />
        <Link
          href="https://github.com/ganapativs/priority-browser-extension?ref=priority-browser-extension"
          target="_blank"
          rel="noopener noreferrer"
          size="2"
        >
          <Flex align="center" gap="1">
            <GitHubLogoIcon />
            Github
          </Flex>
        </Link>
        <Separator orientation="vertical" color="gray" size="1" />
        <Link
          href="https://x.com/ganapativs?ref=priority-browser-extension"
          target="_blank"
          rel="noopener noreferrer"
          size="2"
        >
          @ganapativs
        </Link>
      </Flex>
    </footer>
  );
};

export default Footer;
