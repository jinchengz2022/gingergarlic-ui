import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
    visible: boolean;
    children?: React.ReactNode;
    onOk?: () => void;
    onCannel?: () => void;
    clickSpace?: boolean; //点击空白处控制Modal显隐依赖
    style?: React.CSSProperties;
    width?: string;
    title?: string;
    buttonShow?: boolean;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { visible, children, onOk, onCannel, clickSpace = true, style, title = 'Modal对话框', buttonShow=true } = props;
    const divRef: any = useRef();

    const add = (e: any) => {
        if (!(divRef.current.offsetLeft < e.clientX
            && e.clientX < (divRef.current.offsetLeft + divRef.current.offsetWidth)
            && divRef.current.offsetTop < e.clientY
            && e.clientY < (divRef.current.offsetTop + divRef.current.offsetHeight)) && clickSpace && onCannel) {
            onCannel();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', add);
        return () => {
            document.removeEventListener('mouseup', add);
        }
    }, [])

    const styleProps: any = {
        width: '500px',
        height: '300px',
        border: '1px solid red',
        display: `${visible ? 'block' : 'none'}`,
    }

    return (
        <div
            ref={divRef}
            style={{
                ...styleProps,
                ...style,
            }}>
            <div style={{ display: 'flex', justifyContent: 'round' }}>
                <span style={{ flex: 1 }}>{title}</span>
                <a style={{ flex: 1, height: '10%', textAlign: 'right', display: 'inline-block', color: '#ccc', paddingRight: '5px' }} onClick={onCannel}>x</a>
            </div>
            <div style={{ height: '80%' }}>
                {children}
            </div>
            <div style={{ textAlign: 'right', height: '10%' }}>
                {
                    buttonShow ? <>
                        <button onClick={onOk}>确认</button>
                        <button onClick={onCannel}>取消</button></> : null
                }

            </div>
        </div>
    )
}

