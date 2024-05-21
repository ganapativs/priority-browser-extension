export default {
  manifest_version: 3,
  name: "Priority",
  version: "0.2.0",
  description:
    "Productivity extension to focus on your top priority task in new tab page.",
  chrome_url_overrides: {
    newtab: "index.html",
  },
  icons: {
    16: "icons/icon16.png",
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    128: "icons/icon128.png",
  },
};
