import { FC } from "react"

type Props = {
    text: string
}

export const Text: FC<Props> = ({ text }) => {
    return <p>{text}</p>
}