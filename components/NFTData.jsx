import NFTComponent from './NFT'
import Link from 'next/link'

export default function NFTData({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = 'No NFTs Found',
}) {
    const address = "0x1A38162870fbB4250f3542b8e178059c4B7A2d44"

  return (
    <div>
      {isLoading ? (
        <h2>Loading.....</h2>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
        {data.map((nft) =>
          !overrideOnclickBehavior ? (
              <NFTComponent nft={nft} />
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
