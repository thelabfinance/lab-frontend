/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import BigNumber from 'bignumber.js'
import labo from 'config/constants/labo'
import fetchFarms from './fetchFarms'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

const initialState: FarmsState = { data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
    setLaboPrice: (state, action) => {
      state.price = action.payload
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData, setLaboPrice } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
  const userStakedBalances = await fetchFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchFarmUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export const fetchLaboPriceAsync = () => async (dispatch) => { // Change the address below to LABO-BUSD LP
  const query = `
  {ethereum(network: bsc){
    address(address: {is: "${labo.addr.laboBusdAddr}"}){
    balances {
    currency {
    symbol
    }
    value
    }}
    }}
`;
const url = "https://graphql.bitquery.io/";
const opts = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        query
    })
};

fetch(url, opts)
  .then(response => response.json())
  .then(json => {
    if (process.env.REACT_APP_DEBUG === "true") console.log(json, 'testing output');
    const lprice = json.data.ethereum.address[0].balances[labo.queryPosition.busd].value / json.data.ethereum.address[0].balances[labo.queryPosition.token].value;
    dispatch(setLaboPrice(lprice));
  })
  .catch(console.error);
}

export default farmsSlice.reducer
