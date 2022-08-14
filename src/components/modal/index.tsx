import React, { useEffect, useRef, useState } from "react";
import classnames from 'classnames'

interface ModalProps {
    visible?: boolean;
    title?: string;
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { visible, title } = props;
    return (
        <div className={classnames('modalmasklayer', { modalvisible: !visible })}>
            <div className={classnames('modalson')}>
                <div className={classnames('modaltitle')}>
                    <span className={classnames('mtitlestring')}>{title || 'Modal确认框'}</span>
                    <span className={classnames('modalcloseIcon')}>x</span>
                </div>
                <div>content</div>
                <div>footer</div>
            </div>
        </div>
    )
}


