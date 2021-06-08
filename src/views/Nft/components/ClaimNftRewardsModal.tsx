import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Tabs, Tab } from 'react-bootstrap';
import { Button, Modal, Text } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { REWARD_SPLITTER_ADDRESS, DEV_FEE_PROCESSOR_ADDRESS } from 'config/constants/nfts'
import { FaInfoCircle } from 'react-icons/fa';
import { getCakeAddress } from 'utils/addressHelpers'
import { Nft } from 'config/constants/types'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useFarms, usePriceBnbBusd } from 'state/hooks'
import { useRabbitMintingFarm, useDevFeeProcessorContract } from 'hooks/useContract'
import useForceUpdate from 'use-force-update';


function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

const {viewportWidth, viewportHeight} = getWindowDimensions()

const isClaimModalSmall = viewportWidth < 680

const iconRender = () => {
  const webmBreakpoints = {
    lg: 1200,
    sm: 770,
  }
  if (viewportWidth >= webmBreakpoints.lg) {
    return {
      token: "33px",
      pair: "54px"
    }
  }
  if (viewportWidth < webmBreakpoints.lg && viewportWidth >= webmBreakpoints.sm){
    return {
      token: "28px",
      pair: "48px"
    }
  }
  return {
    token: "28px",
    pair: "48px"
  }
}

interface ClaimNftRewardsModalProps {
  nft: Nft
  balances: Array<any>
  viewMode: boolean
  onSuccess: () => any
  onDismiss?: () => void
}

type PricesMap = {
  [key: string]: unknown
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`
export const Th = styled.th`
  padding: 14px 7px;
  font-size: .95em;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 2px 18px;
  }
`

export const ThSm = styled.th`
  padding: 24px 12px;
  font-size: .95em;
`

export const Td = styled.td`
  padding: 12px 6px;
  font-size: .95em;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 2px 18px;
  }
`
export const TdSm = styled.td`
  padding: 5px 12px;
  font-size: 1.05em;
  text-align: center !important;
`

const FlexCol = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const BoldTd = styled(Td)`
  font-weight: 600;
`

export const StyledTable = styled.table`
  width: 100%;
  margin-top: 21px;
  th,
  td {
    text-align: left;
    vertical-align: middle;
  }
  & > thead th {
    font-size: 12px;
    text-transform: uppercase;
  }
`

const InfoFooter = styled.div`
  width: 100%;
  padding: 21px 21px 0 21px;

`


const ClaimNftRewardsModal: React.FC<ClaimNftRewardsModalProps> = ({ nft, balances, onSuccess, onDismiss, viewMode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const rabbitMintingContract = useRabbitMintingFarm(REWARD_SPLITTER_ADDRESS)
  const devFeeProcessorContract = useDevFeeProcessorContract(DEV_FEE_PROCESSOR_ADDRESS)
  const cakeBalance = useTokenBalance(getCakeAddress())
  const cakeInWallet = getBalanceNumber(cakeBalance)
  const pricesMap: PricesMap = {}
  const wbnbPrice = Number(usePriceBnbBusd())
  const farmsLP = useFarms().map((farm)=>{
    if(String(farm.quoteTokenSymbol) === 'BNB' ){
      if (process.env.REACT_APP_DEBUG === "true") console.log(`${wbnbPrice} wbnb price`)
      pricesMap[farm.lpSymbol] = Number(farm.tokenPriceVsQuote)*wbnbPrice
    }else{
      pricesMap[farm.lpSymbol] = Number(farm.tokenPriceVsQuote)
    }
    return farm
  })
  if (process.env.REACT_APP_DEBUG === "true") console.log(balances, 'testing balances in modal')

  const [orderedBalances, setOrdersBalances] = useState(balances);
  useEffect(()=> {
    setOrdersBalances(balances.sort((a, b) => a.tokenSymbol.toLowerCase() > b.tokenSymbol.toLowerCase() ? 1 : -1  ))
  }, [balances])

  const UpdateComponent = useForceUpdate()

  const handleClaim = async (address) => {
    try {
      if (process.env.REACT_APP_DEBUG === "true") console.log(rabbitMintingContract.methods, 'contract methods')
      if (process.env.REACT_APP_DEBUG === "true") console.log(`account address: ${account}, token address: ${address} and token ID: ${nft.bunnyId}`)
      await rabbitMintingContract.methods
        .release(address, nft.bunnyId).send({
          from: account
        }).then(()=>{
          window.location.reload()
        })
        UpdateComponent()
        if (process.env.REACT_APP_DEBUG === "true") console.log('success')
    } catch (err) {
      console.error('Unable to mint NFT:', err)
    }
  }

  const handleProcess = async (address, tokenSymbol) => {
    try {
      if(String(tokenSymbol) === 'LABO'){
        await devFeeProcessorContract.methods
        .processLabo().send({
          from: account
        }).then(()=>{
          window.location.reload()
        })
      }else{
        await devFeeProcessorContract.methods
        .processToken(address).send({
          from: account
        }).then(()=>{
          window.location.reload()
        })
      }
    } catch (err) {
      console.error('Unable to process rewards:', err)
    }
  }

  useEffect(() => {
    if (cakeInWallet === 0) {
      setError('You must have a CAKE balance greater than zero to claim NFT')
    }
  }, [cakeInWallet, setError])

  if (process.env.REACT_APP_DEBUG === "true") console.log(balances, "balances in modal")

  return (

    ( !isClaimModalSmall ? (
      <Modal title={ !viewMode ? "Claim Rewards" : "View Rewards" } onDismiss={onDismiss}>
        <ModalContent>
        <Tabs defaultActiveKey="pools" id="uncontrolled-tab-example" className="modalNavTabs">
            <Tab eventKey="pools" title="Tokens">
            <StyledTable>
              <thead>
                <tr>
                  <Th>&nbsp;</Th>
                  <Th>Currency</Th>
                  <Th>Total Rewards</Th>
                  <Th>Per NFT</Th>
                  <Th>&nbsp;</Th>
                  <Th>Earned</Th>
                  { !viewMode ? 
                  <Th>&nbsp;</Th> :
                  ""}
                </tr>
              </thead>
              <tbody>
                { balances.map((balance) => {
                  
                  const farmImage = balance.tokenSymbol.toLowerCase()
                  const imgWidth = balance.isTokenOnly ? iconRender().token : iconRender().pair
                  const tokenSymbol = balance.isTokenOnly ? balance.tokenSymbol : `${balance.tokenSymbol} LP`
                  const tokenPrice = Number(pricesMap[tokenSymbol])

                  if (process.env.REACT_APP_DEBUG === "true") console.log(` ${tokenPrice} token price for ${tokenSymbol} `)

                  const processedBalance = (balance.balance/10**18).toFixed(6)
                  const usdtProcessedBalance = (balance.usdtBalance/10**18).toFixed(6)

                  const totalBalance = (balance.totalRewards/10**18).toFixed(6)
                  const usdtTotalBalance = (balance.usdtTotalRewards/10**18).toFixed(6)

                  const perNftBalance = (balance.nftRewards/10**18).toFixed(6)
                  const usdtPerNftBalance = (balance.usdtNftRewards/10**18).toFixed(6)

                  if(balance.isTokenOnly){
                    return(
                      <tr>
                      <Td><img src={`/images/farms/minimal/${farmImage}.svg`} width={imgWidth} alt={balance.lpSymbol}/></Td>
                      <Td>{balance.tokenSymbol}</Td>
                      <Td>
                        <FlexCol>
                          <span>{totalBalance}</span>
                          {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtTotalBalance}</span> */}
                        </FlexCol>
                      </Td>
                      <Td>
                        <FlexCol>
                          <span>{perNftBalance}</span>
                          {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtPerNftBalance}</span> */}
                        </FlexCol>
                      </Td>
                      <Td>
                        <Button style={{'borderRadius': '2.1px', 'padding': '12px', 'height': '42px', 'marginRight': '5px'}} onClick={async ()=>{handleProcess(balance.currency, balance.tokenSymbol)}} disabled={balance.totalRewards <= 0}>
                          Process
                        </Button>
                      </Td>
                      <Td>
                        <FlexCol>
                          <span>{processedBalance}</span>
                          {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtProcessedBalance}</span> */}
                        </FlexCol>
                      </Td>
                          { !viewMode ? 
                          <Td>
                            <Button style={{'borderRadius': '2.1px', 'padding': '12px', 'height': '42px'}} onClick={async ()=>{handleClaim(balance.currency)}} disabled={balance.balance <= 0}>
                            Claim
                          </Button>
                          </Td>
                        :
                          ""
                        }
                    </tr>
                    )
                  }
                  return ""
                }) }
              </tbody>
            </StyledTable>
            </Tab>
            <Tab eventKey="farms" title="Pairs">
            <StyledTable>
              <thead>
                <tr>
                  <Th>&nbsp;</Th>
                  <Th>Currency</Th>
                  <Th>TotalRewards</Th>
                  <Th>Per NFT</Th>
                  <Th>&nbsp;</Th>
                  <Th>Earned</Th>
                  { !viewMode ? 
                  <Th>&nbsp;</Th> :
                  ""}
                </tr>
              </thead>
              <tbody>
              { balances.map((balance) => {
                  
                  const farmImage = balance.tokenSymbol.toLowerCase()
                  const imgWidth = balance.isTokenOnly ? iconRender().token : iconRender().pair
                  const tokenSymbol = balance.isTokenOnly ? balance.tokenSymbol : `${balance.tokenSymbol} LP`
                  const tokenPrice = Number(pricesMap[tokenSymbol])

                  if (process.env.REACT_APP_DEBUG === "true") console.log(` price of ${tokenSymbol}: ${tokenPrice} `)

                  const processedBalance = (balance.balance/10**18).toFixed(6)
                  const usdtProcessedBalance = (balance.usdtBalance/10**18).toFixed(6)

                  const totalBalance = (balance.totalRewards/10**18).toFixed(6)
                  const usdtTotalBalance = (balance.usdtTotalRewards/10**18).toFixed(6)

                  const perNftBalance = (balance.nftRewards/10**18).toFixed(6)
                  const usdtPerNftBalance = (balance.usdtNftRewards/10**18).toFixed(6)

                  if(!balance.isTokenOnly){
                    return(
                      <tr>
                      <Td><img src={`/images/farms/minimal/${farmImage}.svg`} width={imgWidth} alt={balance.lpSymbol}/></Td>
                      <Td>{balance.tokenSymbol}</Td>
                      <Td>
                        <FlexCol>
                          <span>{totalBalance}</span>
                          {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtTotalBalance}</span> */}
                        </FlexCol>
                      </Td>
                      <Td>
                        <FlexCol>
                          <span>{perNftBalance}</span>
                          {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtPerNftBalance}</span> */}
                        </FlexCol>
                      </Td>
                      <Td>
                        <Button style={{'borderRadius': '2.1px', 'padding': '12px', 'height': '42px', 'marginRight': '5px'}} onClick={async ()=>{handleProcess(balance.currency, balance.tokenSymbol)}} disabled={balance.totalRewards <= 0}>
                          Process
                        </Button>
                      </Td>
                      <Td>
                        <FlexCol>
                          <span>{processedBalance}</span>
                          {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtProcessedBalance}</span> */}
                        </FlexCol>
                      </Td>
                          { !viewMode ? 
                          <Td>
                            <Button style={{'borderRadius': '2.1px', 'padding': '12px', 'height': '42px'}} onClick={async ()=>{handleClaim(balance.currency)}} disabled={balance.balance <= 0}>
                            Claim
                          </Button>
                          </Td>
                        :
                          ""
                        }
                    </tr>
                    )
                  }
                  return ""
                }) }
              </tbody>
            </StyledTable>
            </Tab>
          </Tabs>
          <InfoFooter>
            <p>
            {/* <FaInfoCircle style={{'maxHeight': '12px'}} /> balances in dollar are an estimation. */}
            </p>
          </InfoFooter>
        </ModalContent>
      </Modal>
    ):(
      <Modal title={ !viewMode ? "Claim Rewards" : "View Rewards" } onDismiss={onDismiss}>
        <ModalContent>
        <Tabs defaultActiveKey="pools" id="uncontrolled-tab-example" className="modalNavTabs">
            <Tab eventKey="pools" title="Tokens">
            <StyledTable>
              <thead>
                <tr>
                  <ThSm>&nbsp;</ThSm>
                  <ThSm>Rewards Per NFT</ThSm>
                  <ThSm>Total Processed</ThSm>
                </tr>
              </thead>
              <tbody>
                { balances.map((balance) => {
                  const farmImage = balance.tokenSymbol.toLowerCase()
                  const imgWidth = balance.isTokenOnly ? iconRender().token : iconRender().pair
                  const tokenSymbol = balance.isTokenOnly ? balance.tokenSymbol : `${balance.tokenSymbol} LP`
                  const tokenPrice = Number(pricesMap[tokenSymbol])

                  const processedBalance = (balance.balance/10**18).toFixed(6)
                  const usdtProcessedBalance = (balance.usdtBalance/10**18).toFixed(6)

                  const totalBalance = (balance.totalRewards/10**18).toFixed(6)
                  const usdtTotalBalance = (balance.usdtTotalRewards/10**18).toFixed(6)

                  const perNftBalance = (balance.nftRewards/10**18).toFixed(6)
                  const usdtPerNftBalance = (balance.usdtNftRewards/10**18).toFixed(6)

                  if(balance.isTokenOnly){
                    return(
                      <>
                      <tr>
                        <TdSm>
                          <FlexCol>
                            <img src={`/images/farms/minimal/${farmImage}.svg`} width={imgWidth} alt={balance.lpSymbol}/>
                            <br/>
                            {balance.tokenSymbol}
                          </FlexCol>
                        </TdSm>
                        <td>
                          <tr>
                            <TdSm>
                              <FlexCol>
                                <span>{perNftBalance}</span>
                                {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtPerNftBalance}</span> */}
                              </FlexCol>
                            </TdSm>
                          </tr>
                          <tr>
                          <TdSm>
                            <Button style={{'borderRadius': '2.1px', 'padding': '12px 21px', 'height': '42px', 'marginRight': '5px'}} onClick={async ()=>{handleProcess(balance.currency, balance.tokenSymbol)}} disabled={balance.totalRewards <= 0}>
                              Process
                            </Button>
                          </TdSm>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <TdSm>
                              <FlexCol>
                                <span>{processedBalance}</span>
                                {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtProcessedBalance}</span> */}
                              </FlexCol>
                            </TdSm>
                          </tr>
                          <tr>
                            { !viewMode ? 
                                <TdSm>
                                  <Button style={{'borderRadius': '2.1px', 'padding': '12px 21px', 'height': '42px'}} onClick={async ()=>{handleClaim(balance.currency)}} disabled={balance.balance <= 0}>
                                  Claim
                                </Button>
                                </TdSm>
                              :
                                ""
                              }
                          </tr>
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </>
                    
                    )
                  }
                  return ""
                }) }
              </tbody>
            </StyledTable>
            </Tab>
            <Tab eventKey="farms" title="Pairs">
            <StyledTable>
              <thead>
                <tr>
                  <ThSm>&nbsp;</ThSm>
                  <ThSm>Rewards Per NFT</ThSm>
                  <ThSm>Total Processed</ThSm>
                </tr>
              </thead>
              <tbody>
              { balances.map((balance) => {
                  const farmImage = balance.tokenSymbol.toLowerCase()
                  const imgWidth = balance.isTokenOnly ? iconRender().token : iconRender().pair
                  const tokenSymbol = balance.isTokenOnly ? balance.tokenSymbol : `${balance.tokenSymbol} LP`
                  const tokenPrice = Number(pricesMap[tokenSymbol])

                  const processedBalance = (balance.balance/10**18).toFixed(6)
                  const usdtProcessedBalance = (balance.usdtBalance/10**18).toFixed(6)

                  const totalBalance = (balance.totalRewards/10**18).toFixed(6)
                  const usdtTotalBalance = (balance.usdtTotalRewards/10**18).toFixed(6)

                  const perNftBalance = (balance.nftRewards/10**18).toFixed(6)
                  const usdtPerNftBalance = (balance.usdtNftRewards/10**18).toFixed(6)

                  if(!balance.isTokenOnly){
                    return(
                      <>
                      <tr>
                        <TdSm>
                          <FlexCol>
                            <img src={`/images/farms/minimal/${farmImage}.svg`} width={imgWidth} alt={balance.lpSymbol}/>
                            <br/>
                            {balance.tokenSymbol}
                          </FlexCol>
                        </TdSm>
                        <td>
                          <tr>
                            <TdSm>
                              <FlexCol>
                                <span>{perNftBalance}</span>
                                {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtPerNftBalance}</span> */}
                              </FlexCol>
                            </TdSm>
                          </tr>
                          <tr>
                          <TdSm>
                            <Button style={{'borderRadius': '2.1px', 'padding': '12px 21px', 'height': '42px', 'marginRight': '5px'}} onClick={async ()=>{handleProcess(balance.currency, balance.tokenSymbol)}} disabled={balance.totalRewards <= 0}>
                              Process
                            </Button>
                          </TdSm>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <TdSm>
                              <FlexCol>
                                <span>{processedBalance}</span>
                                {/* <span style={{'color': '#aaa', 'fontWeight': 200, 'marginTop': '5px' }}>${usdtProcessedBalance}</span> */}
                              </FlexCol>
                            </TdSm>
                          </tr>
                          <tr>
                            { !viewMode ? 
                                <TdSm>
                                  <Button style={{'borderRadius': '2.1px', 'padding': '12px 21px', 'height': '42px'}} onClick={async ()=>{handleClaim(balance.currency)}} disabled={balance.balance <= 0}>
                                  Claim
                                </Button>
                                </TdSm>
                              :
                                ""
                              }
                          </tr>
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </>
                    
                    )
                  }
                  return ""
                }) }
              </tbody>
            </StyledTable>
            </Tab>
          </Tabs>
          <InfoFooter>
            {/* <p>
            <FaInfoCircle style={{'maxHeight': '12px'}} /> balances in dollar are not fully accurate due to rapidly changing prices
            </p> */}
          </InfoFooter>
        </ModalContent>
      </Modal>
    ))
    
  )
}

export default ClaimNftRewardsModal
