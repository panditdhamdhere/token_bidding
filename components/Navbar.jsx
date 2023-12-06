import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  ConnectWallet,
  Web3Button,
  MediaRenderer,
  useContract,
  useMetadata,
  useAddress
} from '@thirdweb-dev/react'
import Link from 'next/link'

const Navbar = () => {

  const address = useAddress();

  const contractAddress = '0x1A38162870fbB4250f3542b8e178059c4B7A2d44'
  const { contract } = useContract(contractAddress)
  const { data: metadata, isLoading: isMetadataLoading } = useMetadata(contract)

  return (
    <div>
      <main className="p-4 bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300">
        <div className="flex justify-between items-center">
          <Image src="/game2.png" height={50} width={50} />
          <div className="flex w-1/6 justify-between items-center">
            <Link href="/buy">
              <h2>Buy</h2>
            </Link>
            <Link href="/sell">
              <h2>Sell</h2>
            </Link>
          </div>
          <div className="flex items-center w-3/12">
          <ConnectWallet/>
          {address && (
            <Link href={`/profile/${address}`}>
              <Avatar  className="ml-3">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Navbar
