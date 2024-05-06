import { AppRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

const CalendarApp = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Provider>
        </>
    );
};
export default CalendarApp;

//