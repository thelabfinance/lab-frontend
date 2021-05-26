import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <span data-tip data-for='happyFace3'>
      <Button style={{'fontSize': '14px', 'borderRadius': '5px'}} disabled={ labo.isLocked.unlockWalletButton } onClick={onPresentConnectModal} {...props}>
        {TranslateString(292, 'Unlock Wallet')}
      </Button>
      {(
        labo.isLocked.unlockWalletButton 
        ? 
      
        (
          <ReactTooltip id='happyFace3' type='info'>
          <span style={{'color': 'white'}}>Do not add liquidity yet, this is a test token.</span>
          </ReactTooltip>
        )
        :
        ''
        
      )
      } 
    </span>
  )
}

export default UnlockButton
