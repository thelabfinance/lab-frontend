import React, { useState, useContext, useCallback } from 'react'
import useI18n from 'hooks/useI18n'
import {
    Button,
    useModal
  } from '@pancakeswap-libs/uikit'
import { Nft } from 'config/constants/types'
import ClaimNftRewardsModal from '../../ClaimNftRewardsModal'
import BurnNftModal from '../../BurnNftModal'
import TradeNftModal from '../../TradeNftModal'
import MakeOfferModal from '../../MakeOfferModal'
import VoteProposalModal from '../../VoteProposalModal'
import { NftProviderContext } from '../../../contexts/NftProvider'
import { getPancakeRabbitContract } from '../../../utils/contracts'


interface OwnerActionsProps {
    nft: Nft
    balances: Array<any>
  }
  

const OwnerActions: React.FC<OwnerActionsProps> = ({ nft, balances }) => {
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
    const approvedAddres = String(getApproved(bunnyId))
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
      const [onPresentClaimRewardsModal] = useModal(<ClaimNftRewardsModal nft={nft} balances={balances} onSuccess={handleSuccess} viewMode={false}/>)
      const [onPresentVoteModal] = useModal(<VoteProposalModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
      const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
      const [onPresentTradeNftModal] = useModal(
        <TradeNftModal nft={nft} approvedAddress={approvedAddres} tradingData={getTradingData(nft.bunnyId)} isOwner onSuccess={handleSuccess} />,
      )
      const [onPresentMakeOfferModal] = useModal(
        <MakeOfferModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,

      )

      return(
      <>
        <Button fullWidth onClick={onPresentTradeNftModal} mt="24px">
          Trade
        </Button>
        <Button fullWidth onClick={onPresentClaimRewardsModal} mt="24px">
          Claim Rewards
        </Button>
      </>
    
    )
    
}

export default OwnerActions