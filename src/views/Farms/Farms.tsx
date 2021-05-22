import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import labo from 'config/constants/labo'
import { provider } from 'web3-core'
import { Image, Heading, Alert } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import { FaUserCheck, FaLock, FaHistory } from 'react-icons/fa';
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'


export interface FarmsProps{
  tokenMode?: boolean
}

const Title = styled.p`
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;

`
const Sub = styled.p`
  text-align: center;
  font-size: 1em;
  color: #6E4EED;
  margin-bottom: 25px;
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
    max-width: 64%;
    flex-flow: row;
    align-items: flex-start;
    & > svg{
      width: 42px;
    }
    & > p{
      text-align: left;
      margin-left: 15px;
    }
  
`
const FeatureLink = styled.a`
  color: yellow !important
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;
  const [modalOpen, setModalOpen] = useState(true) 
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  
  if (process.env.REACT_APP_DEBUG) console.log(cakePrice, "testingg cakePrice");

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }

        const cakeRewardPerBlock = new BigNumber(farm.vikingPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (process.env.REACT_APP_DEBUG) console.log(farm.poolWeight, 'hey')

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice);
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum],
  )

  return (
    <Page>

<div className="warningAlert" style={{'display': ( modalOpen ? 'block' : 'none' )}}>
        <Alert title="" variant="warning" onClick={handleModal}>
        <p>Version 1 LP tokens are not giving rewards anymore. Please, <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://docs.thelab.finance/guides/unstake-v1-lp-tokens-from-farms-and-migrate-to-v2">migrate your LP tokens</a> from V1 to V2 </p>
      </Alert>
    </div>

      <Hero>
        {tokenMode ? 
        <object type="image/svg+xml" data="images/poolhero.svg" height="370px">&nbsp;</object> :
        <object type="image/svg+xml" data="images/farmhero.svg" width="600px">&nbsp;</object>
        }
      </Hero>
      <div>
        <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} tokenMode={tokenMode}/>
        <Features>
          <Feature>
            <FaUserCheck /><br />
            <p>Audit by <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://github.com/thelabfinance/audits/blob/main/TheLabFinance_SolidGroup.pdf">Solid Group</a></p>
          </Feature>
          <Feature>
            <FaLock /><br />
            <p> 1-year <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://unicrypt.network/amm/pancake/token/0x171401a3d18B21BFa3f9bF4F9637F3691158365A">Liquidity Lock</a></p>
          </Feature>
          <Feature>
            <FaHistory /><br />
            <p>24 hr <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://bscscan.com/address/0x0a974345327c8a7d7fc2e5ed6e2de6343500660e#code">Timelock</a> for <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://bscscan.com/tx/0x8d5f3667ab6c34a74cab47413c387f9118bc08c46a1f3d0ff13614e0eb174f24">MasterChef</a></p>
          </Feature>
        </Features>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
    </Page>
  )
}

const Hero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 0 12px 47px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

export default Farms
