import { Flex, IconButton, Link, Separator, Tooltip } from "@radix-ui/themes";
import {
  GitHubLogoIcon,
  SunIcon,
  MoonIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import fullLogo from "/logo-full.svg";

// eslint-disable-next-line react/prop-types
const Header = ({ theme, onThemeChange }) => {
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
            <Tooltip
              content={`Current theme: ${theme}. Click to change the theme.`}
            >
              <IconButton
                variant="soft"
                size="1"
                onClick={() =>
                  onThemeChange(theme === "dark" ? "light" : "dark")
                }
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
