import styled from 'styled-components'
import logo from '../../media/pictures/SNX-logo.png'
import background from '../../media/pictures/bg-photo.jpg'

export const BackgroundSection = styled.div`
    min-height: 100%;
    min-width: 1024px;
     
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    background-image: url(${background});

`


export const MainStyle = styled.main`
    display: flex;
    align-items: center;
    flex-flow: column;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px lightgreen;
    margin-top: 12rem;
    background-color: white;

    
    & form{
        width: 300px;
        height: 300px;
    }

    & form section{
        margin-bottom: 1em;
    }

    & form section .userPass{
        display: flex;
        justify-content: space-evenly;
        margin-top: 1em;
    }


    & form section .userPass a{
        text-decoration: none;
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

    & form section label[for=email]{
        margin-right: 36px;
    }

    & form section label[for=password]{
        margin-right: 14px;
    }

        
`

export const LogoStyle = styled.img.attrs(props => ({
  src: props.src || logo
  }))`
    width: 13rem;
    height: 12rem;
    src: url(${logo})
`