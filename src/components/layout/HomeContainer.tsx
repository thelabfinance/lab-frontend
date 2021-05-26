import styled from 'styled-components'

const HomeContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 86%;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export default HomeContainer
