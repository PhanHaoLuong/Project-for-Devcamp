import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import TerminalIcon from '../assets/terminal.svg';

import '../styles/DialogBox.css';

const DialogBox = ({ mode='info', message, header, visible, onConfirm, onClose }) => {
    const [dialogMode, setDialogMode] = useState(mode);
    const [dialogOptions, setDialogOptions] = useState(['ok']);

    useEffect(() => {
        if (dialogMode === 'confirm') {
            setDialogOptions(['no', 'yes']);
        } else {
            setDialogOptions(['ok']);
        } 
    }, [dialogMode]);

    return (
        <>
            <CSSTransition
                in={visible}
                timeout={300}
                classNames="dialog-screen"
                mountOnEnter
                unmountOnExit
            >
                <div className="dialog-screen">
                    <div className="dialog-box">
                        <div className="dialog-box-header">
                            <span className="header-icon">
                                <img src={TerminalIcon} alt="T" />
                            </span>
                            <span className="header-title">{header || dialogMode}</span>
                        </div>
                        <div className="dialog-box-body">
                            <div className="dialog-message-container">
                                <p className="dialog-message">{message || null}</p>
                            </div>
                            <div className="dialog-options">
                                <button id="option-1" onClick={onClose}>
                                    {dialogOptions[0]}
                                </button>
                                {dialogOptions.length === 2 && (
                                    <button id="option-2" onClick={onConfirm}>
                                        {dialogOptions[1]}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}

export default DialogBox;
