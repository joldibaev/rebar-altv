import { useTranslate } from '@Shared/translate.js';

const { setBulk } = useTranslate('ru');

setBulk({
    ru: {
        'auth.span.login': 'Авторизация',
        'auth.span.register': 'Регистрация',
        'auth.span.remember': 'Запомнить меня',
        'auth.span.invalid_credentials': 'Электронная почта или пароль указан неверно',
        'auth.span.invalid_email': 'Невалидная электронная почта',
        'auth.span.invalid_password_length': 'Пароль должен содержать более 6 символов',
        'auth.span.invalid_confirm_password': 'Пароль и пароль подтверждения не совпадают',
        'auth.span.user_already_exists': 'Пользователь с этим адресом электронной почты уже зарегистрирован',
        'auth.span.register.error': 'Что-то пошло не так, попробуйте еще раз',
        'auth.span.email': 'Электронная почта',
        'auth.span.password': 'Пароль',
        'auth.span.confirm': 'Подтвердите пароль',
        'auth.span.last_login': 'Последний вход',
        'auth.span.exit': 'Последний вход',
        'auth.span.enter_to_game': 'Последний вход',
        'auth.kick.sessionKey': 'Не разрешено проходить аутентификацию',
        'auth.kick.alreadyLoggedIn': 'Уже вошел в систему',
    },
});
