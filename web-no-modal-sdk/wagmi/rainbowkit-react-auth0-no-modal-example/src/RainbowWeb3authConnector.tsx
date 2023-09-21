import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter, OPENLOGIN_NETWORK } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const name = "Login with Auth0";
const iconUrl = "https://avatars.githubusercontent.com/u/2824157?s=280&v=4";

//@ts-ignore
export const rainbowWeb3AuthConnector = ({ chains }) => {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x"+chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0],
}

  // Create Web3Auth Instance
  const web3AuthInstance = new Web3AuthNoModal({
    clientId: "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
    chainConfig,
    web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
  });

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
  const openloginAdapter = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: "cyan",
      uxMode: "redirect",
      loginConfig: {
        jwt: {
          name: "Web3Auth Auth0 Grandma",
          verifier: "w3a-auth0-demo",
          typeOfLogin: "jwt",
          clientId: "hUVVf4SEsZT7syOiL0gLU9hFEtm2gQ6O",
        },
      },
      whiteLabel: {
        appName: "Web3Auth Auth0 Grandma",
      }
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapter);

  return ({
    id: "web3auth",
    name,
    iconUrl,
    iconBackground: "#fff",
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains: chains,
        options: {
          web3AuthInstance,
          loginParams: {
            relogin: true,
            loginProvider: "jwt",
            extraLoginOptions: {
              domain: "https://web3auth.au.auth0.com",
              verifierIdField: "sub",
            },
          },
        },
      });
      return {
        connector,
      };
    },
  })
};
