import styled from 'styled-components'

export const MainStyle = styled.main`
    display: flex;
    align-items: center; 
    flex-flow: column;
    width: 40rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px lightgreen;

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
    & form section label[for=quantity]{
      margin-right: 99px;
    }
    & form section label[for=brand]{
      margin-right: 118px;
    }
    & form section input[name=description]{
      width: 100%;
      height: 150px;
      padding: 12px 20px;
      margin-top: 0.5rem;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      background-color: #f8f8f8;
      resize: none;
    }   
`