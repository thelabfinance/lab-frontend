import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import useBlock from 'hooks/useBlock'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import Nft, { RABBIT_MINTING_FARM_ADDRESS, rewardsPools } from 'config/constants/nfts'
import multicall from 'utils/multicall'
import {
  getPancakeRabbitContract,
  getRewardSplitterContract,
  getDevFeeProcessorContract,
  getNftSaleContract,
} from '../utils/contracts'

interface NftProviderProps {
  children: ReactNode
}

type BunnyMap = {
  [key: number]: number[]
}

type OwnerMap = {
  [key: number]: string[]
}

type BalancesMap = {
  [key: number]: string[]
}

type PricesMap = {
  [key: string]: unknown
}

type TradingData = {
  [key: number]: TradingDataItem
}

export type TradingDataItem = {
  ownerPrice: number
  isOnSale: boolean
  highestBid: number
  highestBidder: string
}

type ApprovedMap = {
  [key: number]: string[]
}

type State = {
  isInitialized: boolean
  countBunniesBurnt: number
  endBlockNumber: number
  startBlockNumber: number
  totalSupplyDistributed: number
  currentDistributedSupply: number
  balanceOf: number
  bunnyMap: BunnyMap
  ownerMap: OwnerMap
  balancesMap: BalancesMap
  tradingData: TradingData
  approvedMap: ApprovedMap
}

type Context = {
  canBurnNft: boolean
  getTokenIds: (bunnyId: number) => number[]
  ownerOf: (bunnyId: number) => string[]
  getBalances: (bunnyId: number) => string[]
  getTradingData: (bunnyId: number) => TradingDataItem
  getApproved: (bunnyId: number) => string[]
  reInitialize: () => void
  account: string
  rewardsPools: Record<string, unknown>
} & State

export const NftProviderContext = createContext<Context | null>(null)
const NftProvider: React.FC<NftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    countBunniesBurnt: 0,
    startBlockNumber: 0,
    endBlockNumber: 0,
    totalSupplyDistributed: 0,
    currentDistributedSupply: 0,
    balanceOf: 0,
    bunnyMap: {},
    ownerMap: {},
    balancesMap: {},
    tradingData: {},
    approvedMap: {},
  })
  const { account } = useWallet()
  // const currentBlock = useBlock()

  const { isInitialized } = state

  const getNftData = async () => {
    const nftData = await fetch('https://us-central1-thelabfinance-f96f8.cloudfunctions.net/readNftData')
    const response = nftData.json()

    return response
  }

  const getPrices = async () => {
    // GET PRICES
    const baseUrl = 'https://fierce-crag-19051.herokuapp.com/https://api.pancakeswap.com/api/v1'
    const response = await fetch(`${baseUrl}/stat`)
    const responsedata = await response.json()
    const laboWbnbPrice = responsedata.trade_pairs.filter((pair) => {
      if (pair.base_symbol === 'LABO' && pair.quote_symbol === 'WBNB') {
        return pair
      }
      return null
    })
    const laboBusdPrice = responsedata.trade_pairs.filter((pair) => {
      if (pair.base_symbol === 'LABO' && pair.quote_symbol === 'BUSD') {
        return pair
      }
      return null
    })
    const wbnbBusdPrice =
      laboWbnbPrice.length && laboBusdPrice.length ? laboBusdPrice[0].last_price / laboWbnbPrice[0].last_price : 0
    const pricesMap: PricesMap = {}
    pricesMap.WBNB = wbnbBusdPrice
    pricesMap.BUSD = 1
    pricesMap.USDT = 1

    const SINGLE_TOKENS = ['DOT','CAKE','ADA','BTCB','EGG','WBNB','LABO','BUSD','AUTO','ETH','DAI','USDC','BSCX']

    const pricesList = responsedata.trade_pairs
      .filter((pair) => {

        if(pair.quote_symbol === 'BUSD' && SINGLE_TOKENS.includes(pair.base_symbol) || 
        pair.base_symbol === 'BUSD' && SINGLE_TOKENS.includes(pair.quote_symbol) || 
        pair.quote_symbol === 'WBNB' && SINGLE_TOKENS.includes(pair.base_symbol) || 
        pair.base_symbol === 'WBNB' && SINGLE_TOKENS.includes(pair.quote_symbol) ){
          return pair
        }
        return null;

      })
      .map((pair) => {
        if (pair.quote_symbol === 'BUSD') {
          return {
            baseToken:pair.base_symbol,
            tokenPrice:pair.last_price
          }
        }
        if (pair.quote_symbol === 'WBNB') {
          return {
            baseToken:pair.base_symbol,
            tokenPrice: pair.last_price * wbnbBusdPrice
          }
        }
        if (pair.base_symbol === 'BUSD') {
          return {
            baseToken: pair.quote_symbol,
            tokenPrice: 1 / pair.last_price
          }
        }
        if (pair.base_symbol === 'WBNB' && pair.quote_symbol !== 'BUSD') {
          return {
            baseToken: pair.quote_symbol,
            tokenPrice: 1 / (pair.last_price * wbnbBusdPrice)
          }
        }
        return null
      })
      .map((pair) => {
        pricesMap[pair.baseToken.toUpperCase()] = pair.tokenPrice
        return pair
      })

    return pricesMap
  }

  // Static data
  useEffect(() => {
    const fetchContractData = async () => {
      const rewardSplitterContract = getRewardSplitterContract()
      const devFeeProcessorContract = getDevFeeProcessorContract()
      const nftSaleContract = getNftSaleContract()

      const nftData = await getNftData()

      let balancesMap: BalancesMap = {}

      // const priceOf = await getPrices()

      const getBalanceCloud = async (bunnyId: number, tokenAddr: string, tokenSymbol: string, isTokenOnly: boolean) => {
        const nftInstance = nftData.filter((nft) => {
          if (nft.nftId === bunnyId) {
            return nft
          }
          return null
        })[0]

        // const balance = await rewardSplitterContract.methods.getBalance(tokenAddr, bunnyId).call()
        const balanceInstance = nftInstance.balances.filter((balance) => {
          if (balance.address.toLowerCase() === tokenAddr.toLowerCase()) {
            return balance
          }
          return null
        })[0]

        const balance = balanceInstance.balance
        const totalRewards = balanceInstance.totalRewards
        const nftRewards = balanceInstance.nftRewards
        // const totalRewards = await devFeeProcessorContract.methods.tokenBalance(tokenAddr).call()
        // const nftRewards = (Number(totalRewards)*0.35)/50
        return {
          nftInstance,
          balance,
          totalRewards,
          nftRewards,
          isTokenOnly,
          tokenSymbol,
        }
      }

      const balancesPromises = []
      for (let i = 1; i <= Nft.length; i++) {
        const balancePromises = []
        Object.keys(rewardsPools).forEach(async (key) => {
            balancePromises.push(
              await getBalanceCloud(i, rewardsPools[key].address, key, rewardsPools[key].isTokenOnly),
            )
          })
        balancesPromises.push(balancePromises)
      }

      balancesMap = await Promise.all(balancesPromises)

      // GET TRADING DATA

      let tradingData: TradingData = {}

      const getTradingDataCloud = async (bunnyId: number) => {
        const nftInstance = nftData.filter((nft) => {
          if (nft.nftId === bunnyId) {
            return nft
          }
          return null
        })[0]

        const { ownerPrice, isOnSale, highestBid, highestBidder } = nftInstance.tradingData

        return {
          ownerPrice,
          isOnSale,
          highestBid,
          highestBidder,
        }
      }

      const tradingDataPromises = []
      for (let i = 1; i <= Nft.length; i++) {
        tradingDataPromises.push(getTradingDataCloud(i))
      }

      tradingData = await Promise.all(tradingDataPromises)

      if (process.env.REACT_APP_DEBUG === 'true') console.log(tradingData, 'klk trading data')

      setState((prevState) => ({
        ...prevState,
        balancesMap,
        tradingData,
      }))
    }

    fetchContractData()
  }, [isInitialized])

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const pancakeRabbitsContract = getPancakeRabbitContract()
        const rewardSplitterContract = getRewardSplitterContract()
        const devFeeProcessorContract = getDevFeeProcessorContract()
        const nftSaleContract = getNftSaleContract()

        const nftData = await getNftData()

        if (process.env.REACT_APP_DEBUG === 'true')
          console.log(
            [pancakeRabbitsContract, rewardSplitterContract, devFeeProcessorContract, nftSaleContract],
            'contracts',
          )

        // DECLARE MAPPING OBJECTS

        let bunnyMap: BunnyMap = {}
        let ownerMap: OwnerMap = {}
        let balancesMap: BalancesMap = {}
        let approvedMap: ApprovedMap = {}

        const getOwnerOfCloud = async (bunnyId: number) => {
          const nftInstance = nftData.filter((nft) => {
            if (nft.nftId === bunnyId) {
              return nft
            }
            return null
          })[0]

          return nftInstance && nftInstance.governanceData && nftInstance.governanceData.ownerOf
            ? nftInstance.governanceData.ownerOf
            : undefined
        }

        const ownersPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          ownersPromises.push(getOwnerOfCloud(i))
        }

        const ownersList = await Promise.all(ownersPromises)
        ownerMap = ownersList

        if (process.env.REACT_APP_DEBUG === 'true') console.log(ownerMap, 'owner map')

        const getApprovedForCloud = async (bunnyId: number) => {
          const nftInstance = nftData.filter((nft) => {
            if (nft.nftId === bunnyId) {
              return nft
            }
            return null
          })[0]

          return nftInstance && nftInstance.approvedData && nftInstance.approvedData.ownerOf
            ? nftInstance.approvedData.ownerOf
            : undefined
        }

        const approvedPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          approvedPromises.push(getApprovedForCloud(i))
        }

        const approvedList = await Promise.all(approvedPromises)
        approvedMap = approvedList

        if (process.env.REACT_APP_DEBUG === 'true') console.log(approvedMap, 'approved map')

        // GET BALANCES ARRAY

        // const priceOf = await getPrices()

        const getBalanceCloud = async (
          bunnyId: number,
          tokenAddr: string,
          tokenSymbol: string,
          isTokenOnly: boolean,
        ) => {
          const nftInstance = nftData.filter((nft) => {
            if (nft.nftId === bunnyId) {
              return nft
            }
            return null
          })[0]

          // const balance = await rewardSplitterContract.methods.getBalance(tokenAddr, bunnyId).call()
          const balanceInstance = nftInstance.balances.filter((balance) => {
            if (balance.address.toLowerCase() === tokenAddr.toLowerCase()) {
              return balance
            }
            return null
          })[0]

          const balance = balanceInstance.balance
          const totalRewards = balanceInstance.totalRewards
          const nftRewards = balanceInstance.nftRewards
          // const totalRewards = await devFeeProcessorContract.methods.tokenBalance(tokenAddr).call()
          // const nftRewards = (Number(totalRewards)*0.35)/50
          return {
            nftInstance,
            balance,
            totalRewards,
            nftRewards,
            isTokenOnly,
            tokenSymbol,
          }
        }

        const balancesPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          const balancePromises = []
          Object.keys(rewardsPools).forEach(async (key) => {
            balancePromises.push(
              await getBalanceCloud(i, rewardsPools[key].address, key, rewardsPools[key].isTokenOnly),
            )
          })
          balancesPromises.push(balancePromises)
        }

        balancesMap = await Promise.all(balancesPromises)

        // GET TRADING DATA

        let tradingData: TradingData = {}

        const getTradingDataCloud = async (bunnyId: number) => {
          const nftInstance = nftData.filter((nft) => {
            if (nft.nftId === bunnyId) {
              return nft
            }
            return null
          })[0]

          const { ownerPrice, isOnSale, highestBid, highestBidder } = nftInstance.tradingData

          return {
            ownerPrice,
            isOnSale,
            highestBid,
            highestBidder,
          }
        }

        const tradingDataPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          tradingDataPromises.push(getTradingDataCloud(i))
        }

        tradingData = await Promise.all(tradingDataPromises)

        // SET STATE FOR ALL

        setState((prevState) => ({
          ...prevState,
          ownerMap,
          balancesMap,
          tradingData,
          approvedMap,
        }))

        // If the "balanceOf" is greater than 0 then retrieve the tokenIds
        // owned by the wallet, then the bunnyId's associated with the tokenIds
        const balanceOf = 1
        if (balanceOf > 0) {
          const getTokenIdAndBunnyId = async (index: number) => {
            try {
              const tokenId = await pancakeRabbitsContract.methods.tokenOfOwnerByIndex(account, index).call()
              const bunnyId = await pancakeRabbitsContract.methods.getBunnyId(tokenId).call()
              if (process.env.REACT_APP_DEBUG === 'true')
                console.log(`${tokenId} token ID and ${bunnyId} bunny ID of account: ${account}`)

              return [parseInt(bunnyId, 10), parseInt(tokenId, 10)]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndBunnyId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          // While improbable a wallet can own more than one of the same bunny so the format is:
          // { [bunnyId]: [array of tokenIds] }
          bunnyMap = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [bunnyId, tokenId] = association

            return {
              ...accum,
              [bunnyId]: accum[bunnyId] ? [...accum[bunnyId], tokenId] : [tokenId],
            }
          }, {})
        }

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
          bunnyMap,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  const canBurnNft = false; // currentBlock <= state.endBlockNumber
  const getTokenIds = (bunnyId: number) => state.bunnyMap[bunnyId]
  const ownerOf = (bunnyId: number) => state.ownerMap[bunnyId - 1]
  const getBalances = (bunnyId: number) => state.balancesMap[bunnyId - 1]
  const getTradingData = (bunnyId: number) => state.tradingData[bunnyId - 1]
  const getApproved = (bunnyId: number) => state.approvedMap[bunnyId - 1]

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider
      value={{
        ...state,
        canBurnNft,
        getTokenIds,
        ownerOf,
        getBalances,
        getTradingData,
        getApproved,
        rewardsPools,
        reInitialize,
        account,
      }}
    >
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider
