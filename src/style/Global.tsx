import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit' !important;
    font-weight: 700;
    
  }

  #root {
    background: rgb(193,176,255);
    background: linear-gradient(45deg, rgba(193,209,255,1) 0%, rgba(255,255,255,1) 68%);

  }

  div {
    color: #23439c !important;
    font-size: 1em !important
  }


  h2 {
    color: #23439c !important;
  }

  button {
    background-color: #4c68ef;
  }

  button:hover {
    background-color: #778dfc;
  }


  button{
    box-shadow: 0 0 0 2px #FFF;
  }

  a{
    color: #23439c;
  }

  a:hover{
    text-decoration: none !important;
  }

  .nav-links:hover{
    color: #4a6bc7;
  }

  .nav-links.price button:hover{
    background-color: white !important;
  }

  svg{
    fill: #23439c;
  }


  #content[role="presentation"]{
    background-color: #e9e8e8 !important;
 }

  ::-webkit-scrollbar-thumb {
    background: #23439c;
    border-radius: 8px;
}


#wallet-connect-metamask{
  background-color: #FFF !important;
  border: 1px solid #f2f2f2
}

#wallet-connect-metamask:hover{
  background-color: #f2f2f2 !important;
}

#wallet-connect-trustwallet{
  background-color: #FFF !important;
  border: 1px solid #f2f2f2
}

#wallet-connect-trustwallet:hover{
  background-color: #f2f2f2 !important;
}

#wallet-connect-mathwallet{
  background-color: #FFF !important;
  border: 1px solid #f2f2f2
}

#wallet-connect-mathwallet:hover{
  background-color: #f2f2f2 !important;
}

#wallet-connect-tokenpocket{
  background-color: #FFF !important;
  border: 1px solid #f2f2f2
}

#wallet-connect-tokenpocket:hover{
  background-color: #f2f2f2 !important;
}

#wallet-connect-walletconnect{
  background-color: #FFF !important;
  border: 1px solid #f2f2f2
}

#wallet-connect-walletconnect:hover{
  background-color: #f2f2f2 !important;
}

button[id='wallet-connect-binance chain wallet']{
  background-color: #FFF !important;
  border: 1px solid #f2f2f2
}

button:hover[id='wallet-connect-binance chain wallet']{
  background-color: #f2f2f2 !important;
  border: 0px
}

button[aria-label="Close the dialog"] {
  background-color: #f2f2f2 !important;
  border: 1px solid #f2f2f2
}

button:hover[aria-label="Close the dialog"] {
  background-color: #f2f2f2 !important;
  border: 0px
}


a[variant="subtle"]{
  background-color: #4c68ef;
  color: white !important;
}

#APR{
  background-color: rgba(0,0,0,0) !important;
}

a:hover:not(:disabled):not(.button--disabled):not(:active)[variant="subtle"]{
  background-color: #9681eb;
}

a:focus:not(:active)[variant="subtle"]{
  box-shadow: 0 0 0 2px #9681eb;
}

#tooltip{
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}
#tooltip{
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 110%;
}

#tooltiptext{
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 110%;
}

#tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

#tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

#tooltip:hover{
  visibility: visible;
}

#tooltiptext:hover {
  visibility: visible;
}


@media screen and (max-width: 800px) {
  .HomeImg{
    display: none
  }

  .HomeLayout{
    column-count: 1;
  }

  .CardsLayout{
    grid-column: span 12;
  }

}

//RESPONSIVE QUERIES PATCH

@media all and (min-width: 1200px) {
  .CardsLayout{
    max-width: 369px;
    grid-gap: 15px;
  }

  .labhero{
    width: 680px;
  }
 }

 @media all and (max-width: 1350px){
  .insideMainNav{
    display: flex;
    margin-bottom: 5px;
  }

  .outsideMainNav{
    display: none;
  }

 }

 @media all and (min-width: 1560px){
  .labhero{
    width: 900px;
    margin-right: 72px;
  }
 }

 @media all and (min-width: 1760px){

  .CardsLayout{
    width: 470px;
    grid-gap: 28px;
  }
 }

 @media all and (min-width: 1350px){
  .insideMainNav{
    display: none;
  }

  .outsideMainNav{
    display: flex;
  }
 }

@media all and (max-width: 1200px) { 
  .CardsLayout{
    width: 100%;
    max-width: 369px !important;
    grid-gap:11px;
  }

  .labhero{
    width: 500px;
    max-width: 100%;
  }

}

@media all and (max-width: 800px){
  .labhero{
    width: 470px;
  }
}

@media all and (max-width: 480px) {
  .labhero{
    width: 270px;
  }
}


.farmFlowRow{
  flex-flow: row;
}

.farmFlowColumn{
  flex-flow: column;
}

*:disabled{
  color: #eee
}
.cTcEZk{
  border-radius: 7px;
}
a[variant="tertiary"]{
  color: #4c68ef;
}
.fYFWWs{
  border-radius: 5px !important;
}
.dUGzEl, .hXXGeJ{
  color: #4c68ef !important;
}
.hXXGeJ{
  border-color: #4c68ef !important;
}
.cbSyWB:disabled, .cbSyWB.button--disabled, .cgkvJQ:disabled, .cgkvJQ.button--disabled{
  color: #ccc;
}


@media screen and (max-width: 800px){
  .warningAlert{
    position: fixed;
    width: 42%;
    z-index: 62;
    min-width: 240px;
    left: 9%;
    top: 100px;
  }
}
@media screen and (min-width: 800px){
  .warningAlert{
    width: 333px;
    z-index: 8888;
    position: fixed;
    right: 12%;
  }
}

div.warningAlert > div > div.sc-jSgupP.gMeKF{
  background-color: #4c68ef;
}


.nftCardFront{
  border-radius: 15px !important;
}

.modalNavTabs {
  margin-top: 0;
  flex-flow: row;
}

@media screen and (max-width: 1350px){
  .insideMainNav a, button{
    width: 100%;
  }
}
button:hover:not(:disabled){
  background-color: #778dfc !important;
}

`
export default GlobalStyle
