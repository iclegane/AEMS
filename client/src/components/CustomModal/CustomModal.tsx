import React from 'react';
import ReactModal from 'react-modal';


interface ModalState {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomModalProps {
    modalState: ModalState;
    children: React.ReactNode;
}

export const CustomModal: React.FC<React.PropsWithChildren<CustomModalProps>> = ({ modalState, children }) => {

    const { isOpen, setIsOpen } = modalState;

    const handleRequestClose = () => setIsOpen((prev) => !prev);

    return(
        <ReactModal
            isOpen={isOpen}
            className="default-modal__content"
            overlayClassName="default-modal"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            onRequestClose={handleRequestClose}
            contentLabel="Profile"
            appElement={document.getElementById('root') || undefined}
        >
            {children}
        </ReactModal>
    );
};
