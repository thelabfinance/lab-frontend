import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Toggle } from '@pancakeswap-libs/uikit'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import {Accordion, Button, Card, useAccordionToggle} from 'react-bootstrap';
import { FaMediumM, FaTelegramPlane, FaTwitter, FaShieldAlt, FaFileAlt, FaGithub, FaBinoculars, FaChartBar } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo';

function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

const {viewportWidth, viewportHeight} = getWindowDimensions()

const isOnPhone = viewportWidth < 680

const Token = styled.img`
  margin-right: 10px;
`

const Price = styled.button`
-webkit-box-align: center;
align-items: center;
background-color: rgba(0, 0, 0,0) !important;
border: 1px;
border-style: solid !important;
border-color: #405fb4 !important;
border-radius: 16px;
color: #405fb4;
font-size: 15px;
font-weight: 800;
width: 100%;
display: inline-flex;
min-height: 21px;
max-height: 37px;
letter-spacing: 0.03em;
padding: 15px;
`

const Logo = styled.p`
  font-size: 30px;
  color: #4c68ef !important;
  padding-bottom: 0px;
  @media screen and (max-width: 800px) {
    font-size: 21px;
  }
`

const NavBar = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);

  const LightSwitch = () => {
  
    const toggle = () => setIsChecked(!isChecked);
  
    return (
      <>
        <div style={{ marginBottom: "32px" }}>
          <Toggle checked={isChecked} onChange={toggle} />
        </div>
      </>
    );
  }

  function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);
  
    return (
        <li className="nav-tab dropdown">
        <Link to="/" className="nav-links" onClick={decoratedOnClick}>
          INFO
        </Link>
        </li>
    );
  }
  
  function InfoToggle() {
    return (
      <Accordion id="infoToggleMobile">
        <Card style={{"backgroundColor": "white0", "border": "0"}}>
          <Card.Header style={{"backgroundColor": "white", "border": "0"}}>
            <CustomToggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{"backgroundColor": "white", "border": "0"}}>
            <ul className="dropdown-items">
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://github.com/thelabfinance" className="nav-links">
                    <FaGithub /> <span className="dditem">GITHUB</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://thelabfinance.medium.com/" className="nav-links">
                    <FaMediumM /> <span className="dditem">MEDIUM</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://docs.thelab.finance" className="nav-links">
                    <FaFileAlt /> <span className="dditem">DOCS</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://t.me/thelabfinance" className="nav-links">
                    <FaTelegramPlane /> <span className="dditem">TELEGRAM</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://twitter.com/TheLabFinance" className="nav-links">
                    <FaTwitter />  <span className="dditem">TWITTER</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://github.com/thelabfinance/audits/blob/main/TheLabFinance_SolidGroup.pdf" className="nav-links">
                    <FaShieldAlt />  <span className="dditem">AUDIT</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href={ `https://bscscan.com/address/${labo.addr.laboAddr}` } className="nav-links">
                    <FaBinoculars />  <span className="dditem">BSCSCAN</span>
                  </a>
                </li>
                <li>
                  <a target="_blanK" rel="noreferrer" href="https://dex.guru/token/0x171401a3d18b21bfa3f9bf4f9637f3691158365a-bsc" className="nav-links">
                    <FaChartBar />  <span className="dditem">CHART</span>
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  return (
    <div>
      <header>
          <div className="nav-wrapper">
              <div className="logo-container">
                  <img className="logo" src="images/icon.svg" alt="Logo"/><Logo>&nbsp;thelab.finance</Logo>
              </div>
              <nav>
                  <input className="hidden" type="checkbox" checked={isChecked} id="menuToggle"/>
                  <button type="button" className="menu-btn" onClick={()=>{setIsChecked(!isChecked)}}>
                      <div className="menu"/>
                      <div className="menu"/>
                      <div className="menu"/>
                  </button>
                  <div className="nav-container">
                      <ul className="nav-tabs">
                          <li className="nav-tab">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              HOME
                            </Link>
                          </li>
                          <li className="nav-tab">
                            <Link to="/pools" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              POOLS
                            </Link>
                          </li>
                          <li className="nav-tab">
                            <Link to="/farms" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              FARMS
                            </Link>
                          </li>
                          <li className="nav-tab">
                            <Link to="/nft" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              NFTs
                            </Link>
                          </li>
                          <li className="nav-tab dropdown" id="infoToggleDesktop">
                            <Link to="/" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                              INFO
                            </Link>
                            <ul className="dropdown-content dropdown-items">
                             <li>
                                <a target="_blanK" rel="noreferrer" href="https://github.com/thelabfinance" className="nav-links">
                                  <FaGithub /> <span className="dditem">GITHUB</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://thelabfinance.medium.com/" className="nav-links">
                                  <FaMediumM /> <span className="dditem">MEDIUM</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://docs.thelab.finance" className="nav-links">
                                <FaFileAlt /> <span className="dditem">DOCS</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://t.me/thelabfinance" className="nav-links">
                                <FaTelegramPlane /> <span className="dditem">TELEGRAM</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://twitter.com/TheLabFinance" className="nav-links">
                                <FaTwitter />  <span className="dditem">TWITTER</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://github.com/thelabfinance/audits/blob/main/TheLabFinance_SolidGroup.pdf" className="nav-links">
                                <FaShieldAlt />  <span className="dditem">AUDIT</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href={ `https://bscscan.com/address/${labo.addr.laboAddr}` } className="nav-links">
                                <FaBinoculars />  <span className="dditem">BSCSCAN</span>
                                </a>
                              </li>
                              <li>
                                <a target="_blanK" rel="noreferrer" href="https://dex.guru/token/0x171401a3d18b21bfa3f9bf4f9637f3691158365a-bsc" className="nav-links">
                                <FaChartBar />  <span className="dditem">CHART</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <InfoToggle />
                 </ul>
                 <ul className="web3buttons">
                 <li className="web3li insideMainNav">
                   <a target="_blank" rel="noreferrer" href="https://dex.guru/token/0x171401a3d18b21bfa3f9bf4f9637f3691158365a-bsc" className="nav-links price">
                  <Price
                    style={{ marginRight: '4px',
                            backgroundColor: 'transparent' }}
                  >
                    <Token src="images/icon.svg" alt='1' width="21px" height="21px"/>
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(5).concat("$") : '...loading') }</p></Price>
                  </a></li>
                  <li className="web3li insideMainNav">
                    <a target="_blank" rel="noreferrer" style={{'width': '100% !important' }} href={ `https://app.1inch.io/#/56/swap/BNB/${labo.addr.laboAddr}` } className="nav-links connect">
                      <Button style={{'fontSize': '15px', 'borderRadius': '16px', 'width': '100% !important'}}>
                        <b>Buy LABO</b>
                      </Button>
                    </a>
                  </li>
                <li className="web3li insideMainNav">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,( isOnPhone ? 3 : 8)).concat("...")} <p style={{'color': 'blue'}}>Connected</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '16px',
                    fontSize: '15px',
                    fontWeight: '800',
                    width: '100%',
                    display: 'inline-flex',
                    height: '44px',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    minHeight: '21px',
                    maxHeight: '33px',
                  }}>Connect</UnlockButton>
                  }
                  </Link>
                  </li>
                 </ul>
                  </div>
              </nav>
              <ul className="nav-tabs outsideMainNav">
                <li className="web3li">
                  <a target="_blank" rel="noreferrer" href="https://dex.guru/token/0x171401a3d18b21bfa3f9bf4f9637f3691158365a-bsc" className="nav-links price">
                  <Price
                    style={{ 
                      marginRight: '4px',
                      'flexFlow': 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Token src="images/icon.svg" alt='1' width="21px" height="21px"/>
                    <p>{ ( !cakePriceUsd.isNaN() ? cakePriceUsd.toNumber().toFixed(5).concat("$") : '...loading') }</p></Price>
                  </a></li>
                  <li className="web3li">
                    <a target="_blank" rel="noreferrer" style={{'width': '100% !important' }} href={ `https://app.1inch.io/#/56/swap/BNB/${labo.addr.laboAddr}` } className="nav-links connect">
                      <Button style={{'fontSize': '15px', 'borderRadius': '16px', 'width': '100% !important'}}>
                        <b>Buy LABO</b>
                      </Button>
                    </a>
                  </li>
               
                <li className="web3li">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Price>{account.substring(0,8).concat("...")} <p style={{'color': '#4c68ef'}}>Connected</p></Price>:
                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '0px',
                    color: '#8299dd !important',
                    borderRadius: '16px',
                    fontSize: '15px',
                    fontWeight: '800',
                    width: '100%',
                    display: 'inline-flex',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    'minHeight':'21px',
                    'maxHeight':'37px'
                  }}>Connect</UnlockButton>
                  }
                  </Link>
                  </li>
              </ul>
          </div>
      </header>
  </div>
  )
}


export default NavBar
