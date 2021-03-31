import styled from 'styled-components'
import { Link } from 'react-router-dom'
import emptyCart from './../../media/shopping-cart-empty.png'

export const StyledNav = styled.nav`
    width: 15rem;
    display: flex;
    justify-content: space-around;
    position: absolute;
    margin-left: 50rem;
    margin-top: 5rem;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: dimgray;
    border-right-style: solid;
    border-right-width: 0.1rem;
    padding-right: 1.5rem;

    &:hover{
        color: limegreen;
    }

    &:last-child{
        border-right-style: none;
        background-image: url(${emptyCart});
        background-size: 1.2rem;
        background-repeat: no-repeat;
        background-position: center;
    }
`