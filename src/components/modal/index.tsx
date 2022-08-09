import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
    visible: boolean;
    children?: React.ReactNode;
    onOk?: () => void;
    onCannel?: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { visible,children, onOk=()=>{
        setVisibleState(false);
    }, onCannel=()=>{
        setVisibleState(false);
    } } = props;
    const [visibleState, setVisibleState] = useState(visible);
    const divRef: any = useRef();

    const add = (e: any) => {
        if (!(divRef.current.offsetLeft < e.clientX
            && e.clientX < (divRef.current.offsetLeft + divRef.current.offsetWidth)
            && divRef.current.offsetTop < e.clientY
            && e.clientY < (divRef.current.offsetTop + divRef.current.offsetHeight))) {
                setVisibleState(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', add);
        return () => {
            document.removeEventListener('mouseup', add)
        }
    }, [])

    const styleProps: any = {
        width: '500px',
        height: '300px',
        border: '1px solid red',
        display: `${visibleState ? 'block' : 'none'}`
    }

    return (
        <div
            ref={divRef}
            style={styleProps}>
            <a>x</a>
            <div>
                {children}
            </div>
            <button onClick={onOk}>确认</button>
            <button onClick={onCannel}>取消</button>
        </div>
    )
}

