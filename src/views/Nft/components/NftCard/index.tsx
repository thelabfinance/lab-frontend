import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import ReactCardFlip from 'react-card-flip';
import LazyLoad from 'react-lazyload';
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getPancakeRabbitContract } from '../../utils/contracts'
import ClaimNftModal from '../ClaimNftModal'
import BurnNftModal from '../BurnNftModal'
import TransferNftModal from '../TransferNftModal'
import OwnerActions from './components/OwnerActions'
import BidderActions from './components/BidderActions'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 0 24px 24px;
`

const Value = styled(Text)`
  font-weight: 600;
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    showToggleButton: 0,
    bunnyCount: 0,
    bunnyBurnCount: 0,
  })
  const TranslateString = useI18n()
  const {
    isInitialized,
    canBurnNft,
    totalSupplyDistributed,
    currentDistributedSupply,
    getTokenIds,
    ownerOf,
    account,
    getBalances,
    getTradingData,
    reInitialize,
  } = useContext(NftProviderContext)
  const { bunnyId, name, images, description, video } = nft
  const tokenIds = getTokenIds(bunnyId)
  const isSupplyAvailable = currentDistributedSupply < totalSupplyDistributed
  const walletOwnsNft = tokenIds && tokenIds.length > 0
  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const { methods } = getPancakeRabbitContract()
      const bunnyCount = await methods.bunnyCount(bunnyId).call()
      const bunnyBurnCount = await methods.bunnyBurnCount(bunnyId).call()

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isDataFetched: true,
        bunnyCount: parseInt(bunnyCount, 10),
        bunnyBurnCount: parseInt(bunnyBurnCount, 10),
      }))
    } catch (error) {
      console.error(error)
    }
  }, [bunnyId])


  const openCard = async () => {
      setState((prevState) => ({ ...prevState, isOpen: true }))
  }
  const closeCard = async () => {
    setState((prevState) => ({ ...prevState, isOpen: false}))
  }

  const handleSuccess = () => {
    fetchDetails()
    reInitialize()
  }

  const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onSuccess={handleSuccess} />)
  const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  function getWindowDimensions() {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    return {
      viewportWidth,
      viewportHeight
    };
  }

  function showToggleButton(){
    setState((prevState) => ({ ...prevState, showToggleButton: 1}))
  }

  function hideToggleButton(){
    setState((prevState) => ({ ...prevState, showToggleButton: 0}))
  }

  const {viewportWidth, viewportHeight} = getWindowDimensions()
  
  const webRender = () => {
    const webmBreakpoints = {
      lg: 1200,
      sm: 770,
    }
    if (viewportWidth >= webmBreakpoints.lg) {
      return "lg"
    }
    if (viewportWidth < webmBreakpoints.lg && viewportWidth >= webmBreakpoints.sm){
      return "md"
    }
    return "sm"
  }

  const balanceArray = Array(getBalances(nft.bunnyId))[0]
  if (process.env.REACT_APP_DEBUG === "true") console.log(balanceArray, 'balances')
  const laboBalance = ( balanceArray ? parseFloat(Object(balanceArray.filter(item => Object(item).tokenSymbol === "LABO")[0]).balance)/(10**18) : 0 )

  const owner = String(ownerOf(nft.bunnyId))
  const isOwned = owner === account 
  const isOnSale = Object(getTradingData(nft.bunnyId)).isOnSale

  return (
    <ReactCardFlip isFlipped={state.isOpen}>
      <div className="nftCardImage" onMouseEnter={showToggleButton} onMouseLeave={hideToggleButton}>
        <LazyLoad offset={100}>
          <video autoPlay loop muted width="100%" className="nftCardFront">
              <source src={`/images/nfts/webm/${webRender()}/${video.webm}`} type='video/webm' />
          </video>
        </LazyLoad>
        <Button onClick={openCard} className="cardFlipButton" style={{"borderRadius": "50%", "width": "37px", "height": "37px", "padding": "0", "position": "absolute", "opacity": `${state.showToggleButton}`, "transition": "opacity 6 linear", "top": "25px", "right": "25px"}}><FaEye style={{"fill": "white"}}/></Button>
      </div>
      <Card p="0" isActive={isOwned} className="nftCardBack" onMouseLeave={closeCard}>
        <CardBody p={32}>

        {/*  Card Heading Start */}

        <Header>
            <Heading>{`${bunnyId}. ${name}`}</Heading>
            <div>
            {isInitialized && isOwned && (
              <Tag outline variant="binance">
                Owned
              </Tag>
            )}
            &nbsp;
            &nbsp;
            {( isOnSale ? (
              <Tag outline variant="success">
                On Sale
              </Tag>
            ):(
              <Tag outline variant="failure">
                Only Bidding
              </Tag>
            ))}
            </div>
          </Header>

          {/*  Card Heading End */}

          {/*  Card Info Start */}

          <InfoBlock>
            <Text as="p" mb="16px" color="#778dfc" mt="16px" style={{ textAlign: 'left' }}>
              {description}
            </Text>
            <InfoRow>
              <Text>LABO earned:</Text>
              <Value>{laboBalance.toFixed(4)} LABO</Value>
            </InfoRow>
          </InfoBlock>

          {/*  Card Info End */}

          {/*  Card Actions Start */}
          
          {!isOwned ? <BidderActions nft={nft} balances={balanceArray}/> : <OwnerActions nft={nft} balances={balanceArray}/>}

          {/*  Card Actions End */}


          </CardBody>
      </Card>
    </ReactCardFlip>
  )
}

export default NftCard
