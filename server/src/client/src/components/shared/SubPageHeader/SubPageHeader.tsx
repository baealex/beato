import styles from './SubPageHeader.module.scss';
import classNames from 'classnames/bind';
import { useBack } from '~/hooks';
const cx = classNames.bind(styles);

import { ChevronLeft } from '~/icon';

const SubPageHeader = () => {
    const back = useBack();

    return (
        <div className={cx('SubPageHeader')}>
            <button onClick={back}>
                <ChevronLeft /> <span className={cx('back-text')}>Back</span>
            </button>
        </div>
    );
};

export default SubPageHeader;
