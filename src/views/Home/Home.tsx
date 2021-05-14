import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Alert } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import HomePage from 'components/layout/HomePage'
import labo from 'config/constants/labo'
import InfoFooter from 'components/InfoFooter'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'


const Column = styled.div`
  column-count: 2;
  height: 100%;
  column-gap: 20px;
  
`
const FlowRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media all and (max-width: 1000px) { 
    flex-flow: column;
    align-items: center;
    padding-bottom: 21px;
  }

  @media all and (min-width: 1000px) {
    flex-flow: row-reverse;
    justify-content: space-between
   }



  //ADD SPACE BETWEENS
`

const Cards = styled(BaseLayout)`

  & > div {
    grid-column: span 10;
    width: 100%;
    height: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 10;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 10;
    }
  }
`
const Hero = styled.div`
  @media all and (min-width: 1200px) {
    padding: 47px 12px 0 0;
   }

  @media all and (max-width: 1200px) { 
    padding: 0 12px 47px 12px;
    display: flex;
    justify-content: center;
    max-width: 93%
  }
  
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <div>
    <HomePage>
    {( !labo.isFullyConfigured ? (
        <div className="warningAlert">
        <Alert title="" variant="warning">
        <p>Farms will open after the presale is completed on <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://unicrypt.network/amm/pancake/ilo/0x6745D62C59f0fB5E135867f68090168221e337cb">UniCrypt</a></p>
      </Alert>
    </div>
      ) : "" )}
      <FlowRow>
        <Hero>
            <object type="image/svg+xml" data="images/labhero.svg" className="labhero">&nbsp;</object>
        </Hero>
        <Cards className="CardsLayout">
                <FarmStakingCard/>
                <CakeStats />
                <TotalValueLockedCard />
        </Cards>
      </FlowRow>
    </HomePage>
    <InfoFooter />
    </div>
  )
}

export default Home
