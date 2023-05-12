import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface Props {
    onHtmlChange: (html: string) => void;
}

export const MyEditor: React.FC<Props> = ({ onHtmlChange }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (newValue: string) => {
        setValue(newValue);
        onHtmlChange(newValue);
    };
    
    return (
        <ReactQuill value={value} onChange={handleChange} />
    );
};
