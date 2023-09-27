import React from 'react'
import { styled } from 'styled-components'

export const SocialLinks = () => {
  return (
    <Container>
      <a className="source" target='_blank' href="https://github.com/Tayomide/3d-orthographic">
        <img src='/code.svg' alt="Source Code"/>
      </a>
      <a className="github" target="_blank" href="https://github.com/Tayomide/">
        <img src='/github.svg' alt="Source Code"/>
      </a>
      <a className="linkedin" target='_blank' href="https://www.linkedin.com/in/tomiwa-ibrahim-67b180196/">
        <img src='/linkedin.svg' alt="Source Code"/>
      </a>
      <p className='divider'></p>
      <a className="linkedin" target='_blank' href="https://www.linkedin.com/in/saleem-dunmoye-ba1999285/">
        <img src='/linkedin.svg' alt="Source Code"/>
      </a>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  background-color: white;
  flex-direction: row;
  align-items: center;
  height: 2em;
  position: fixed;
  padding: 0 0.3em;
  bottom: 0.3em;
  right: calc(50% - 113px);
  z-index: 2;
  gap: 0.2em;
  border-radius: 2em;
  .divider{
    width: 1px;
    height: 100%;
    background-color: #e2e2e2;
    display: block;
  }
  a{
    font-size: 1em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    &.linkedin{
      border-radius: 0;
      &:hover{
        img{
          filter: invert(.25) sepia(1) saturate(5) hue-rotate(170deg);
        }
      }
    }
    &:hover{
      background-color: #e2e2e270;
      img{
        filter: invert(0);
      }
    }
    img{
      width: 1.4em;
      height: 100%;
    }
  }
`
