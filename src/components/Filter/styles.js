import styled from 'styled-components'

export const StyledAside = styled.section`
    width: 15rem;
    height: 28rem;
    background-color: mintcream;
    border-radius: 0.25rem;
`
export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    p{
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-weight: 350;
    }

    label{
        position: relative;
        margin-left: 1.8rem;
        margin-top: -1rem;
    }
    label+label{
        margin-left: 0rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-weight: 350;
    }
    label+label~label{
        color: mediumseagreen;
        margin-top: 0rem;
        margin-left: 3.8rem;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
`
export const StyledInput = styled.input`
    width: 6rem;
    height: 2rem;
    margin-top: -1.2rem;
    margin-bottom: 0.5rem;
`
export const StyledButton = styled.button`
    color: black;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: 350;
    width: 6rem;
    height: 1.5rem;
    background-color: limegreen;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 0.120rem;
    border-color: limegreen;

    &:hover{
        color: honeydew;
    }

    &:last-child{
        margin-top: 1rem;
    }
`