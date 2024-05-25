import styles from './__NAME__.module.scss';

import React from 'react';

interface __NAME__Props {
    children?: React.ReactNode;
}

const __NAME__ = ({ children }: __NAME__Props) => {
    return (
        <div className={styles.__NAME__}>{children}</div>
    );
};

export default __NAME__;
