import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useBlock from 'hooks/useBlock'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import Nft, { RABBIT_MINTING_FARM_ADDRESS, rewardsPools } from 'config/constants/nfts'
import multicall from 'utils/multicall'
import { getPancakeRabbitContract, getRewardSplitterContract, getDevFeeProcessorContract, getNftSaleContract } from '../utils/contracts'

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
  [key: number]: string[]
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
  getTradingData: (bunnyId: number) => string[]
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
    approvedMap: {}
  })
  const { account } = useWallet()
  const currentBlock = useBlock()

  const { isInitialized } = state

  const getPrices = async () =>{
    // GET PRICES
    const baseUrl = 'https://fierce-crag-19051.herokuapp.com/https://api.pancakeswap.com/api/v1'
    const response = await fetch(`${baseUrl}/stat`)
    const responsedata = await response.json()
    const laboWbnbPrice = responsedata.trade_pairs.filter((pair)=>{
      if (
        pair.base_symbol === 'LABO' && pair.quote_symbol === 'WBNB'
      ){
        return pair
      }
      return null
    })
    const laboBusdPrice = responsedata.trade_pairs.filter((pair)=>{
      if (
        pair.base_symbol === 'LABO' && pair.quote_symbol === 'BUSD'
      ){
        return pair
      }
      return null
    })
    const wbnbBusdPrice = ( laboWbnbPrice.length && laboBusdPrice.length ? laboBusdPrice[0].last_price / laboWbnbPrice[0].last_price : 0 )
    const pricesMap: PricesMap = {}
    pricesMap.WBNB = wbnbBusdPrice
    pricesMap.BUSD = 1
    pricesMap.USDT = 1
    const pricesList = responsedata.trade_pairs.filter((pair)=>{

      // TOKEN - BUSD

      if ( 
        (
          pair.base_symbol === 'DOT' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'Cake' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'ADA' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'BTCB' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'EGG' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'WBNB' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'LABO' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'BUSD' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'AUTO' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'ETH' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'DAI' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'USDC' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'BSCX' && pair.quote_symbol === 'BUSD'
        ) ||
        (
          pair.base_symbol === 'LABO' && pair.quote_symbol === 'BUSD'
        ) 
      ){
        return pair
      } 

       // BUSD - TOKEN

      if ( 
        (
          pair.quote_symbol === 'DOT' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'Cake' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'ADA' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'BTCB' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'EGG' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'WBNB' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'LABO' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'BUSD' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'AUTO' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'ETH' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'DAI' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'USDC' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'BSCX' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'LABO' && pair.base_symbol === 'BUSD'
        ) 
      ){
        return pair
       } 

      // TOKEN - WBNB

      if ( 
        (
          pair.base_symbol === 'DOT' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'Cake' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'ADA' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'BTCB' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'EGG' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'WBNB' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'LABO' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'BUSD' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'AUTO' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'ETH' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'DAI' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'USDC' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'BSCX' && pair.quote_symbol === 'WBNB'
        ) ||
        (
          pair.base_symbol === 'LABO' && pair.quote_symbol === 'WBNB'
        ) 
      ){
        return pair
       } 
      

       // WBNB - TOKEN

      if ( 
        (
          pair.quote_symbol === 'DOT' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'Cake' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'ADA' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'BTCB' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'EGG' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'WBNB' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'LABO' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'BUSD' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'AUTO' && pair.base_symbol === 'WBNB'
        ) ||
        (
          pair.quote_symbol === 'ETH' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'DAI' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'USDC' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'BSCX' && pair.base_symbol === 'BUSD'
        ) ||
        (
          pair.quote_symbol === 'LABO' && pair.base_symbol === 'BUSD'
        ) 
      ){
        return pair
       } 
      
      return null 
    }).map((pair)=>{
      if( pair.quote_symbol === 'BUSD' ){
        const baseToken = pair.base_symbol
        const tokenPrice = pair.last_price
        return {
          baseToken,
          tokenPrice
        }
      }
      if( pair.quote_symbol === 'WBNB' ){
        const baseToken = pair.base_symbol
        const tokenPrice = pair.last_price*wbnbBusdPrice
        return {
          baseToken,
          tokenPrice
        }
      }
      if( pair.base_symbol === 'BUSD'){
        const baseToken = pair.quote_symbol
        const tokenPrice = 1/pair.last_price
        return {
          baseToken,
          tokenPrice
        }
      }
      if( pair.base_symbol === 'WBNB' && pair.quote_symbol !== 'BUSD' ){
        const baseToken = pair.quote_symbol
        const tokenPrice = 1/(pair.last_price*wbnbBusdPrice)
        return {
          baseToken,
          tokenPrice
        }
      }
      return null
    }).map((pair)=>{
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

      let balancesMap: BalancesMap = {}


      const priceOf = await getPrices()


      // GET BALANCES ARRAY

      const getBalance = async (bunnyId: number, tokenAddr: string, tokenSymbol: string, isTokenOnly: boolean) => {
        try {
          const balance = await rewardSplitterContract.methods.getBalance(tokenAddr, bunnyId).call()
          const totalRewards = await devFeeProcessorContract.methods.tokenBalance(tokenAddr).call()
          const nftRewards = (Number(totalRewards)*0.35)/50
          const lpTokens = tokenSymbol.split('-')
          const usdtPrice = ( isTokenOnly ? priceOf[String(lpTokens[0])] : [
            priceOf[String(lpTokens[0])], 
            priceOf[String(lpTokens[1])]
          ] )
          console.log(`${usdtPrice} usdt price of ${tokenSymbol}`)
          const usdtBalance = ( isTokenOnly ? Number(balance)*Number(priceOf[tokenSymbol]) : Number(balance)*Number(priceOf[lpTokens[0]]) + Number(balance)*Number(priceOf[lpTokens[1]]))
          const usdtTotalRewards = ( isTokenOnly ? Number(totalRewards)*Number(priceOf[tokenSymbol]) : Number(totalRewards)*Number(priceOf[lpTokens[0]]) + Number(totalRewards)*Number(priceOf[lpTokens[1]]))
          const usdtNftRewards = ( isTokenOnly ? Number(nftRewards)*Number(priceOf[tokenSymbol]) : Number(nftRewards)*Number(priceOf[lpTokens[0]]) + Number(nftRewards)*Number(priceOf[lpTokens[1]]))
    
          return Object({
            currency: tokenAddr,
            balance,
            usdtBalance,
            tokenSymbol,
            isTokenOnly,
            totalRewards,
            usdtTotalRewards,
            nftRewards,
            usdtNftRewards
          })
        } catch (error) {
          return 0
        }
      }      

      const balancesPromises = []
      for (let i = 1; i <= Nft.length; i++) {
        const balancePromises = []
        Object.keys(rewardsPools).forEach( async (key) => {
          balancePromises.push(await getBalance(i, rewardsPools[key].address, key, rewardsPools[key].isTokenOnly))
        } )
        balancesPromises.push(balancePromises)
      }

      const balanceList = await Promise.all(balancesPromises)
      balancesMap = balanceList

      // GET TRADING DATA

      let tradingData: TradingData = {}

      const getTradingData = async (bunnyId: number) => {
        try {
          const OwnerPrice = await nftSaleContract.methods.getPrice(bunnyId).call()
          const isOnSale = await nftSaleContract.methods.isOnSale(bunnyId).call()
          const highestBid = await nftSaleContract.methods.getHighestBid(bunnyId).call()
          const highestBidder = await nftSaleContract.methods.perTokenBids(bunnyId).call()
          return Object({
            OwnerPrice,
            isOnSale,
            highestBid,
            highestBidder
          })
        } catch (error) {
          console.log(error, nftSaleContract, 'klk')
          return 0
        }
      }

      const tradingDataPromises = []
      for (let i = 1; i <= Nft.length; i++) {
        tradingDataPromises.push(getTradingData(i))
      }

      const tradingDataList = await Promise.all(tradingDataPromises)
      tradingData = tradingDataList

      console.log(tradingData, 'klk')


      setState((prevState) => ({
        ...prevState,
        balancesMap,
        tradingData
      }))

    }

    fetchContractData()
  }, [isInitialized, setState])


  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const pancakeRabbitsContract = getPancakeRabbitContract()
        const rewardSplitterContract = getRewardSplitterContract()
        const devFeeProcessorContract = getDevFeeProcessorContract()
        const nftSaleContract = getNftSaleContract()

        console.log([
          pancakeRabbitsContract,
          rewardSplitterContract,
          devFeeProcessorContract,
          nftSaleContract
        ], 'contracts')
        

        // DECLARE MAPPING OBJECTS

        let bunnyMap: BunnyMap = {}
        let ownerMap: OwnerMap = {}
        let balancesMap: BalancesMap = {}
        let approvedMap: ApprovedMap = {}


        // GET OWNER ARRAY

        const getOwnerOf = async (bunnyId: number) => {
          try {
            const ownerOf = await pancakeRabbitsContract.methods.ownerOf(bunnyId).call()
            console.log(ownerOf, 'owner of')
            return ownerOf
          } catch (error) {
            console.log('owner')
            return ""
          }
        }      

        const ownersPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          ownersPromises.push(getOwnerOf(i))
        }

        const ownersList = await Promise.all(ownersPromises)
        ownerMap = ownersList

        console.log(ownerMap, 'owner map')

        // GET APPROVED ARRAY

        const getApprovedFor = async (bunnyId: number) => {
          try {
            const approvedFor = await pancakeRabbitsContract.methods.getApproved(bunnyId).call()
            console.log(approvedFor, `approved for ${bunnyId}`)
            return approvedFor
          } catch (error) {
            console.log('owner')
            return ""
          }
        }      
        console.log('heeey')
        const approvedPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          approvedPromises.push(getApprovedFor(i))
        }

        const approvedList = await Promise.all(approvedPromises)
        approvedMap = approvedList

        console.log(approvedMap, 'approved map')


        // GET BALANCES ARRAY

        const priceOf = await getPrices()

        const getBalance = async (bunnyId: number, tokenAddr: string, tokenSymbol: string, isTokenOnly: boolean) => {
          try {
            const balance = await rewardSplitterContract.methods.getBalance(tokenAddr, bunnyId).call()
            const totalRewards = await devFeeProcessorContract.methods.tokenBalance(tokenAddr).call()
            const nftRewards = (Number(totalRewards)*0.35)/50
            const lpTokens = tokenSymbol.split('-')
            const usdtPrice = ( isTokenOnly ? priceOf[String(lpTokens[0])] : [
              priceOf[String(lpTokens[0])], 
              priceOf[String(lpTokens[1])]
            ] )
            console.log(`${usdtPrice} usdt price of ${tokenSymbol}`)
            const usdtBalance = ( isTokenOnly ? Number(balance)*Number(priceOf[tokenSymbol]) : Number(balance)*Number(priceOf[lpTokens[0]]) + Number(balance)*Number(priceOf[lpTokens[1]]))
            const usdtTotalRewards = ( isTokenOnly ? Number(totalRewards)*Number(priceOf[tokenSymbol]) : Number(totalRewards)*Number(priceOf[lpTokens[0]]) + Number(totalRewards)*Number(priceOf[lpTokens[1]]))
            const usdtNftRewards = ( isTokenOnly ? Number(nftRewards)*Number(priceOf[tokenSymbol]) : Number(nftRewards)*Number(priceOf[lpTokens[0]]) + Number(nftRewards)*Number(priceOf[lpTokens[1]]))
            
      
            return Object({
              currency: tokenAddr,
              balance,
              usdtBalance,
              tokenSymbol,
              isTokenOnly,
              totalRewards,
              usdtTotalRewards,
              nftRewards,
              usdtNftRewards
            })
          } catch (error) {
            return 0
          }
        }      
        const balancesPromises = []
        for (let i = 1; i <= Nft.length; i++) {
          const balancePromises = []
          Object.keys(rewardsPools).forEach( async (key) => {
            balancePromises.push(await getBalance(i, rewardsPools[key].address, key, rewardsPools[key].isTokenOnly))
          } )
          balancesPromises.push(balancePromises)
        }

        const balanceList = await Promise.all(balancesPromises)
        balancesMap = balanceList

        // GET TRADING DATA

      let tradingData: TradingData = {}

      const getTradingData = async (bunnyId: number) => {
        try {
          const OwnerPrice = await nftSaleContract.methods.getPrice(bunnyId).call()
          const isOnSale = await nftSaleContract.methods.isOnSale(bunnyId).call()
          const highestBid = await nftSaleContract.methods.getHighestBid(bunnyId).call()
          const highestBidder = await nftSaleContract.methods.perTokenBids(bunnyId).call()
          const userBid = await nftSaleContract.methods.getBidBy(bunnyId, account).call()

          console.log(`${userBid} usser bid for nft ${bunnyId}`)
          return Object({
            OwnerPrice,
            isOnSale,
            highestBid,
            highestBidder,
            userBid
          })
        } catch (error) {
          console.log(error, nftSaleContract, 'klk')
          return 0
        }
      }

      const tradingDataPromises = []
      for (let i = 1; i <= Nft.length; i++) {
        tradingDataPromises.push(getTradingData(i))
      }

      const tradingDataList = await Promise.all(tradingDataPromises)
      tradingData = tradingDataList

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
  }, [isInitialized, account, setState])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (bunnyId: number) => state.bunnyMap[bunnyId]
  const ownerOf = (bunnyId: number) => state.ownerMap[bunnyId-1]
  const getBalances = (bunnyId: number) => state.balancesMap[bunnyId-1]
  const getTradingData = (bunnyId: number) => state.tradingData[bunnyId-1]
  const getApproved = (bunnyId: number) => state.approvedMap[bunnyId-1]

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
    <NftProviderContext.Provider value={{ ...state, canBurnNft, getTokenIds, ownerOf, getBalances, getTradingData, getApproved, rewardsPools, reInitialize, account }}>
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider