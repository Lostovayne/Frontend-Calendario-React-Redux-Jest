import { addHours, differenceInSeconds } from "date-fns";
import { useMemo } from "react";
import { useState } from "react";
import { Swal } from "sweetalert2";
import { useUiStore } from "./../../hooks/useUiStore";
import { useEffect } from "react";
import { useCalendarStore } from "../../hooks";

export const useCalendarState = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { activeEvent } = useCalendarStore();

    const [formValues, setformValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return "";
        return formValues.title.length > 0 ? "" : "is-invalid";
    }, [formValues.title, formSubmitted]);

    const onInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    useEffect(() => {
        if (activeEvent !== null) {
            setformValues({ ...activeEvent });
        }
    }, [activeEvent]);

    const onDateChanged = (event, changing) => {
        setformValues({
            ...formValues,
            [changing]: event,
        });
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const diference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(diference) || diference <= 0) {
            Swal.fire({
                title: "Error!",
                text: "Fechas incorrectas",
                icon: "error",
                confirmButtonText: "Ok",
            });

            return;
        }

        if (formValues.title.length <= 0) return;

        console.log(formValues);
        //Todo : Cerrar el modal

        onCloseModal();
    };

    return {
        ...formValues,
        formValues,
        formSubmitted,
        titleClass,
        onInputChange,
        onDateChanged,
        onSubmit,
        onCloseModal,
        isDateModalOpen,
    };
};
