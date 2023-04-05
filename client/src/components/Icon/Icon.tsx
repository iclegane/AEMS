import React from 'react';
// todo: fix ts configuration for svg alias
// @ts-ignore
import Icons from '@assets/icons/interface/interface-sprite.svg';
import { IIcon } from './types';


export const Icon: React.FC<IIcon> = ({ name }) => (
        <svg className="icon">
            <use href={`${Icons  }#${  name}`} />
        </svg>
    );
