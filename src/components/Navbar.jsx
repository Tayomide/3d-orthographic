import React from 'react'
import { styled } from 'styled-components'

export const Navbar = ({ setCamera }) => {
  return (
    <Container>
      <select onChange={e => setCamera(e.target.value)}>
        <option value="front">Front View</option>
        <option value="top">Top View</option>
        <option value="rside">Right Side View</option>
        <option value="back">Back View</option>
        <option value="bottom">Bottom View</option>
        <option value="lside">Left Side View</option>
      </select>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 2.1em;
  width: 100%;
  background-color: white;
  padding: 0 0.2em;
  align-items: center;
  select{
    height: 2em;
    border: 1px solid #e2e2e2;
    border-left-width: 1px;
    border-right-width: 1px;
    outline: 0;
    border-radius: 0.5em;
    padding: 0.2em;
    cursor: pointer;
  }
`