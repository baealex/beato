import classNames from 'classnames';
import { useBack } from '~/hooks';
import Text from '../Text';
const cx = classNames;

import { ChevronLeft } from '~/icon';

const SubPageHeader = () => {
    const back = useBack();

    return (
        <div className={cx('ow-sub-page-header-SubPageHeader')}>
            <button type="button" onClick={back}>
                <ChevronLeft />
                <Text as="span" size="sm" weight="medium" className={cx('ow-sub-page-header-back-text')}>
                    Back
                </Text>
            </button>
        </div>
    );
};

export default SubPageHeader;
