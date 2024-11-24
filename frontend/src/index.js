import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

// CssBaseline – сбрасывает стандартные стили браузера, чтобы стилизация выглядела одинаково на всех платформах.
// ThemeProvider – предоставляет кастомную тему для всего приложения, которую вы создали в theme.js.
// BrowserRouter – отвечает за маршрутизацию в приложении, позволяя переключаться между страницами без перезагрузки.
// Provider – оборачивает приложение, чтобы сделать Redux-хранилище доступным для всех дочерних компонентов.
// App – это основной компонент, который содержит всё приложение.
// ReactDOM.createRoot – функция, которая монтирует React-приложение в элемент DOM с ID root.
