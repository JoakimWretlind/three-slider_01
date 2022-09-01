import styled from 'styled-components';

export const Slideshow = styled.div`
    position: absolute;
    top: 5%;
    right: 5%;
    bottom: 5%;
    left: 5%;
    z-index: 15;

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    &.img{
        display: none;
    }
`;

export const H1 = styled.h1`
    color: #fff;
    font-size: 3rem;
    font-weight: 300;
    letter-spacing: clamp(1rem, 2vw, 2rem);
    text-shadow: 0 .1rem .1rem rgba(0,0,0,2);
`;