import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarState } from "../hooks/useCalendarState";

registerLocale("es", es);

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
    const {
        formValues,
        titleClass,
        onInputChange,
        onDateChanged,
        onSubmit,
        isDateModalOpen,
        onCloseModal,
    } = useCalendarState();

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group mb-2 d-flex flex-column">
                    <label className="form-label">Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control full-width"
                        placeholder="Fecha registro"
                        name="start"
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, "start")}
                        dateFormat={"dd/MM/yyyy HH:mm"} // "Pp"
                        showTimeSelect
                        locale={"es"}
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2 d-flex flex-column">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        className="form-control full-width"
                        placeholder="Fecha registro"
                        name="end"
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, "end")}
                        dateFormat={"dd/MM/yyyy HH:mm"} // "Pp"
                        showTimeSelect
                        locale={"es"}
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
