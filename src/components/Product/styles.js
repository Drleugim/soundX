import styled from 'styled-components'
import { Link } from 'react-router-dom'
import userIcon from './../../media/user.png'
import noImgageAvailable from './../../media/no-image-available.png'

export const StyledArticle = styled.article`
    width: 15rem;
    height: 18rem;
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

    p{
        font-weight: 700; 
        font-size: 1.5rem;
    }
    p~p{
        font-weight: normal; 
        color: dimgray;
        margin-top: -0.2 rem;
    }
    span{
        align-self: flex-start;
        margin-left: 1rem;
    }
    span+span{
        align-self: flex-end;
        margin-top: -1.20rem;
        margin-right: 1.1rem;
        padding-left: 1.5rem;
        border-left: 0.1rem;
        border-left-style: solid;
    }
`

export const StyledUserLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: 700;
    margin-right: 10rem;
    
    &.linkToProduct{
        font-size: 1.5rem;
        margin-right: 0rem;
        margin-bottom: 1rem;
    }

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
