import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Ticket } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`
const LaboTicketIcon: React.FC<any> = () => (
  <div style={{width: '86px', display: 'flex', flexFlow: 'row', 'justifyContent': 'center'}}>
    <object type="image/svg+xml" data="images/mobileUtil.svg" width="72px">&nbsp;</object>
  </div>
)

const UnlockWalletCard = () => {
  const TranslateString = useI18n()

  return (
    <Card isActive>
      <StyledCardBody>
        <IconWrapper>
          <LaboTicketIcon />
        </IconWrapper>
        <StyledHeading size="md">{TranslateString(999, 'Unlock wallet to access lottery')}</StyledHeading>
        <UnlockButton />
      </StyledCardBody>
    </Card>
  )
}

export default UnlockWalletCard
