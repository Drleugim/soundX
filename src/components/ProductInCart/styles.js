import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  margin-top: 1rem;

`

export const StyledSectionBut = styled.section`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin-top: 5rem;

  flex-direction: column;
  align-items: center;
`

export const StyledUserLink = styled.button`
  text-decoration: none;
  color: black;
  font-weight: 700;
  margin-left: 5rem;
  margin-top:
  
  &:hover{
      color: limegreen;
  }
`