export const WEB3AUTH_NETWORK = {
  cyan: {
    displayName: "Cyan",
  },
  testnet: {
    displayName: "Testnet",
  },
} as const;

export type WEB3AUTH_NETWORK_TYPE = keyof typeof WEB3AUTH_NETWORK;
