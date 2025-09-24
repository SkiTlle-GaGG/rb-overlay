export type TeamType = "NOXUS_TEAM" | "DEMACIA_TEAM" | "IONIA_TEAM";
export const TeamEnum = {
  NOXUS: "NOXUS_TEAM" as TeamType,
  DEMACIA: "DEMACIA_TEAM" as TeamType,
  IONIA: "IONIA_TEAM" as TeamType
} as const;
