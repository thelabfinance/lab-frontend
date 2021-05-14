import React, {useContext, useState} from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import orderBy from 'lodash/orderBy'
import InfiniteScroll from 'react-infinite-scroll-component';
import nfts from 'config/constants/nfts'
import styled from 'styled-components'
import { FaExclamationTriangle, FaInfoCircle, FaQuestionCircle, FaTrashAlt } from 'react-icons/fa';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Switch from "react-switch";
import { NftProviderContext } from '../contexts/NftProvider'
import NftCard from './NftCard'

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px;
`
const ToggleText = styled.p`
  margin: 0 12px;
`  
const Features = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  @media screen and (max-width: 680px){
    flex-flow: column;
  }
`

const Feature = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 12px;
  font-size: 1.2em !important;
  max-width: 180px;
  text-align: center;
  @media screen and (max-width: 680px){
    max-width: 82%;
    flex-flow: row;
    align-items: flex-start;
    & > svg{
      width: 42px;
      height: 42px;
    }
    & > p{
      text-align: left;
      margin-left: 15px;
    }
  }
  
`

const NftList = () => {

  const fullList = Array(orderBy(nfts, 'sortOrder'))[0]
  const [displayList, setDisplayList] = useState([])
  const increment = 10 // MAKE SURE INCREMENTS ARE DIVISIBLE FOR TOTAL NFT
  const { ownerOf } = useContext(NftProviderContext)
  const [ ownedOnly, setOwnedOnly ] = useState(false)
  const { account } = useWallet()
  const ownedNfts = nfts.filter((nft)=>{
    if (account) {
      if(String(ownerOf(nft.bunnyId)).toLowerCase() === account.toLowerCase()){
        return nft
      }
    }
    return null
  })

  console.log(ownedNfts, 'owned nfts')

  const addIncrement = () => {
    fullList.slice(displayList.length, displayList.length + increment).map((item)=>{
      if(displayList.length < fullList.length){
        setDisplayList(prevList => [...prevList, item])
      }
      return 0
    })
  }

  console.log(displayList, 'display list')
  
  return (
    <>
      <ToggleWrapper>
        <Switch checked={ownedOnly} onChange={() => setOwnedOnly(!ownedOnly)} onColor='#6E4EED' />
        <ToggleText>Show Owned only</ToggleText>
      </ToggleWrapper>
      <Features>
          <Feature>
            <FaExclamationTriangle /><br />
            <p>Only bid for already distributed NFTs <span style={{"color": "#0073ff"}}>(ids.: 7, 8, 11, 17, 22)</span>. </p>
          </Feature>
          <Feature>
            <FaInfoCircle /><br />
            <p>To cancel a bid, hit <span style={{"color": "#0073ff"}}><FaTrashAlt style={{"fill": "#0073ff"}} /> delete</span> in the <i>get this NFT</i> popup.</p>
          </Feature>
          <Feature>
            <FaQuestionCircle /><br />
            <p>We encourage the use of <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://thelabfinance.medium.com/the-lab-finance-nft-system-215bf5b8082">this guide</a> before proceeding </p>
          </Feature>
        </Features>
      <ResponsiveMasonry columnsCountBreakPoints={{540: 1, 860: 2, 1200: 3, 1360: 4}}>
        <Masonry gutter="15px">
            {( !ownedOnly ? (
                nfts.map((nft) => (
                  <div key={nft.name}>
                    <NftCard nft={nft} />
                  </div>
                ))
            ) : (
                ownedNfts.map((nft) => (
                  <div key={nft.name}>
                    <NftCard nft={nft} />
                  </div>
                ))
            ))}

        </Masonry>
      </ResponsiveMasonry>
    </>
  )
}

export default NftList
