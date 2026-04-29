import styles from './SubPageHeader.module.scss';
import classNames from 'classnames/bind';
import { useBack } from '~/hooks';
import Text from '../Text';
const cx = classNames.bind(styles);

import { ChevronLeft } from '~/icon';

const SubPageHeader = () => {
    const back = useBack();

    return (
        <div className={cx('SubPageHeader')}>
            <button type="button" onClick={back}>
                <ChevronLeft />
                <Text as="span" size="sm" weight="medium" className={cx('back-text')}>
                    Back
                </Text>
            </button>
        </div>
    );
};

export default SubPageHeader;
