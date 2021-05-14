import React from 'react'
import styled from 'styled-components'
import { FaComment } from 'react-icons/fa';

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0 42px 0;
  align-items: center;
  justify-content: center;
  flex-flow: row;
`

const InfoFooter = () => {


  return (
    <StyledFooter>
        <p><FaComment/> hello@thelab.finance</p>
    </StyledFooter>
  )
}

export default InfoFooter
