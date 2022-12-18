import { FC } from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { fontSize, space } from "./constants"

type Props = {
    onSubmit: (password: string) => void
}

export const PasswordForm: FC<Props> = ({ onSubmit }) => {
    return (
        <Wrapper>
            <Label htmlFor="password">Password:</Label>
            <InputForm id="password" type="password" onChange={(e) => console.log(e)} />
            <Button onClick={() => onSubmit('')} title="実行" />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
`

const Label = styled.label`
    margin: 0 ${space.m} 0 0;
    font-size: ${fontSize.m};
    line-height = 42px;
`

const InputForm = styled(Input)`
    margin-right: ${space.m};
`