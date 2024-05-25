import styles from './SubPageHeader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Left } from '~/icon';

const SubPageHeader = () => {
    return (
        <div className={cx('SubPageHeader')}>
            <button onClick={() => history.back()}>
                <Left /> <span className={cx('back-text')}>Back</span>
            </button>
        </div>
    );
};

export default SubPageHeader;
