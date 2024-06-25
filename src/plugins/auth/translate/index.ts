import { useTranslate } from '@Shared/translate.js';

const { setBulk } = useTranslate('ru');

setBulk({
    ru: {
        'auth.span.login': 'Авторизация',
        'auth.span.register': 'Регистрация',
        'auth.span.remember': 'Запомнить меня',
        'auth.span.invalid_credentials': 'Электронная почта или пароль указан неверно',
        'auth.span.register.error': 'Что-то пошло не так, попробуйте еще раз',
        'auth.span.email': 'Электронная почта',
        'auth.span.password': 'Пароль',
        'auth.span.confirm': 'Подтвердите пароль',
        'auth.kick.sessionKey': 'Не разрешено проходить аутентификацию',
        'auth.kick.alreadyLoggedIn': 'Уже вошел в систему',
    },
});
