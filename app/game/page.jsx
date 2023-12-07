import React from 'react'
import { ThirdwebSDKProvider } from '@thirdweb-dev/react-core'
import { activeChain, TWApiKey } from '@/constants/constants'

export default function Page({ signer }) {
    return (
        <ThirdwebSDKProvider signer={signer} activeChain={activeChain} clientId={TWApiKey} >
            <Game />
        </ThirdwebSDKProvider>
    )
}

const Game = () => {

}

export const getData = async (context) => {
    const tokenId = context.params?.tokenId
    const contractAddress = context.params?.address
  
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