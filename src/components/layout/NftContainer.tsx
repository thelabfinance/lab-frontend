import styled from 'styled-components'

const NftContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 84%;
  padding-left: 12px;
  padding-right: 12px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export default NftContainer
