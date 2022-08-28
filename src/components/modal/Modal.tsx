import React from "react";
import classnames from 'classnames'

interface ModalProps {
    visible?: boolean;
    title?: string;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { visible, title } = props;
    return (
        <div className={classnames('modal-wrapper', { modalvisible: !visible })}>
            <div className={classnames('modal-container')}>
                <div className={classnames('modal-header')}>
                    <span className={classnames('modal-title')}>{title ?? 'Modal确认框'}</span>
                    <span className={classnames('modal-close-icon')}>x</span>
                </div>
                <div className={classnames('modal-content')}>content</div>
                <div className={classnames('modal-footer')}>footer</div>
            </div>
        </div>
    )
}


