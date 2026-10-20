import type { PhoneColor } from "@/data/devices";

import black from "./phone-black.png";
import blue from "./phone-blue.png";
import green from "./phone-green.png";
import lime from "./phone-lime.png";
import orange from "./phone-orange.png";
import purple from "./phone-purple.png";
import silver from "./phone-silver.png";

const phoneImages: Record<PhoneColor, string> = {
  black,
  blue,
  green,
  lime,
  orange,
  purple,
  silver,
};

export function phoneImageFor(color: PhoneColor): string {
  return phoneImages[color];
}
