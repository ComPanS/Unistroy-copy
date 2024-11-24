import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});


// shadows: ["none"] – отключает тени во всём приложении. MUI по умолчанию использует тени для таких элементов, как кнопки и карточки, но здесь все они убраны.

// palette – задаёт цветовую палитру для вашего приложения:

// primary.main: "#4361ee" – устанавливает основной цвет для всех элементов, использующих color="primary". Этот синий оттенок #4361ee теперь будет основным цветом.
// typography – настраивает стили текста:

// button: { textTransform: "none", fontWeight: 400 } – это настройка для кнопок.
// textTransform: "none" отменяет стандартное преобразование текста кнопок в верхний регистр.
// fontWeight: 400 задаёт нормальный вес шрифта для текста на кнопках, что делает его более нейтральным и не таким жирным, как по умолчанию.