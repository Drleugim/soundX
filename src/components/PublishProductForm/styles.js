import styled from 'styled-components'
import logo from '../../media/pictures/SNX-logo.png'
import background from '../../media/pictures/bg-photo.jpg'

export const BackgroundSection = styled.div`
    height: 150vh;
    background-image: url(${background});
    display: flex;
    align-items: center; 

`
export const MainStyle = styled.main`
    display: flex;
    align-items: center; 
    flex-flow: column;
    width: 500px;
    height: 850px;
    margin: 0 auto;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px lightgreen;
    background-color: white;

    & form section{
        margin-bottom: 0.5em;
    }

    & form section button{
        font-size: 1em;
        width: 8rem;
        height: 2.5rem;
        background-color: green;
        color: white;
        margin: 0 auto;
        border: 2px solid white;
        border-radius: 6px;
    }

    & form section label[for=nameProduct]{
        margin-right: rem;
    }

    & form section label[for=buyPrice]{
        margin-right: 99px;
    }

    & form section label[for=rentPrice]{
        margin-right: 92px;
    }

    & form section input[name=description]{
      width: 100%;
      height: 150px;
      padding: 12px 20px;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      background-color: #f8f8f8;
      resize: none;
    }   
`

export const LogoStyle = styled.img.attrs(props => ({
  src: props.src || logo
  }))`
    width: 13rem;
    height: 12rem;
    src: url(${logo})
`