'use client'

import React from 'react'
import {
  useContract,
  useOwnedNFTs,
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  useAddress,
  Web3Button,
} from '@thirdweb-dev/react'
import { useRouter } from 'next/navigation'
import NFTData from '@/components/NFTData'
import Navbar from '@/components/Navbar'

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
      <Address />
    </ThirdwebProvider>
  )
}

const Address = () => {
  const address = useAddress()
  const router = useRouter()
  const { contract: nftCollection } = useContract(
    '0x1A38162870fbB4250f3542b8e178059c4B7A2d44',
  )

  const { contract: marketplace } = useContract(
    '0x9c5DC0F93F70Edc4bE9239c777F5C289b6756c51',
    'marketplace-v3',
  )

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    address,
  )
  console.log(ownedNfts)
  return address ? (
    <div>
      <Navbar />
      <NFTData
        data={ownedNfts}
        isLoading={loadingOwnedNfts}
        address={address}
        emptyText={"You don't own any NFTs yet from this collection."}
      />
      <div className="flex flex-col justify-center items-center mt-3">
        <Web3Button
          contractAddress="0x1A38162870fbB4250f3542b8e178059c4B7A2d44"
          action={(contract) => contract.erc721.claim(1)}
        >
          Claim New NFT
        </Web3Button>
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <p>Connect Wallet</p>
    </div>
  )
}
