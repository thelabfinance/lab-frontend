import { Nft } from './types'

export const RABBIT_MINTING_FARM_ADDRESS = '0x7bBF61169d8Ae0Bc04Bb5D344dd27058E73e5C54'
export const PANCAKE_RABBITS_ADDRESS = '0x5dcf363e1ee5ff6b0b988ad7932344e8a1e909a3'
export const REWARD_SPLITTER_ADDRESS = '0x7bBF61169d8Ae0Bc04Bb5D344dd27058E73e5C54'
export const DEV_FEE_PROCESSOR_ADDRESS = '0x4142319120b83aeb533b4e2d82f52a3c06feda8b'
export const NFT_SALE_ADDRESS = '0x3e04CebE4A001064FC26785DC044Fcb658f06A99'

export const rewardsPools ={
  'BUSD-WBNB':	{
  'address':'0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  'isTokenOnly': false
  },
  'USDT-BUSD':	{
  'address':'0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
  'isTokenOnly': false
  },
  'BTCB-WBNB':	{
  'address':'0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
  'isTokenOnly': false
  },
  'ETH-WBNB':	{
  'address':'0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
  'isTokenOnly': false
  },
  'DAI-BUSD':	{
  'address':'0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
  'isTokenOnly': false
  },
  // 'USDC-BUSD':	{
  // 'address':'0x680Dd100E4b394Bda26A59dD5c119A391e747d18',
  // 'isTokenOnly': false
  // },
  'DOT-WBNB':	{
  'address':'0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF',
  'isTokenOnly': false
  },
  'CAKE-BUSD':	{
  'address':'0x0Ed8E0A2D99643e1e65CCA22Ed4424090B8B7458',
  'isTokenOnly': false
  },
  'CAKE-WBNB':	{
  'address':'0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
  'isTokenOnly': false
  },
  'ADA-WBNB':	{
  'address':'0x28415ff2C35b65B9E5c7de82126b4015ab9d031F',
  'isTokenOnly': false
  },
  'LABO': {
  'address':'0x171401a3d18B21BFa3f9bF4F9637F3691158365A',
  'isTokenOnly': true
  },
  'BUSD':	{
  'address':'0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  'isTokenOnly': true
  },
  'WBNB':	{
  'address':'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  'isTokenOnly': true
  },
  'EGG':	{
  'address':'0xf952fc3ca7325cc27d15885d37117676d25bfda6',
  'isTokenOnly': true
  },
  'AUTO':	{
  'address':'0xa184088a740c695e156f91f5cc086a06bb78b827',
  'isTokenOnly': true
  },
  'ETH':	{
  'address':'0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  'isTokenOnly': true
  },
  'DAI':	{
  'address':'0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  'isTokenOnly': true
  },
  'USDC':	{
  'address':'0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  'isTokenOnly': true
  },
  'DOT':	{
  'address':'0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
  'isTokenOnly': true
  },
  'BTCB':	{
  'address':'0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  'isTokenOnly': true
  },
  'BSCX':	{
  'address':'0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
  'isTokenOnly': true
  },
}

const Nfts: Nft[] = [
  {
    name: "Atom",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 1,
    video: {
      webm: "1.webm",
      mp4: "atom.mp4"
    }
  },
  {
    name: "Corona",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 2,
    video: {
      webm: "2.webm",
      mp4: "corona.mp4"
    }
  },
  {
    name: "Drop",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 3,
    video: {
      webm: "3.webm",
      mp4: "drop.mp4"
    }
  },
  {
    name: "Forgotten Scientist",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 4,
    video: {
      webm: "4.webm",
      mp4: "forgotten_scientist.mp4"
    }
  },
  {
    name: "Fury Lab",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 5,
    video: {
      webm: "5.webm",
      mp4: "fury_lab.mp4"
    }
  },
  {
    name: "Ghost Experiment",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 6,
    video: {
      webm: "6.webm",
      mp4: "ghost_experiment.mp4"
    }
  },
  {
    name: "Labo DNA",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 7,
    video: {
      webm: "7.webm",
      mp4: "labo_dna.mp4"
    }
  },
  {
    name: "Lab Stuff",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 8,
    video: {
      webm: "8.webm",
      mp4: "lab_stuff.mp4"
    }
  },
  {
    name: "Lambo",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 9,
    video: {
      webm: "9.webm",
      mp4: "lambo.mp4"
    }
  },
  {
    name: "Mad Scientist",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 10,
    video: {
      webm: "10.webm",
      mp4: "mad_scientist.mp4"
    }
  },
  {
    name: "Mathematician",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 11,
    video: {
      webm: "11.webm",
      mp4: "mathematician.mp4"
    }
  },
  {
    name: "Microscope",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 12,
    video: {
      webm: "12.webm",
      mp4: "microscope.mp4"
    }
  },
  {
    name: "Mort-Vivant Alchemist",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 13,
    video: {
      webm: "13.webm",
      mp4: "mortvivant_alchemist.mp4"
    }
  },
  {
    name: "Orange Flask",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 14,
    video: {
      webm: "14.webm",
      mp4: "flask.mp4"
    }
  },
  {
    name: "Professor",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 15,
    video: {
      webm: "15.webm",
      mp4: "professor.mp4"
    }
  },
  {
    name: "Syringe",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 16,
    video: {
      webm: "16.webm",
      mp4: "syringe.mp4"
    }
  },
  {
    name: "The Alchemist",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 17,
    video: {
      webm: "17.webm",
      mp4: "alchemist.mp4"
    }
  },
  {
    name: "The Doctor",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 18,
    video: {
      webm: "18.webm",
      mp4: "doctor.mp4"
    }
  },
  {
    name: "The Experiment",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 19,
    video: {
      webm: "19.webm",
      mp4: "experiment.mp4"
    }
  },
  {
    name: "Vaccine",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 20,
    video: {
      webm: "20.webm",
      mp4: "vaccine.mp4"
    }
  },
  {
    name: "Light Bulb",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 21,
    video: {
      webm: "21.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Off-White",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 22,
    video: {
      webm: "22.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Lab Hero Card",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 23,
    video: {
      webm: "23.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Pool Hero Card",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 24,
    video: {
      webm: "24.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Farm Hero Card",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 25,
    video: {
      webm: "25.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "NFT Hero Card",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 26,
    video: {
      webm: "26.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Atomic Card",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 27,
    video: {
      webm: "27.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Minecraft",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 28,
    video: {
      webm: "28.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Retro Lab",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 29,
    video: {
      webm: "29.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Tesla",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 30,
    video: {
      webm: "30.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Call Martin",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 31,
    video: {
      webm: "31.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Aqua-Girl",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 32,
    video: {
      webm: "32.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Aqua-Girl 2",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 33,
    video: {
      webm: "33.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Professor Frink",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 34,
    video: {
      webm: "34.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Men in Black",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 35,
    video: {
      webm: "35.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Gold Card",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 36,
    video: {
      webm: "36.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Pokemon LABO",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 37,
    video: {
      webm: "37.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Psilocybin",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 38,
    video: {
      webm: "38.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "Einstein",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 39,
    video: {
      webm: "39.webm",
      mp4: "light_bulb.mp4"
    }
  },
  {
    name: "OG LABO",
    description: 'The Lab Finance official NFT, provides yield generation for its owners from minting and deposit fees.',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    bunnyId: 40,
    video: {
      webm: "40.webm",
      mp4: "light_bulb.mp4"
    }
  }
]

export default Nfts
