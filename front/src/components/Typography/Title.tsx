import styled from 'styled-components'

function Title({ children, className }: any) {
    return (
        <TitleStyled className={className}>
            {children}
        </TitleStyled>
    )
}

export default Title

const TitleStyled = styled.h1.attrs(() => ({
    className: "text-blue-gray-700 font-light",
}))`
    text-decoration: none;
    font-size: 24px;
`;