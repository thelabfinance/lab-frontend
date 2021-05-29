/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Input, Modal, Text } from '@pancakeswap-libs/uikit'
import { NFT_SALE_ADDRESS, PANCAKE_RABBITS_ADDRESS } from 'config/constants/nfts'
import { Nft } from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js/bignumber'
import { useNftSaleContract, usePancakeRabbits, useRabbitMintingFarm } from 'hooks/useContract'
import ReactTooltip from 'react-tooltip';
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import InfoRow from './InfoRow'

const Web3Utils = require('web3-utils');



interface TradeNftModalProps {
  nft: Nft
  isOwner: boolean
  tradingData: unknown
  approvedAddress: string
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
  color: #4c68ef !important;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const Label = styled.label`
  color: #23439c;
  display: block;
  margin-bottom: 8px;
  margin-top: 21px;
`

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #666 !important;
  margin-top: 21px;

  &::before,
  &::after{
    content: '';
    flex: 1;
    border-bottom: 1px solid #999;
  }
  &:not(:empty)::before {
    margin-right: .25em;
  }
  
  &:not(:empty)::after {
    margin-left: .25em;
  }
`
const FlexRow = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

const TransferNftModal: React.FC<TradeNftModalProps> = ({ nft, approvedAddress, tradingData, isOwner, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [transactionSent, setTransactionSent] = useState(false)
  const nftSaleContract = useNftSaleContract(NFT_SALE_ADDRESS)
  const nftContract = usePancakeRabbits(PANCAKE_RABBITS_ADDRESS)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const ownerPrice = Number(Object(tradingData).OwnerPrice)/10**18
  const isApproved = approvedAddress.toUpperCase() === NFT_SALE_ADDRESS.toUpperCase()
  const isOnSale = Object(tradingData).isOnSale
  const highestBid = Number(Object(tradingData).highestBid)/10**18
  const highestBidder = String(Object(tradingData).highestBidder)
  const userBid = Number(String(Object(tradingData).userBid))/10**18
  const userHasBid = Boolean(userBid)
  const isHighestBidder = ( highestBidder && account ? (highestBidder.toUpperCase() === account.toUpperCase()) : null )

  if (process.env.REACT_APP_DEBUG === "true") console.log(`${userBid} user bid for nft ${nft.bunnyId}`)


  const handleConfirm = async () => {
    try {
      if (!isOwner) {
        if (process.env.REACT_APP_DEBUG === "true") console.log(`${value} BID BNB FOR NFT ${nft.bunnyId} FROM ${account}`)
        if (process.env.REACT_APP_DEBUG === "true") console.log(nftSaleContract.methods, 'nft sale methods')
        const bidPrice = (Number(value)*(10**18)).toString()
        await nftSaleContract.methods
        .bid(nft.bunnyId).send({
          from: account,
          value: bidPrice
        }).then(()=>{
          window.location.reload()
        })
      }else{
        const salePrice = (Number(value)*(10**18)).toString()
        if (process.env.REACT_APP_DEBUG === "true") console.log(typeof salePrice, 'type of sale price')
        await nftSaleContract.methods
        .putOnSale(nft.bunnyId, salePrice).send({
          from: account,
        }).then(()=>{
          window.location.reload()
        })
      }
    } catch (err) {
      console.error('Unable to put on sale:', err)
    }
    return 0
  }

  const approveNft = async() => {
    try{
      await nftContract.methods
        .approve(NFT_SALE_ADDRESS, nft.bunnyId).send({
          from: account,
        }).then(()=>{
          window.location.reload()
        })
    }catch(err){
      console.error(err)
    }
  }

  const handleBuy = async() => {
    try{
      await nftSaleContract.methods
        .buy(nft.bunnyId).send({
          from: account,
          value: new BigNumber(ownerPrice*(10**18))
        }).then(()=>{
          window.location.reload()
        })
    }catch(err){
      console.error(err, 'buy nft')
    }
  }

  const handleDeleteOffer = async() => {
    try{
      await nftSaleContract.methods
        .takeOffSale(nft.bunnyId).send({
          from: account
        }).then(()=>{
          window.location.reload()
        })
    }catch(err){
      console.error(err, 'delete offer')
    }
  }

  const handleDeleteBid = async() => {
    try{
      await nftSaleContract.methods
        .cancelBid(nft.bunnyId).send({
          from: account
        }).then(()=>{
          window.location.reload()
        })
    }catch(err){
      console.error(err, 'delete bid')
    }
  }

  const handleBidSell = async() => {
    try{
      await nftSaleContract.methods
        .acceptHighestBid(nft.bunnyId).send({
          from: account
        }).then(()=>{
          window.location.reload()
        })
    }catch(err){
      console.error(err, 'handle bid sell')
    }
  }

  if (process.env.REACT_APP_DEBUG === "true") console.log(Object(tradingData).OwnerPrice, 'trading data on modal')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(inputValue)
  }

  return (
    <Modal title={( isOwner ? `Trade ${nft.name}` : `Bid for ${nft.name}`)} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text mb="8px">
            {error}
          </Text>
        )}

        {( transactionSent ? (
          <p style={{'color': '#fff !important', 'marginBottom': '8px'}}>
            <FaInfoCircle /> Transaction sent, refresh this page to see changes. 
          </p>
        ) : (
          <></>
        ) )}
        <InfoRow>
        {(
            !isOwner ? 
            (
            <>
            {(
              isOnSale ? (
                <>
                  <Text>Price Set by Owner:</Text>
                  <Value>{ownerPrice} BNB</Value>
                </>
              ) : (
                <>
                </>
              )
            )}
            </>
            )
              :
            (
              <>
                <Text>Current Highest Bid:</Text>
                <Value>{highestBid.toFixed(4)} BNB</Value>
              </>
            )
          
          )}
        </InfoRow>
        {( account ? 
          (
            <>
            {(isOwner ? 
                <>
                  { ((highestBid > 0) ? (
                    <>
                      <Button style={{'marginTop': '12px'}} fullWidth onClick={handleBidSell}>
                        Sell For Bid Price
                      </Button>
                    </>
                  ) : (
                    <>
                    </>
                  ) ) }
                  <Separator>or</Separator>
                </>
                :
                <>
                {( isOnSale ? (
                    <>
                      <Button style={{'marginTop': '12px'}} fullWidth onClick={handleBuy}>
                        Buy Now
                      </Button>   
                      <Separator>or</Separator>
                    </>
                  ):(
                    ""
                  ) 
                )}
                </>
              )}
          
            <br />
            {(!isOwner ? (
              <>
                <InfoRow>
                    <Text>Current Highest Bid:</Text>
                    <Value>{highestBid.toFixed(4)} BNB</Value>
                </InfoRow>
                <Separator>or</Separator>
              </>
            ):(<></>))}
            <InfoRow>
          {(
            isOwner ? 
            (
            <>
              {( isOnSale ? (
                <>
                   <Text>Price Set By You:</Text>
                  <Value>{ownerPrice.toFixed(4)} BNB</Value>
                  <ReactTooltip id='doggFace' type='info'>
                    <span style={{'color': 'white'}}>Delete Offer</span>
                  </ReactTooltip>
                  <Button onClick={handleDeleteOffer} variant="subtle" size="sm" style={{'borderRadius': '5px', 'marginTop': '5px', 'width': '33px', 'height': '33px', 'padding': '1px'}} data-tip data-for='doggFace'><FaTrashAlt style={{'fill': 'white'}}/></Button>
                </>
              ) : (
                <>
                </>
              ))}
            </>
            )
              :
            (
              <>

              {( userHasBid ? (
                 <>
                  <br/>
                  <Text>Your Bid:</Text>
                  <Value>{userBid.toFixed(4)} BNB</Value>
                  <ReactTooltip id='catFace' type='info'>
                    <span style={{'color': 'white'}}>Delete Bid</span>
                  </ReactTooltip>
                  <Button onClick={handleDeleteBid} variant="subtle" size="sm" style={{'borderRadius': '5px', 'backgroundColor': '#4c68ef', 'marginTop': '5px', 'width': '33px', 'height': '33px', 'padding': '1px'}} data-tip data-for='catFace'><FaTrashAlt style={{'fill': 'white'}}/></Button>
                </>
              ) : (
                <>
                  &nbsp;
                </>
              ) )}
              </>
            )
          
          )}
          </InfoRow>
  
            <Label htmlFor="transferAddress">{( !isOwner ? 'Make a Bid' : 'Set New Price' )}</Label>
            {( isOwner ? (
              <>
                {( isApproved ? (
                   <Input
                   id="transferAddress"
                   name="address"
                   type="number"
                   placeholder="0.0000 BNB"
                   value={value}
                   onChange={handleChange}
                   isWarning={error}
                   disabled={isLoading}
                   style={{
                     'color': "blue !important"
                   }}
                 />
                ):(
                  <Button style={{'marginTop': '12px'}} fullWidth onClick={approveNft}>
                    Approve to Continue
                  </Button> 
                ) )}
              </>
            ) : (
              <>
                 <Input
                   id="transferAddress"
                   name="address"
                   type="number"
                   placeholder={( userHasBid ? "Delete your bid to make a new one" : "0.0000 BNB" )}
                   value={value}
                   onChange={handleChange}
                   isWarning={error}
                   disabled={isLoading || userHasBid}
                   style={{
                     'color': "blue !important"
                   }}
                 />
              </>
            ) )}
           
            </>
          ) : (
            <>
              <br />
             <UnlockButton fullWidth/>
            </>
          )
        )}
       
      </ModalContent>
      <Actions>
        {( account ? (
         <>
         <Button fullWidth onClick={onDismiss}>
            {TranslateString(462, 'Cancel')}
          </Button>
          <Button fullWidth onClick={handleConfirm} disabled={!account || isLoading || !value || userHasBid}>
            {TranslateString(464, 'Confirm')}
          </Button>
        </>
        ):(
          ""
        ))}
      </Actions>
    </Modal>
  )
}

export default TransferNftModal
