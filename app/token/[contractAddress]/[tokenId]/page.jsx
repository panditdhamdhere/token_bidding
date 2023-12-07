'use client'
import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useMinimumNextBid,
  useValidDirectListings,
  useValidEnglishAuctions,
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
} from '@thirdweb-dev/react'
import Navbar from '@/components/Navbar'
import { NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'
import React from 'react'
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

export default async function Token(params) {
  const { nft, contractMetadata } = await getData(params)

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
      <TokenPage nft={nft} contractMetadata={contractMetadata} />
    </ThirdwebProvider>
  )
}

const TokenPage = ({ nft, contractMetadata }) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    '0x9c5DC0F93F70Edc4bE9239c777F5C289b6756c51',
    'marketplace-v3',
  )

  const { contract: nftCollection } = useContract(
    '0x1A38162870fbB4250f3542b8e178059c4B7A2d44',
  )

  const {
    data: directListing,
    isLoading: loadingDirectListing,
  } = useValidDirectListings(marketplace, {
    tokenContract: '0x1A38162870fbB4250f3542b8e178059c4B7A2d44',
    tokenId: nft?.metadata.id,
  })

  async function buyListing() {
    let txResult

    //Add for auction section
    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1,
      )
    } else {
      throw new Error('No listing found')
    }

    return txResult
  }

  return (
    <div className="m-9">
      {nft ? (
        <div className="w-64">
          <Card>
            <CardHeader>
              <CardTitle>{nft.metadata.name}</CardTitle>
              <CardDescription>{nft.metadata.description}</CardDescription>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width="100%"
                height="100%"
              />
            </CardHeader>
            <CardFooter>
              {directListing && directListing[0] ? (
                <div>
                  <h2>
                    {directListing[0]?.currencyValuePerToken.displayValue}
                    {' ' + directListing[0]?.currencyValuePerToken.symbol}
                  </h2>
                  <Web3Button
                    contractAddress={
                      '0x9c5DC0F93F70Edc4bE9239c777F5C289b6756c51'
                    }
                    action={async () => buyListing()}
                    isDisabled={!directListing || !directListing[0]}
                  >
                    Buy at asking price
                  </Web3Button>
                </div>
              ) : (
                <h2>Not for sale</h2>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <h1>No NFT Found</h1>
      )}
    </div>
  )
}

export const getData = async (context) => {
  const tokenId = context.params?.tokenId
  const contractAddress = context.params?.contractAddress

  console.log(context.params?.tokenId)

  const sdk = new ThirdwebSDK('mumbai', {
    clientId: '380b8443e6fa23921cde8c690f9a9bca',
    secretKey:
      'G-rynmeuDqqCspIX3dm3W55UFF8Tiz3KSJw7Ck1cJ2ITym-FLr99U8sCpuvbA-R0jrILtcQWm123sK9a99dsSw',
  })
  const contract = await sdk.getContract(contractAddress)

  const nft = await contract.erc721.get(tokenId)

  let contractMetadata

  try {
    contractMetadata = await contract.metadata.get()
  } catch (e) {}

  return {
    nft,
    contractMetadata: contractMetadata,
  }
}

// export const getStaticPaths = async () => {
//   const sdk = new ThirdwebSDK('mumbai', {
//     clientId: '380b8443e6fa23921cde8c690f9a9bca',
//     secretKey:
//       'G-rynmeuDqqCspIX3dm3W55UFF8Tiz3KSJw7Ck1cJ2ITym-FLr99U8sCpuvbA-R0jrILtcQWm123sK9a99dsSw',
//   })
//   const contractAddress = "0xfD166cCCb9c00113DfFEd958dD2809A2610e1149"

//   const contract = await sdk.getContract(contractAddress);

//   const nfts = await contract.erc721.getAll();

//   const paths = nfts.map((nft) => {
//     return {
//         contractAddress: contractAddress,
//         tokenId: nft.metadata.id,
//     };
//   });

//   return {
//     paths,
//     fallback: "blocking", // can also be true or 'blocking'
//   };
// };
