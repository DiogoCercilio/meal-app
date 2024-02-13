import styled from 'styled-components'

function Title2({ children, className }: any) {
    return (
        <TitleStyled className={className}>
            {children}
        </TitleStyled>
    )
}

export default Title2

const TitleStyled = styled.h2.attrs(() => ({
    className: "text-gray-800",
}))`
    text-decoration: none;
    font-size: 18px;
    font-weight: 300;
`;