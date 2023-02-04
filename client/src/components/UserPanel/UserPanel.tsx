import React from "react";
import './index.scss';
import Icon from "@components/Icon";

const UserPanel: React.FC = () => {
    return (
        <>
            <div className="user-panel">
                <div className="user-panel__avatar"></div>
                <div className={'user-panel__info'}>
                    <div className="user-panel__name">John Doe</div>
                    <div className="user-panel__position">Backend developer</div>
                </div>
                <button className={'button button--icon user-panel__btn'}>
                    <Icon name={'arrow'} />
                </button>
            </div>
        </>
    )
}

export default UserPanel;
