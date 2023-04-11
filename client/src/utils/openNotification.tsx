import { notification } from 'antd';


interface NotificationParams {
    name: string,
    description: string,
}

export const openNotification = ({ name, description }: NotificationParams) => {
    notification.open({
        message: name,
        description,
    });
};
