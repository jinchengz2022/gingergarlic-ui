import React from "react";
import classnames from 'classnames'

import { Button } from '../button'
import { useListennerEvent } from '../../utils/useListennerEvent'

interface ModalProps {
    visible?: boolean;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    okText?: string;
    closeText?: string;
    width?: number;
    maskClosable?: boolean;
    onClose?: () => void;
    onOk?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
    visible = false,
    title,
    children,
    footer,
    okText = '确认',
    closeText = '取消',
    width = 520,
    maskClosable = true,
    onClose,
    onOk
}) => {
    const maskRef = React.useRef<any>();
    // 监听按下esc键关闭
    useListennerEvent(maskRef, 'keydown', (e) => {
        if (e.code === 'Escape' && maskClosable) {
            onClose?.();
        }
    })

    // 监听点击蒙层
    // useListennerEvent(maskRef, 'click', (e) => { 
    // })

    const localFooter = (
        footer ?? (
            <>
                <Button style={{ marginRight: 12, padding: '4px 24px' }} onClick={onClose}>
                    {closeText ?? '取消'}
                </Button>
                <Button btnType='primary' style={{ padding: '4px 24px' }} onClick={onOk}>
                    {okText ?? '确认'}
                </Button>
            </>
        )
    )

    return (
        visible ? (
            <div
                className={classnames('modal-wrapper', { modalvisible: !visible })}
                ref={maskRef}
            >
                <div
                    style={{ width }}
                    className={classnames('modal-container')}
                >
                    <div className={classnames('modal-close-icon')} onClick={onClose}>x</div>
                    <div className={classnames('modal-header')}>
                        {title && (
                            <span className={classnames('modal-title')}>{title}</span>
                        )}
                    </div>
                    <div className={classnames('modal-content')}>{children}</div>
                    <div className={classnames('modal-footer')}>
                        {localFooter}
                    </div>
                </div>
            </div>
        ) : <></>
    )
}


