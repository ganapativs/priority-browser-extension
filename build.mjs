import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { zip } from "zip-a-folder";
import manifest from "./assets/extension/manifest.mjs";
import manifestFirefox from "./assets/extension/manifest-firefox-extended.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");
const extensionPath = path.join(__dirname, "assets", "extension");
const extensionBuildPath = path.join(__dirname, "assets", "extension", "build");

const copyIcons = () => {
  const iconsPath = path.join(extensionPath, "icons");
  const distIconsPath = path.join(distPath, "icons");

  const icons = fs.readdirSync(iconsPath);

  fs.mkdirSync(distIconsPath, { recursive: true });

  for (const icon of icons) {
    const src = path.join(iconsPath, icon);
    const dest = path.join(distIconsPath, icon);

    fs.copyFileSync(src, dest);
  }
};

const createManifest = (browser) => {
  let finalManifest = { ...manifest };

  if (browser === "firefox") {
    finalManifest = { ...manifest, ...manifestFirefox };
  }

  fs.writeFileSync(
    path.join(distPath, "manifest.json"),
    JSON.stringify(finalManifest, null, 2)
  );
};

const createZip = async (browser) => {
  const zipName = browser === "chrome" ? "chrome.zip" : "firefox.zip";
  const zipPath = path.join(extensionBuildPath, zipName);

  fs.mkdirSync(extensionBuildPath, { recursive: true });
  await zip(distPath, zipPath);
};

(async () => {
  const command = process.argv[2];

  switch (command) {
    case "build-chrome":
      copyIcons();
      createManifest("chrome");
      console.log(`Manifest file created in folder ${distPath}`);
      break;
    case "build-firefox":
      copyIcons();
      createManifest("firefox");
      console.log(`Manifest file created in folder ${distPath}`);
      break;
    case "build-and-zip-all":
      copyIcons();
      createManifest("chrome");
      createManifest("firefox");
      await createZip("chrome");
      await createZip("firefox");
      console.log(
        `Production zip files created in folder ${extensionBuildPath}`
      );
      break;

    default:
      throw new Error(`Unknown command: ${command || "NA"}`);
  }
})();
