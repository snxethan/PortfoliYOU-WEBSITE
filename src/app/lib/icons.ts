import type { IconType } from "react-icons";
import {
  FaCode,
  FaCodeBranch,
  FaCubes,
  FaGithub,
  FaHandshake,
  FaHeart,
  FaLightbulb,
  FaLinkedin,
  FaMousePointer,
  FaPalette,
  FaRocket,
} from "react-icons/fa";

/**
 * Explicit registry for icons referenced by name in `site.ts`.
 *
 * Importing the whole `react-icons/fa` namespace (`import * as Icons`) defeats
 * tree-shaking and pulls the entire Font Awesome set into the client bundle —
 * roughly 400 kB of it. Anything data-driven resolves through this map instead.
 */
export const iconMap = {
  FaCode,
  FaCodeBranch,
  FaCubes,
  FaGithub,
  FaHandshake,
  FaHeart,
  FaLightbulb,
  FaLinkedin,
  FaMousePointer,
  FaPalette,
  FaRocket,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof iconMap;
