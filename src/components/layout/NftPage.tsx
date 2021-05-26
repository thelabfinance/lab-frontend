import styled from 'styled-components'
import NftContainer from './NftContainer'

const NftPage = styled(NftContainer)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 21px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 32px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 21px;
    padding-bottom: 120px;
  }
`

export default NftPage
