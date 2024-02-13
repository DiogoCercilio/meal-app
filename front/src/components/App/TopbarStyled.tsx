import styled from "styled-components";

export const TopbarStyled = styled.section.attrs(()=> ({
    className: ``
}))`
    width: 100%;
    display: flex;
    position: ${(props: any)=> {
        const variant = props['data-variant']
        const value = (!variant || variant === 'default') ? 'initial' : variant === 'fixed' ? 'fixed' : null
        return value}};
    background-color: ${(props: any)=> props['data-color'] || 'transparent'};
    top: 0;
    z-index: 3;
`