import { FC, ReactNode } from "react"
import styled from "styled-components"

type HeaddingType = 'h1' | 'h2'| 'h3'| 'h4'| 'h5'| 'h6'

type Props = {
    children: ReactNode
    tag: HeaddingType
}

export const Heading: FC<Props> = ({
    children,
    tag,
}) => {
    return (
        // styled-componentsのtag props機能を使って、レンダリング要素のタグを動的に変更する
        <Wrapper as={tag}>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.h1`
    margin: 0;
`