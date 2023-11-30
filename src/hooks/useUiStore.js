import { useSelector, useDispatch } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../store/";

export const useUiStore = () => {
    const { isDateModalOpen } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };

    const toggleDateModal = () => {
        isDateModalOpen ? openDateModal() : closeDateModal();
    };

    return {
        //* Propiedades
        isDateModalOpen,

        //* Metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    };
};
