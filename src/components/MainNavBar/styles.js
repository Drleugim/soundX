import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledNav = styled.nav`
    width: 70rem;
    display: flex;
    justify-content: center;
    border-top-style: solid;
    border-top-width: 0.1rem;
    margin-top: -2rem;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    width: 10rem;
    color: black;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 1.1rem;
    padding-top: 1.3rem;
    text-align: center;
    
    &:hover{
        color: limegreen;
        border-top-style: solid;
        border-top-width: 0.1rem;
    }

    &:last-child{
       text-shadow: greenyellow 0.2rem 0.2rem;
       animation: 1s ${fadeIn} infinite;
    }
`