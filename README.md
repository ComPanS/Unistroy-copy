# Unistroy-copy
 
Этот проект заточен, чтобы закрепить знания и полчить новые навыки. В конечном счете будет проект, который будет схож с сайтом [Унистроя](https://unistroyrf.ru/). 

В проекте реализовано:
- создание постов
- редактирование постов
- удаление постов
- регистрация/авторизация
- вывод постов в зависимости от города
- динамический хедер, состоящий из 2 разных частей (левого и верхнего)
- выбор города в хедере
- доступ только админам взаимодействовать с постами
- пост привязан к определенному админу
- динамический вывод постов в хедере ховером в зависимости от выбранного города
- города в хедере динамически добавляются, если появляется новый город в посте

#### Backend
1. **Node.js + Express**: Фреймворк для серверной части приложения, используемый для обработки HTTP-запросов и маршрутизации.
2. **MongoDB (через Mongoose)**: NoSQL база данных для хранения данных приложения в формате документов.
3. **Bcrypt**: Шифрование паролей для обеспечения безопасного хранения пользовательских данных.
4. **JWT (JSON Web Tokens)**: Аутентификация и авторизация пользователей через безопасные взаимодействия на основе токенов.
5. **Multer**: Middleware для обработки multipart/form-data, в основном используется для загрузки файлов.
6. **Express Validator**: Middleware для валидации и очистки пользовательского ввода.
7. **Cors**: Middleware для включения обмена ресурсами между различными источниками (CORS).

#### Frontend
1. **React**: Библиотека для создания пользовательских интерфейсов с использованием компонентной архитектуры.
2. **Redux Toolkit**: Упрощенное управление состоянием для React-приложений.
3. **Material-UI (MUI)**: Библиотека UI-компонентов для реализации Material Design.
4. **React Router DOM**: Декларативная маршрутизация для React-приложений.
5. **Axios**: HTTP-клиент на основе промисов для выполнения запросов к серверной части.
6. **Sass**: Препроцессор CSS для написания более поддерживаемых и масштабируемых стилей.
7. **React Hook Form**: Библиотека для управления формами в React-приложениях.


### Скрины с сайта

#### Главная страница
![image](https://github.com/user-attachments/assets/7b934004-1ee1-49c1-b4e8-9e077553e0f9)

#### Header
![image](https://github.com/user-attachments/assets/a8df8d46-442e-4f7e-b9d3-1818c9b68ca3)

#### Пример одного из статей
![screencapture-localhost-3000-posts-6742f39cbbcb7a9ad91362ee-2024-11-30-21_05_34](https://github.com/user-attachments/assets/6d824c39-2b08-47bf-9f1d-64b2f3eea2fe)

#### Профиль
![image](https://github.com/user-attachments/assets/4793ab80-75bd-4362-b353-f21272b380ae)

#### Авторизация
![image](https://github.com/user-attachments/assets/2054075a-b8b9-4fc8-8958-20b385d423b1)


