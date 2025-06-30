# Завдання React.js
Необхідно реалізувати веб-програму для зберігання інформації про фільми.
Разом з реалізацією потрібно надати документ, що пояснює архітектуру програми
та містить інструкцію із запуску програми.

# Вимоги
Функції, які має підтримувати система:
1. Додати фільм
2. Видалити фільм
3. Показати інформацію про фільм
    - Унікальний ідентифікатор
    - Назва фільму
    - Рік випуску
    - Формат (VHS, DVD, Blu-ray)
    - Список акторів (“Ім'я та прізвище актора”)
4. Показати список фільмів, що відсортовані за назвою в алфавітному порядку
5. Знайти фільм за назвою.
6. Знайти фільм на ім'я актора.
7. Імпорт фільмів із текстового файлу (приклад файлу надається “sample_movies.txt”). Файл повинен завантажуватись через веб-інтерфейс.

# Додаткові дані
В якості сервера API використовуйте Docker образ - https://hub.docker.com/r/webbylabhub/movies

Специфікація API, реалізованого в образі та яку потрібно підключити, доступна за посиланням - https://documenter.getpostman.com/view/356840/TzkyLeVK

Текстовий файл зі списком фільмів для завантаження доступний за посиланням - https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad

# Інструкція по запуску
Docker need to be installed

Download instance: 
`docker pull nika16minaieva/react-movies`

Starting instance: 
`docker run --name react-movies -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8000/api/v1 nika16minaieva/react-movies`

## ВАЖЛИВО
Перед запуском програми, необхідно перевірити наявність файлу .env в корені поекту.

# Архітектура проекту
![Arch](https://raw.githubusercontent.com/Anarasty/webby-test1/refs/heads/master/architecture1.jpg)

# Структура програми
```
src {
    components {
        Search {
            SearchBlock.jsx # Компонент-обгортка для пошуку за назвою та актором (інпуты + запити)
            SearchForm.jsx # Один інпут + кнопка пошуку (використовується в SearchBlock)
            SearchResult.jsx # Вивід результатів пошуку списком
        }
        UI {
            Modal.jsx # Універсальне модальне вікно для AddMovie та детальної інформації про фільм
            Navbar.jsx # Навбар з кнопкою Logout
        }
        AddMovie.jsx # Форма додавання нового фільму (назва, рік, формат, актори)
        AuthForm.jsx # Логін і реєстрація
        DisplayMovie.jsx # Головна сторінка — таблиця фільмів, пошук, додавання, імпорт
        ImportMovie.jsx # Компонент імпорту фільмів з txt файлу через API /import
        MovieItem.jsx # Окрема рядок фільму в таблиці (з кнопками Переглянути та Видалити)
    }
    redux {
        authSlice.jsx # Redux slice для авторизації, логіна, реєстрації, виходу
        moviesSlice.jsx # Redux slice для фільмів: список, вибраний фільм, імпорт
        movieThunk.jsx # AsyncThunk: fetchMovies, addMovie, deleteMovie, fetchMovieById, importMovies
        store.jsx # Конфігурація Redux store — об'єднує movies і auth
    }
    api_const.js # Файл з константами: базові URL API (MOVIES_API, IMPORT_API тощо)
    App.css 
    App.js 
    index.js
    index.css
}
.dockerignore
.env # Змінні середовища (REACT_APP_API_URL)
Dockerfile
package-lock.json
package.json
README.md
```