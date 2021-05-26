import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Input, Modal, Text } from '@pancakeswap-libs/uikit'
import { PANCAKE_RABBITS_ADDRESS } from 'config/constants/nfts'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { usePancakeRabbits } from 'hooks/useContract'

interface VoteProposalModalProps {
  nft: Nft
  tokenIds: number[]
  onSuccess: () => any
  onDismiss?: () => void
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

const Label = styled.label`
  color: #4c68ef;
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`
const Controls = styled.div`
  display: flex;
  flex-flow: column nowrap;
  * {
    margin-top: 5px;
  }
`;


const VoteProposalModal: React.FC<VoteProposalModalProps> = ({ nft, tokenIds, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const pancakeRabbitsContract = usePancakeRabbits(PANCAKE_RABBITS_ADDRESS)

  
const poll = [
  {
    id: 1,
    type: "radio",
    text: "What is render method in React library?",
    correctAnswer: "It's a function that render a React Element.",
    answers: [
      { id: 1, text: "It's a function for multiple numbers." },
      { id: 2, text: "It's a function that render a React Element." },
      { id: 3, text: "I don't know." }
    ]
  },
  {
    id: 2,
    type: "checkbox",
    text: "Choose fruits in this list.",
    correctAnswer: ["Apple", "Orange"],
    answers: [
      { id: 1, text: "Apple" },
      { id: 2, text: "Orange" },
      { id: 3, text: "Eggplant" }
    ]
  },
  {
    id: 3,
    type: "checkbox",
    text: "What are the most popular languages for web?",
    correctAnswer: ["JavaScript", "PHP"],
    answers: [
      { id: 1, text: "JavaScript" },
      { id: 2, text: "Perl" },
      { id: 3, text: "PHP" },
      { id: 4, text: "Go" },
      { id: 5, text: "Dart" }
    ]
  },
  {
    id: 4,
    type: "fill",
    text: "What is the one of the most important thing in our life?",
    correctAnswer: "The opportunity to live"
  },
  {
    id: 5,
    type: "fill",
    text: "What is founder's name of Microsoft?",
    correctAnswer: "Bill"
  },
  {
    id: 6,
    type: "radio",
    text: "What is color that attracts people?",
    correctAnswer: "blue",
    answers: [
      { id: 1, text: "blue" },
      { id: 2, text: "green" },
      { id: 3, text: "dark" }
    ]
  }
];

  const handleConfirm = async () => {
    try {
      const isValidAddress = Web3.utils.isAddress(value)

      if (!isValidAddress) {
        setError(TranslateString(999, 'Please enter a valid wallet address'))
      } else {
        await pancakeRabbitsContract.methods
          .transferFrom(account, value, tokenIds[0])
          .send({ from: account })
          .on('sending', () => {
            setIsLoading(true)
          })
          .on('receipt', () => {
            onDismiss()
            onSuccess()
          })
          .on('error', () => {
            console.error(error)
            setError('Unable to transfer NFT')
            setIsLoading(false)
          })
      }
    } catch (err) {
      console.error('Unable to transfer NFT:', err)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(inputValue)
  }


  return (
    <Modal title={TranslateString(999, 'Transfer NFT')} onDismiss={onDismiss}>
      <ModalContent>
        &nbsp;
      </ModalContent>
    </Modal>
  )
}

export default VoteProposalModal
