import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
    const { startdeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startdeletingEvent();
    };

    return (
        <button
            style={{ display: hasEventSelected ? "" : "none" }}
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash-alt" />
        </button>
    );
};
