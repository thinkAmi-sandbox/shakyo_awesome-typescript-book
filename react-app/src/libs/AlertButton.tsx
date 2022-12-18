import { FC } from "react";
import { Button, ButtonProps } from "./Button";

type AlertButtonProps = Omit<ButtonProps, 'type'>

export const AlertButton: FC<AlertButtonProps> = ({ title, width = 80, onClick }) => {
    return <Button type="error" onClick={onClick} title={title} width={width} />
}