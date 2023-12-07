"use client"

import NFTGrid from "@/components/NFTGrid";
import Navbar from "@/components/Navbar";
import { ThirdwebProvider, smartWallet, embeddedWallet, localWallet, metamaskWallet } from "@thirdweb-dev/react";
import { useContract, useNFTs } from "@thirdweb-dev/react-core";


const smartWalletOptions = {
    factoryAddress: "0x8615a6223ca29d0E11f8882f8dB8841967B0947b",
    gasless: true,
  };

const customSmartWallet = smartWallet(
    embeddedWallet(),
    smartWalletOptions,
  )

  const customSmartWallet2 = smartWallet(
    localWallet(),
    smartWalletOptions,
  )

export default function Page() {
    return(
        <ThirdwebProvider
        activeChain="mumbai"
        clientId="380b8443e6fa23921cde8c690f9a9bca"
        supportedWallets={[
            customSmartWallet,
            customSmartWallet2,
            metamaskWallet()
          ]}
        >
            <Navbar />
            <Buy/>
        </ThirdwebProvider>
    )
}

const Buy = () => {
    const { contract } = useContract("0x1A38162870fbB4250f3542b8e178059c4B7A2d44")
    const { data, isLoadong } = useNFTs(contract)
    console.log(data)

    return(
        <div>
            <h1>Buy Player IDs</h1>
            <p>Explore NFTs and their assets</p>
            <NFTGrid 
                isLoadong={isLoadong}
                data={data}
                emptyText={"No NFTs Found"}
            />
        </div>
    )
}