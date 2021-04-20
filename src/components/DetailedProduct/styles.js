import styled from 'styled-components'
import { Link } from 'react-router-dom'
import userIcon from './../../media/user.png'
import noImgageAvailable from './../../media/no-image-available.png'

export const StyledArticle = styled.article`
    width: 15rem;
    height: 24rem;
    margin-top: 2rem;
    margin-right: 2rem;
    background-color: #FCFCFE;
    border-style: solid;
    border-width: 0.125rem;
    border-radius: 0.25rem;
    border-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;

    name{
        font-weight: 700; 
        font-size: 1.5rem;
    }
    p+p{
        font-weight: normal; 
        font-size: 1rem;
        color: dimgray;
        margin-top: -1.2rem;
    }
`

export const StyledUserLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: 700;
    margin-right: 10rem;
    
    &:hover{
        color: limegreen;
    }
`

export const StyledUserIcon = styled.img.attrs(props => ({
    src: props.Img || userIcon,
  }))`
   width: 1rem;
   margin-right: 0.5rem;
   margin-left: 0.5rem;
   margin-top: 0.5rem; 
`
export const StyledImage = styled.img.attrs(props => ({
    src: props.Img || noImgageAvailable,
  }))`
   margin-top: 0.5rem;
`
export const StyledNav = styled.nav`
    width: 15rem;
    display: flex;
    justify-content: space-around;
`

export const StyledBuyRent = styled(Link)`
    text-decoration: none;
    text-align: center;
    font-weight: 700;
    color: whitesmoke;
    width: 10rem;
    height: 1.5rem;
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: limegreen;
    border-radius: 0.25rem;

    &:hover{
        color: black;
    }
`
