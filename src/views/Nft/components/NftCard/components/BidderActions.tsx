import React, { useState, useContext, useCallback } from 'react'
import useI18n from 'hooks/useI18n'
import {
    Button,
    useModal
  } from '@pancakeswap-libs/uikit'
import { Nft } from 'config/constants/types'
import ClaimNftRewardsModal from '../../ClaimNftRewardsModal'
import ClaimNftModal from '../../ClaimNftModal'
import BurnNftModal from '../../BurnNftModal'
import TradeNftModal from '../../TradeNftModal'
import MakeOfferModal from '../../MakeOfferModal'
import { NftProviderContext } from '../../../contexts/NftProvider'
import { getPancakeRabbitContract } from '../../../utils/contracts'


interface BidderActionsProps {
    nft: Nft
    balances: Array<any>
  }
  

const BidderActions: React.FC<BidderActionsProps> = ({ nft, balances }) => {
    const [state, setState] = useState({
        isLoading: false,
        isOpen: false,
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
        reInitialize,
        getTradingData,
        getApproved
      } = useContext(NftProviderContext)
      const { bunnyId } = nft
    const tokenIds = getTokenIds(bunnyId)
    const approvedAddress = String(getApproved(bunnyId))
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
    const handleSuccess = () => {
        fetchDetails()
        reInitialize()
      }
      const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onSuccess={handleSuccess} />)
      const [onPresentClaimRewardsModal] = useModal(<ClaimNftRewardsModal nft={nft} balances={balances} onSuccess={handleSuccess} viewMode/>)
      const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
      const [onPresentTradeNftModal] = useModal(
        <TradeNftModal nft={nft} approvedAddress={approvedAddress} tradingData={getTradingData(nft.bunnyId)} isOwner={false} onSuccess={handleSuccess} />,
      )
      const [onPresentMakeOfferModal] = useModal(
        <MakeOfferModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
      )

      return(
       <>
        <Button fullWidth mt="24px" onClick={onPresentTradeNftModal}>
          Get this NFT
        </Button>        
        <Button fullWidth onClick={onPresentClaimRewardsModal} mt="24px">
          View Rewards
        </Button>
        </>
      )
    
    
}

export default BidderActions