import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface SortableItemRenderProps {
    listeners: ReturnType<typeof useSortable>['listeners'];
}

interface SortableItemProps {
    id: string;
    className?: string;
    render: (props: SortableItemRenderProps) => React.ReactNode;
}

const SortableItem = ({ id, className, render }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            className={className}
            style={{
                transform: CSS.Translate.toString(transform),
                transition
            }}>
            {render({ listeners })}
        </div>
    );
};

export default SortableItem;
