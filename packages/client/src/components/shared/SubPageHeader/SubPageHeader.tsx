import classNames from 'classnames';
import { useBack } from '~/hooks';
import { ChevronLeft } from '~/icon';
import Text from '../Text';

const cx = classNames;

const SubPageHeader = () => {
    const back = useBack();

    return (
        <div className={cx('flex h-16 items-center justify-between border-b border-[var(--b-color-border-subtle)] bg-[var(--b-color-background)] px-3 lg:h-full lg:border-b-0 lg:border-r lg:px-[var(--b-spacing-md)]')}>
            <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--b-color-focus)] lg:h-auto lg:min-h-10 lg:w-auto [&_svg]:h-5 [&_svg]:w-5"
                onClick={back}>
                <ChevronLeft />
                <Text as="span" size="sm" weight="medium" className="ml-[var(--b-spacing-sm)] hidden lg:block">
                    Back
                </Text>
            </button>
        </div>
    );
};

export default SubPageHeader;
