import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@pancakeswap-libs/uikit'
import MyComponent from 'react-fullpage-custom-loader'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const quotes = ['loading the lab...'];

const PageLoader: React.FC = () => {
  return (
      <MyComponent loaderType="ball-atom" wrapperBackgroundColor="white" color="#4c68ef" sentences={quotes} styles={{'fontFamily': 'Kanit !important', 'fontSize': '80px'}}/>
  )
}

export default PageLoader
