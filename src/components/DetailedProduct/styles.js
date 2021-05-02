import styled from 'styled-components'
import { Link } from 'react-router-dom'
import userIcon from './../../media/user.png'
import noImgageAvailable from './../../media/no-image-available.png'

export const StyledArticle = styled.article`
  width: 40rem;
  height: 20rem;
  margin-top: 2rem;
  margin-right: 2rem;
  background-color: #FCFCFE;
  border-style: solid;
  border-width: 0.125rem;
  border-radius: 0.25rem;
  border-color: #f4f4f4;
  display: flex;
`
export const StyledSectionPic = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  p{
    font-weight: 700; 
    font-size: 1.5rem;
  }
`
export const StyledSectionDes = styled.section`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin-top: 5rem;
`

export const StyledUserLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 700;
  margin-right: 10rem;
  margin-left: 0.5rem;
  
  &:hover{
      color: limegreen;
  }
`

export const StyledUserIcon = styled.img.attrs(props => ({
  src: props.Img || userIcon,
}))`
  width: 1rem;
  margin-right: 0.5rem;
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

export const StyledBuyRent = styled.button`
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  color: whitesmoke;
  width: 10rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  background-color: limegreen;
  border-radius: 0.25rem;

  &:hover{
      color: black;
  }
`