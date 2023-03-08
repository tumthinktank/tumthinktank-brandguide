import React from "react";
import ReactDOM from "react-dom";
import { Catalog, pageLoader } from "catalog";
import SignetAnimation from "./components/SignetAnimation";

const pages = [
  {
    path: "/",
    title: "Brand elements",
    pages: [
      {
        path: "/",
        title: "Logotype",
        content: pageLoader(() => import("./pages/logotype.md"))
      },
      {
        path: "/signet",
        title: "Signet",
        content: pageLoader(() => import("./pages/signet.md")),
        imports: {SignetAnimation: SignetAnimation}
      },
      {
        path: "/alphabet",
        title: "Alphabet",
        content: pageLoader(() => import("./pages/alphabet.md"))
      },
    ]
  },
  {
    path: "/colours",
    title: "Design system",
    pages: [
      {
        path: "/colours",
        title: "Colours",
        content: pageLoader(() => import("./pages/colours.md"))
      },
      {
        path: "/images",
        title: "Images",
        content: pageLoader(() => import("./pages/images.md"))
      },
    ]
  }
];

const theme = {
  // Colors
  background: "#F9F9F9",
  textColor: "#333333",
  codeColor: "#00263E",
  linkColor: "#906028",

  // NavigationBar background color, but also sometimes used as a foreground
  // or border color.
  lightColor: "#D6D6D6",

  // Used in PageHeader
  pageHeadingBackground: "#0B334A",
  pageHeadingTextColor: "#fff",

  // Used in Menu and PageHeader to make sure the top parts have
  // the same height.
  pageHeadingHeight: 200,

  // Used for navigation bar
  navBarBackground: "#F2F2F2",
  navBarTextColor: "#003B5C",

  // Used in ResponsiveTabs (tab text), Download specimen (title text).
  // Typography: headings.
  brandColor: "#0B334A",

  sidebarColor: "#FFFFFF",
  sidebarColorText: "#000",
  sidebarColorTextActive: "#906028",
  sidebarColorLine: "#EBEBEB",
  sidebarColorHeading: "#003B5C",

  // Used in the html, react, and image specimens.
  bgLight: "#F2F2F2",
  bgDark: "#333333",

  // Keys appear to be PrismJS token types.
  codeStyles: {
    tag: { color: "#FF5555" },
    punctuation: { color: "#535353" },
    script: { color: "#3F7397" },
    function: { color: "#FF5555" },
    keyword: { color: "#3F7397" },
    string: { color: "#00263E" }
  },

  // Patterns
  checkerboardPatternLight:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=",
  checkerboardPatternDark:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAFklEQVQI12NQBQF2EGAghQkmwXxSmADZJQiZ2ZZ46gAAAABJRU5ErkJggg==",

  // Fonts
  fontFamily: "'Roboto', sans-serif",
  fontHeading: "'Roboto', sans-serif",
  fontMono: "'Roboto Mono', monospace",

  // Base font size in pixels.
  baseFontSize: 15,

  // Modular scale ratio that is used to figure out all the different font sizes
  msRatio: 1.2
}

ReactDOM.render(
  <Catalog 
    title="TUM Think Tank · Brand Guidelines" 
    pages={pages}
    logoSrc="logotype/TUMThinkTank-Logotype-pos.png"
    theme={theme}
  />,
  document.getElementById("catalog")
);
