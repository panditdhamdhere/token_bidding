'use client'

import { useState } from 'react';
import Image from 'next/image'
import Navbar from '@/components/Navbar';

// Thirdweb imports
import {
  ConnectWallet,
  MediaRenderer,
  darkTheme,
  ThirdwebProvider,
  embeddedWallet,
  useAddress,
  localWallet,
  smartWallet,
  metamaskWallet,
  useContract,
  useMetadata,
  Web3Button
} from "@thirdweb-dev/react";

//gasless implementation
const smartWalletOptions = {
  factoryAddress: "0x8615a6223ca29d0E11f8882f8dB8841967B0947b",
  gasless: true,
};

export default function Home() {

  //custom wallets
  const customSmartWallet = smartWallet(
    embeddedWallet(),
    smartWalletOptions,
  )

  const customSmartWallet2 = smartWallet(
    localWallet(),
    smartWalletOptions,
  )

  customSmartWallet.meta.name = "De-war"
  customSmartWallet.meta.iconURL = "/game2.png"

  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="380b8443e6fa23921cde8c690f9a9bca"
      supportedWallets={[
        customSmartWallet,
        customSmartWallet2,
        metamaskWallet()
      ]}
    >
      <Landing />
    </ThirdwebProvider>
  )
}

const Landing = () => {

  //Player NFTs Data
  const contractAddress = "0x1A38162870fbB4250f3542b8e178059c4B7A2d44"
  const { contract } = useContract(contractAddress)
  const { data: metadata, isLoading: isMetadataLoading } = useMetadata(contract)

  const address = useAddress()

  //Connect Wallet Theme
  const customeTheme = darkTheme({
    colors: {
      modalBg: "linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))",
      primaryText: "#555",
      secondaryText: "#333333",
      walletSelectorButtonHoverBg: "rgb(194, 207, 204)",
      separatorLine: "#888",
      borderColor: "#333333",
    }
  })

  return (
    <div>

      {address ?
        //Wallet Connected Page (Marketplace)
        <div>
        <Navbar />
        <div className="flex text-[#000]">
          <MediaRenderer src={metadata?.image} />
          <div>
            <h2>{metadata?.name}</h2>
            <h3>{metadata?.description}</h3>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.erc721.claim(1)}
            >
              Claim Player ID
            </Web3Button>
          </div>
        </div>
        </div>

        :
        //Wallet Not Connected (Landing Page)
        <main className="flex h-screen items-center justify-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700">
          <ConnectWallet
            theme={customeTheme}
            modalSize={"wide"}
            btnTitle="ENTER GAME"

            modalTitle="De-Game"
            modalTitleIconUrl=""

            welcomeScreen={() => {
              return (
                <div>
                  <MediaRenderer
                    src={"ipfs://QmT5ULF1ZQpsKUHmnWk7yBoPCnSYLQckAR9VRcEopFBiSN/game-box-gif.gif"}
                    height={570}
                    width={570}
                    style={{ objectFit: "fill", objectPosition: "right" }}
                  />
                </div>
              )
            }}
          />
        </main>
      }
    </div>
  )
}