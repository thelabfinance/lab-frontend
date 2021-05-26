import { AbiItem } from 'web3-utils'
import { getContract } from 'utils/web3'
import { ContractOptions } from 'web3-eth-contract'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import rewardSplitter from 'config/abi/rewardSplitter.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import devFeeProcessor from 'config/abi/devFeeProcessor.json'
import nftSale from 'config/abi/nftSale.json'
import { RABBIT_MINTING_FARM_ADDRESS, PANCAKE_RABBITS_ADDRESS, REWARD_SPLITTER_ADDRESS, DEV_FEE_PROCESSOR_ADDRESS, NFT_SALE_ADDRESS } from 'config/constants/nfts'

// TODO: Figure out how to add current account to contracts to write methods can be used

export const getRabbitMintingContract = (contractOptions?: ContractOptions) => {
  const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
  return getContract(rabbitMintingFarmAbi, RABBIT_MINTING_FARM_ADDRESS, contractOptions)
}

export const getPancakeRabbitContract = (contractOptions?: ContractOptions) => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return getContract(pancakeRabbitsAbi, PANCAKE_RABBITS_ADDRESS, contractOptions)
}

export const getRewardSplitterContract = (contractOptions?: ContractOptions) => {
  const rewardSplitterAbi = (rewardSplitter as unknown) as AbiItem
  return getContract(rewardSplitterAbi, REWARD_SPLITTER_ADDRESS, contractOptions)
}

export const getDevFeeProcessorContract = (contractOptions?: ContractOptions) => {
  const rewardSplitterAbi = (devFeeProcessor as unknown) as AbiItem
  return getContract(rewardSplitterAbi, DEV_FEE_PROCESSOR_ADDRESS, contractOptions)
}

export const getNftSaleContract = (contractOptions?: ContractOptions) => {
  const nftSaleAbi = (nftSale as unknown) as AbiItem
  return getContract(nftSaleAbi, NFT_SALE_ADDRESS, contractOptions)
}

export default getRabbitMintingContract
