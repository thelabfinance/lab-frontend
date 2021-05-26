import React, { useState } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import NftPage from 'components/layout/NftPage'
import { Alert } from '@pancakeswap-libs/uikit'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'

const Hero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 0 12px 97px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

const Nft = () => {
  const TranslateString = useI18n()
  const [modalOpen, setModalOpen] = useState(true) 
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  

  return (
    <NftProvider>
      <NftPage>
      <div className="warningAlert" style={{'display': ( modalOpen ? 'block' : 'none' )}}>
          <Alert title="" variant="warning" onClick={handleModal}>
          <p>Please, note that this is a beta version. Sometimes bugs occur due to problems with fetching data, so in that case refresh the website and it should work. </p>
        </Alert>
      </div>
        <Hero>
        <object type="image/svg+xml" data="images/nfthero.svg" width="820px">&nbsp;</object>
        </Hero>
        <NftList />
      </NftPage>
    </NftProvider>
  )
}

export default Nft
