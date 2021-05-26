import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Switch from "react-switch";

const FarmTabButtons = ({ stakedOnly, setStakedOnly, tokenMode }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ActionsWrapper>
        <ToggleWrapper>
          <Switch checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} onColor='#6E4EED' />
        <Text> {TranslateString(699, 'Staked only')}</Text>
        </ToggleWrapper>
        <ButtonMenu activeIndex={isExact ? 0 : 1} size="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}`}>
            {TranslateString(698, 'Active')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {TranslateString(700, 'Inactive')}
          </ButtonMenuItem>
        </ButtonMenu>
      </ActionsWrapper>
      { !tokenMode ?
        <Blablabla>
          Follow <a target="_blanK" rel="noreferrer" href="https://docs.thelab.finance/guides/add-liquidity-labo-wbnb-lp-labo-busd-lp"><GuideLink>these steps</GuideLink></a> to add liquidity and farm with LP tokens.
        </Blablabla>
       : 
       "" 
       }
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 32px;
  
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 21px;
  @media all and (max-width: 480px) {
      flex-flow: column;
  }
  
  
`
const Blablabla = styled.div`
  text-color: red;
  margin: 0px 21px;
`
const GuideLink = styled.span`
  color: #0073ff;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  @media all and (max-width: 480px) {
    margin-bottom: 21px;
}
  


  ${Text} {
    margin-left: 8px;
  }
`