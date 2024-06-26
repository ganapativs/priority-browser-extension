import { createContext, useState } from "react";

export const PreferenceContext = createContext();

export function withPreferenceManager(Component) {
  return function WithPreferenceContext(props) {
    const [monochrome, setMonochrome] = useState(() => {
      const stored = localStorage.getItem("monochrome");
      if (stored) return stored === "true";
      const defaultValue = false;
      localStorage.setItem("monochrome", defaultValue);
      return defaultValue;
    });
    const [theme, setTheme] = useState(() => {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      const defaultValue = "dark";
      localStorage.setItem("theme", defaultValue);
      return defaultValue;
    });
    const [visibleItems, setVisibleItems] = useState(() => {
      const stored = localStorage.getItem("items");
      if (stored) return JSON.parse(stored);
      const defaultValue = ["date", "age"];
      localStorage.setItem("items", JSON.stringify(defaultValue));
      return defaultValue;
    });

    function onPreferenceChange(type, value) {
      switch (type) {
        case "monochrome":
          localStorage.setItem("monochrome", value === true);
          setMonochrome(value);
          break;

        case "theme":
          localStorage.setItem("theme", value);
          setTheme(value);
          break;

        case "items":
          localStorage.setItem("items", JSON.stringify(value));
          setVisibleItems(value);
          break;

        case "reset":
          localStorage.clear();
          window.location.reload();
          break;

        default:
          break;
      }
    }

    return (
      <PreferenceContext.Provider
        value={{
          monochrome,
          theme,
          items: visibleItems,
          onChange: onPreferenceChange,
        }}
      >
        <Component {...props} />
      </PreferenceContext.Provider>
    );
  };
}
