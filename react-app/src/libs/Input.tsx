import { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { color, fontSize, radius, space } from "./constants";

type Props  = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean

    // リテラルのユニオン型で上書き定義することで、型チェックを厳密にしてtypoなどに気付けるようにする
    type?: 'text' | 'number' | 'password'

    className?: string
}

export const Input: FC<Props> = ({
    type,
    value,
    onChange,
    className = '',
    error = false,
    ...props

}) => {
    return (
        <Wrapper
            type={type}
            value={value}
            className={`${className} ${error ? 'error' : ''}`}
            onChange={onChange}
            {...props}
            />
    )

}

const Wrapper = styled.input`
    height: 42px;
    padding: ${space.m};
    border-radius: ${radius.m};
    border: solid 1px ${color.gray};
    font-size: ${fontSize.m};
    box-sizing: border-box;

    &.error {
        color: ${color.red};
        border: solid 1px ${color.red};
    }
`
