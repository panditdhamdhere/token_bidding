import NFTComponent from './NFT'
import Link from 'next/link'

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = 'No NFTs Found',
}) {
    const contractAddress = "0x1A38162870fbB4250f3542b8e178059c4B7A2d44"

  return (
    <div>
      {isLoading ? (
        <h2>Loading.....</h2>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
        {data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/token/${contractAddress}/${nft.metadata.id}`}
              key={nft.metadata.id}
            >
              
              <NFTComponent nft={nft} />
              
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFTComponent nft={nft} />
            </div>
          ),
        )}
        </div>
      ) : (
        <>{emptyText}</>
      )}
    </div>
  )
}
