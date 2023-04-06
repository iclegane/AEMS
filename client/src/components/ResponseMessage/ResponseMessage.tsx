import { Result } from 'antd';
import React from 'react';


interface ResponseMessage {
    isSuccess: boolean
}

export const ResponseMessage: React.FC<ResponseMessage> = ({ isSuccess }) => (
    <Result
        status={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Successfully create Task' : 'Submission Failed'}
        subTitle={isSuccess ? 'New task has been added successfully.' : 'Please check and modify the form before resubmitting.'}
    />
);
