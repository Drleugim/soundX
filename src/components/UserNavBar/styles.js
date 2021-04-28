import styled from 'styled-components'
import { Link } from 'react-router-dom'
import emptyCart from './../../media/shopping-cart-empty.png'

export const StyledNav = styled.nav`
    width: 23rem;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    margin-left: 48rem;
    margin-top: 6rem;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: dimgray;
    border-right-style: solid;
    border-right-width: 0.1rem;
    padding-right:0.5rem;
    padding-left: 0.5rem;
   
    &:hover{
        color: limegreen;
    }

    &:first-child{
        background-image: url(${emptyCart});
        background-size: 1.2rem;
        background-repeat: no-repeat;
        background-position: center;
        padding-right: 1.5rem;
    }
    &:last-child{
        border-right-style: none;
    }
`