import styled from 'styled-components'
import background from './../../media/bg-photo.jpg'
import userWarningIcon from './../../media/userWarning.png'

export const StyledMain = styled.main`
    height: 100vh;
    width: 100vw;
    background-image: url(${background});
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center; 
    
    p:last-child{
        color: dimgray;
        font-size: 1.5rem;
        margin: 1.2rem 0 0 0.5rem;
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

`
export const StyledUserWarning = styled.img.attrs(props => ({
    src: props.Img || userWarningIcon,
  }))`
    width: 2rem;
    height: 2rem;
    margin-top: 1.2rem;
    
`
export const StyledSection = styled.section`
    width: 33rem;
    height: 4rem;
    margin-top: 3rem;
    background-color: white;
    display: flex;
    justify-content: center;
    border: 2px solid tomato;
    border-radius: 10px;
    box-shadow: 5px 5px tomato;

`