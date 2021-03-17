import styled from 'styled-components'
import background from '../../media/pictures/welcome.jpg'

export const SectionWelcome = styled.section`
  height: 100vh;
  position: relative;
  background-color: black;
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */

  & .Logout{
    position: absolute;
    right: 0;   
    text-decoration: none;
    font-size: 1.3em;
  }

  & h1{
    /* margin-top: 5rem; */
    margin: 0;
    text-align: center; 
    color: green;
  }
`
export const SectionBRPub = styled.section`
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px lightgreen;
  margin-block: 6rem;
  background-image: url(${background});

  & .BuyRent, & .Publish{
    border: 1px solid green;
    width: 100px;
    margin: auto;
    margin-bottom: 1rem;
    height: 29px;
    border-radius: 5px;
    text-decoration: none;
    background-color: green;
    color: white;
    box-shadow: 2px 2px lightgreen;
  }

  & .Publish{
    margin-bottom:auto;
  }
`