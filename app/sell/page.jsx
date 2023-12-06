'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import SaleInfo from '@/components/SaleInfo'

import {
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from '@thirdweb-dev/react'
import NFTGrid from '@/components/NFTGrid'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const smartWalletOptions = {
  factoryAddress: '0x8615a6223ca29d0E11f8882f8dB8841967B0947b',
  gasless: true,
}

const customSmartWallet = smartWallet(embeddedWallet(), smartWalletOptions)

const customSmartWallet2 = smartWallet(localWallet(), smartWalletOptions)

export default function Page() {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="380b8443e6fa23921cde8c690f9a9bca"
      supportedWallets={[
        customSmartWallet,
        customSmartWallet2,
        metamaskWallet(),
      ]}
    >
      <Navbar />
      <Sell />
    </ThirdwebProvider>
  )
}

const Sell = () => {
  const { contract } = useContract('0x1A38162870fbB4250f3542b8e178059c4B7A2d44')
  const address = useAddress()
  const { data, isLoading } = useOwnedNFTs(contract, address)
  console.log(data)

  const [selectedNFT, setSelectedNFT] = useState(undefined)
  return (
    <div>
      <h2>Sell NFTs</h2>
      <div className="flex justify-center">
        {!selectedNFT ? (
          <div className="w-full">
            <NFTGrid
              data={data}
              isLoading={isLoading}
              overrideOnclickBehavior={(nft) => {
                setSelectedNFT(nft)
              }}
              emptyText={"You don't own any NFTs yet from this collection."}
            />
          </div>
        ) : (
          <div className="flex w-2/5 justify-center">
            <div className="flex justify-between items-start">
              <ThirdwebNftMedia
                metadata={selectedNFT.metadata}
                width="80%"
                height="80%"
              />
              <div>
                {selectedNFT?.metadata?.name}
                <SaleInfo
                    nft={selectedNFT}
                />
              </div>
              <button
                  onClick={() => {
                    setSelectedNFT(undefined)
                  }}
                >
                  X
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
