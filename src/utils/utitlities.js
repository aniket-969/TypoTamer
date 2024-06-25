export const fonts = [
  { name: "Helvetica", style: { fontFamily: "Helvetica, sans-serif" } },
  { name: "Arial", style: { fontFamily: "Arial, sans-serif" } },
  { name: "Roboto", style: { fontFamily: "Roboto, sans-serif" } },
  { name: "Open Sans", style: { fontFamily: "Open Sans, sans-serif" } },
  { name: "Lato", style: { fontFamily: "Lato, sans-serif" } },
  {
    name: "Times New Roman",
    style: { fontFamily: '"Times New Roman", serif' },
  },
  { name: "Georgia", style: { fontFamily: "Georgia, serif" } },
  { name: "Merriweather", style: { fontFamily: "Merriweather, serif" } },
  {
    name: "Playfair Display",
    style: { fontFamily: "Playfair Display, serif" },
  },
  { name: "Courier New", style: { fontFamily: '"Courier New", monospace' } },
  {
    name: "Source Code Pro",
    style: { fontFamily: "Source Code Pro, monospace" },
  },
  { name: "Fira Code", style: { fontFamily: "Fira Code, monospace" } },
  { name: "Pacifico", style: { fontFamily: "Pacifico, cursive" } },
  { name: "Lobster", style: { fontFamily: "Lobster, cursive" } },
  { name: "Oswald", style: { fontFamily: "Oswald, sans-serif" } },
  { name: "Dancing Script", style: { fontFamily: "Dancing Script, cursive" } },
  { name: "Indie Flower", style: { fontFamily: "Indie Flower, cursive" } },
];

import keyboard1 from "../../assets/keyboard.mp3";
import keyboard2 from "../../assets/keyboard2.wav";
import keyboard3 from "../../assets/audio.mp3";
import keyboard4 from "../../assets/audio2.mp3";
import keyboard5 from "../../assets/keyboard5.mp3";
import typewriter from "../../assets/hard-single-key-press.wav";
import piano2 from "../../assets/calmPiano.mp3";
import piano from "../../assets/piano.mp3";
import bloop from "../../assets/bloop.mp3";
import shotgun from "../../assets/shotgun.mp3";
import gunshot from "../../assets/gun.mp3";
import gunshot2 from "../../assets/gun-shot2.mp3";
import canon from "../../assets/cannon-shot.mp3";
import emptygun from "../../assets/empty-gun-shot.mp3";
import punch from "../../assets/punch.mp3";
import punch2 from "../../assets/punch2.mp3";
import hit from "../../assets/hit.mp3";
import firewhoosh from "../../assets/fire-torch-whoosh-1.mp3";
import flora from "../../assets/flora.mp3";
import pistol9mm from "../../assets/9mm-pistol-shot.mp3";
import fire from "../../assets/fire.mp3";
import lightingbulb from "../../assets/lightingbulb.mp3";

export const soundList = [
  { name: "keyboard1", soundFile: keyboard1 },
  { name: "keyboard2", soundFile: keyboard2 },
  { name: "keyboard3", soundFile: keyboard3 },
  { name: "keyboard4", soundFile: keyboard4 },
  { name: "keyboard5", soundFile: keyboard5 },
  { name: "typewriter", soundFile: typewriter },
  { name: "piano", soundFile: piano },
  { name: "piano2", soundFile: piano2 },
  { name: "bloop", soundFile: bloop },
  { name: "lightingbulb", soundFile: lightingbulb },
  { name: "gunshot", soundFile: gunshot },
  { name: "gunshot2", soundFile: gunshot2 },
  { name: "shotgun", soundFile: shotgun },
  { name: "fire", soundFile: fire },
  { name: "pistol9mm", soundFile: pistol9mm },
  { name: "canon", soundFile: canon },
  { name: "empty gun", soundFile: emptygun },
  { name: "punch", soundFile: punch },
  { name: "punch2", soundFile: punch2 },
  { name: "hit", soundFile: hit },
  { name: "firewhoosh", soundFile: firewhoosh },
  { name: "flora", soundFile: flora },
];

export const themes = [
  {
    name: "dracula",
    colors: {
      "--bg-color": "#282a36",
      "--main-color": "#f2f2f2",
      "--caret-color": "#f2f2f2",
      "--sub-color": "#bd93f9",
      "--sub-alt-color": "#20222c",
      "--text-color": "#f2f2f2",
      "--error-color": "#f758a0",
    },
  },
  {
    name: "iceland",
    colors: {
      "--bg-color": "#161821",
      "--main-color": "#7da1e8",
      "--caret-color": "#d2d4de",
      "--sub-color": "#b8c5e0",
      "--sub-alt-color": "#232531",
      "--text-color": "#e3e5e8",
      "--error-color": "#e27878",
    },
  },
  {
    name: "dark",
    colors: {
      "--bg-color": "#1d2021",
      "--main-color": "#d79921",
      "--caret-color": "#fabd2f",
      "--sub-color": "#665c54",
      "--sub-alt-color": "#282828",
      "--text-color": "#ebdbb2",
      "--error-color": "#fb4934",
    },
  },
  {
    name: "darkii",
    colors: {
      "--bg-color": "#1d2021",
      "--main-color": "#d79921",
      "--caret-color": "#fabd2f",
      "--sub-color": "#665c54",
      "--sub-alt-color": "#282828",
      "--text-color": "#ebdbb2",
      "--error-color": "#fb4934",
    },
  },
  {
    name: "paper",
    colors: {
      "--bg-color": "#eeeeee",
      "--main-color": "#444444",
      "--caret-color": "#444444",
      "--sub-color": "#b2b2b2",
      "--sub-alt-color": "#dddddd",
      "--text-color": "#444444",
      "--error-color": "#d70000",
    },
  },
  {
    name: "darling",
    colors: {
      "--bg-color": "#fec8cd",
      "--main-color": "#ffffff",
      "--caret-color": "#ffffff",
      "--sub-color": "#a30000",
      "--sub-alt-color": "#f2babd",
      "--text-color": "#ffffff",
      "--error-color": "#2e7dde",
    },
  },
  {
    name: "shadow",
    colors: {
      "--bg-color": "#000000",
      "--main-color": "#eeeeee",
      "--caret-color": "#eeeeee",
      "--sub-color": "#444444",
      "--sub-alt-color": "#171717",
      "--text-color": "#eeeeee",
      "--error-color": "#ffffff",
    },
  },
  {
    name: "blueberry dark",
    colors: {
      "--bg-color": "#212b42",
      "--main-color": "#add7ff",
      "--caret-color": "#962f7e",
      "--sub-color": "#5c7da5",
      "--sub-alt-color": "#1b2334",
      "--text-color": "#91b4d5",
      "--error-color": "#df4576",
    },
  },
  {
    name: "camping",
    colors: {
      "--bg-color": "#faf1e4",
      "--main-color": "#618c56",
      "--caret-color": "#618c56",
      "--sub-color": "#c2b8aa",
      "--sub-alt-color": "#e7dccb",
      "--text-color": "#3c403b",
      "--error-color": "#ad4f4e",
    },
  },
  {
    name: "magic girl",
    colors: {
      "--bg-color": "#ffffff",
      "--main-color": "#f5b1cc",
      "--caret-color": "#e45c96",
      "--sub-color": "#93e8d3",
      "--sub-alt-color": "#f2f2f2",
      "--text-color": "#00ac8c",
      "--error-color": "#ffe495",
    },
  },
  {
    name: "blue mania",
    colors: {
      "--bg-color": "#ffffff",
      "--main-color": "#5ed5f3",
      "--caret-color": "#303030",
      "--sub-color": "#d64090",
      "--sub-alt-color": "#edf8fa",
      "--text-color": "#0a282f",
      "--error-color": "#000000",
    },
  },
  {
    name: "nord light",
    colors: {
      "--bg-color": "#eceff4",
      "--main-color": "#8fbcbb",
      "--caret-color": "#8fbcbb",
      "--sub-color": "#6a7791",
      "--sub-alt-color": "#d8dee9",
      "--text-color": "#8fbcbb",
      "--error-color": "#bf616a",
    },
  },
  {
    name: "olive",
    colors: {
      "--bg-color": "#e9e5cc",
      "--main-color": "#92946f",
      "--caret-color": "#92946f",
      "--sub-color": "#b7b39e",
      "--sub-alt-color": "#d4cfbc",
      "--text-color": "#373731",
      "--error-color": "#cf2f2f",
    },
  },
  {
    name: "pastel",
    colors: {
      "--bg-color": "#e0b2bd",
      "--main-color": "#fbf4b6",
      "--caret-color": "#fbf4b6",
      "--sub-color": "#b4e9ff",
      "--sub-alt-color": "#d29fab",
      "--text-color": "#6d5c6f",
      "--error-color": "#ff6961",
    },
  },
  {
    name: "mizu",
    colors: {
      "--bg-color": "#afcbdd",
      "--main-color": "#fcfbf6",
      "--caret-color": "#fcfbf6",
      "--sub-color": "#85a5bb",
      "--sub-alt-color": "#9fc1d4",
      "--text-color": "#1a2633",
      "--error-color": "#bf616a",
    },
  },
  {
    name: "lavender",
    colors: {
      "--bg-color": "#ada6c2",
      "--main-color": "#e4e3e9",
      "--caret-color": "#e4e3e9",
      "--sub-color": "#e4e3e9",
      "--sub-alt-color": "#a19bb9",
      "--text-color": "#2f2a41",
      "--error-color": "#ca4754",
    },
  },
  {
    name: "botanical",
    colors: {
      "--bg-color": "#7b9c98",
      "--main-color": "#eaf1f3",
      "--caret-color": "#abc6c4",
      "--sub-color": "#495755",
      "--sub-alt-color": "#72908d",
      "--text-color": "#eaf1f3",
      "--error-color": "#f6c9b4",
    },
  },
  {
    name: "witch girl",
    colors: {
      "--bg-color": "#f3dbda",
      "--main-color": "#56786a",
      "--caret-color": "#afc5bd",
      "--sub-color": "#ddb4a7",
      "--sub-alt-color": "#e7c8be",
      "--text-color": "#56786a",
      "--error-color": "#b29a91",
    },
  },
  {
    name: "icognito",
    colors: {
      "--bg-color": "#0e0e0e",
      "--main-color": "#ff9900",
      "--caret-color": "#ff9900",
      "--sub-color": "#555555",
      "--sub-alt-color": "#151515",
      "--text-color": "#c6c6c6",
      "--error-color": "#e44545",
    },
  },
  {
    name: "serika dark",
    colors: {
      "--bg-color": "#323437",
      "--main-color": "#e2b714",
      "--caret-color": "#e2b714",
      "--sub-color": "#646669",
      "--sub-alt-color": "#2c2e31",
      "--text-color": "#d1d0c5",
      "--error-color": "#ca4754",
    },
  },
  {
    name: "bento",
    colors: {
      "--bg-color": "#2d394d",
      "--main-color": "#ff7a90",
      "--caret-color": "#ff7a90",
      "--sub-color": "#4a768d",
      "--sub-alt-color": "#263041",
      "--text-color": "#fffaf8",
      "--error-color": "#ee2a3a",
    },
  },
  {
    name: "night runner",
    colors: {
      "--bg-color": "#212121",
      "--main-color": "#feff04",
      "--caret-color": "#feff04",
      "--sub-color": "#5c4a9c",
      "--sub-alt-color": "#282828",
      "--text-color": "#d5c6e0",
      "--error-color": "#fa0647",
    },
  },
  {
    name: "ez mode",
    colors: {
      "--bg-color": "#0068c6",
      "--main-color": " #fa62d5",
      "--caret-color": "#4ddb47",
      "--sub-color": "#138bf7",
      "--sub-alt-color": "#005bac",
      "--text-color": "#ffffff",
      "--error-color": "#4ddb47",
    },
  },
  {
    name: "menthol",
    colors: {
      "--bg-color": "#00c18c",
      "--main-color": "#ffffff",
      "--caret-color": "#99fdd8",
      "--sub-color": "#186544",
      "--sub-alt-color": "#17ae7d",
      "--text-color": "#ffffff",
      "--error-color": " #e03c3c",
    },
  },
  {
    name: "red dragon",
    colors: {
      "--bg-color": "#1a0b0c",
      "--main-color": "#ff3a32",
      "--caret-color": "#ff3a32",
      "--sub-color": "#e2a528",
      "--sub-alt-color": "#0e0506",
      "--text-color": "#4a4d4e",
      "--error-color": "#771b1f",
      "--error-extra-color": "#591317",
      "--colorful-error-color": "#771b1f",
      "--colorful-error-extra-color": "#591317",
    },
  },
  {
    name: "dots",
    colors: {
      "--bg-color": "#121520",
      "--caret-color": "#fff",
      "--main-color": "#fff",
      "--sub-color": "#676e8a",
      "--sub-alt-color": "#1b1e2c",
      "--text-color": "#fff",
      "--error-color": "#da3333",
      "--error-extra-color": "#791717",
      "--colorful-error-color": "#da3333",
      "--colorful-error-extra-color": "#791717",
    },
  },
  {
    name: "sweden",
    colors: {
      "--bg-color": "#0058a3",
      "--main-color": "#ffcc02",
      "--caret-color": "#b5b5b5",
      "--sub-color": "#57abdb",
      "--sub-alt-color": "#024f8e",
      "--text-color": "#ffffff",
      "--error-color": "#e74040",
      "--error-extra-color": "#a22f2f",
      "--colorful-error-color": "#f56674",
      "--colorful-error-extra-color": "#e33546",
    },
  },
  
];

export const getFontSizeProperties = (size) => {
  switch (size) {
    case "small":
      return {
        size: "1.5rem",
        lineheight: "2.25rem",
        height: "115px",
        scroll: 36
      };
    case "medium":
      return {
        size: "1.875rem",
        lineheight: "2.5rem",
        height: "125px",
        scroll: 40
      };
    case "large":
      return {
        size: "2.25rem",
        lineheight: "3rem",
        height: "140px",
        scroll: 48
      };
    default:
      return {};
  }
};
