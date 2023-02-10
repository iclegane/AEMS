import React from 'react';
import './index.scss';


interface Props {
    imageUrl?: string;
    children: React.ReactNode;
}

export const IllustrationLayout: React.FC<Props> = ({ children , imageUrl}) => {
    return (
        <div className="illustration-layout">
            <div className="illustration-layout__content">
                { children }
            </div>
            <div className="illustration-layout__picture-container">
                <div style={{backgroundImage: `url(${imageUrl})`}} className="illustration-layout__picture" />
            </div>
        </div>
    );
};
