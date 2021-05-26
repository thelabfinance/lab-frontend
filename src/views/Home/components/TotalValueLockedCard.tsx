import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  border-radius: 14px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`
const Sub = styled.p`
  font-size: 14px;
  color: gray;
`

const Wrapper = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
`

const TVL = styled.div`
font-weight: 900 !important;
font-size: 23px !important;
margin-bottom: 6px;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue();
  // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard>
      <CardBody style={{'width': '100%'}}>
        <Wrapper>
        <Title>
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Title>
          {/* <Heading size="xl">{`$${tvl}`}</Heading> */}
          <TVL>
            <CardValue value={totalValue.toNumber()} prefix="$" decimals={2} />
          </TVL>
          <Sub color="textSubtle">{TranslateString(999, 'Across all Farms and Pools')}</Sub>
        </Wrapper>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
