import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'
import './index.css'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`
const Sub = styled.p`
  font-size: 0.97em;
  color: #555;
`

const Wrapper = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = ( eggPrice.times(circSupply).isNaN() || ! eggPrice.times(circSupply).isFinite() ? new BigNumber(0) : eggPrice.times(circSupply) );
  let vikingPerBlock = 0;
  if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
  if(farms && farms[0] && farms[0].vikingPerBlock){
    vikingPerBlock = new BigNumber(farms[0].vikingPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats style={{"boxShadow":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)"}}>
      <CardBody>
        <Wrapper>
          <Title>
            Stats
          </Title>
          <Row>
            <Sub>Total Supply</Sub>
            <Sub className="lightColor">
              {cakeSupply && <CardValue value={cakeSupply} decimals={0} />}
            </Sub>
          </Row>
          <Row>
            <Sub>Market Cap</Sub>
            <Sub className="lightColor">{ !marketCap.isZero() ? <CardValue value={getBalanceNumber(marketCap)} decimals={0} prefix="$" /> : '...loading' }</Sub>
          </Row>
          <Row>
            <Sub>Total Burned</Sub>
            <Sub className="lightColor">
              <CardValue value={getBalanceNumber(burnedBalance)} decimals={0} />
            </Sub>
          </Row>
          <Row style={{'marginBottom': '0 !important'}}>
            <Sub>New LABO/Block</Sub>
            <Sub className="lightColor">
              {vikingPerBlock}
            </Sub>
          </Row>
        </Wrapper>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
