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

setBulk({
    ru: {
        'character.select.no.account': 'Аккаунт не найден, перезапустите игру',
        'character.select.bad.write': 'Не удалось обновить, переподключитесь к серверу',
        'character.select.bad.character': 'Персонаж не существует, переподключитесь к серверу',
        'character.select.first.invalid': 'Недопустимое имя',
        'character.select.last.invalid': 'Недопустимая фамилия',
        'character.select.invalid.characters': 'Имя содержит недопустимые символы',
        'character.select.username.taken': 'Имя недоступно',
        'character.select.character.not.found': 'Персонаж не найден, обновлены персонажи',
        'character.select.submit': 'Отправить',
        'character.select.cancel': 'Отменить',
        'character.select.confirm': 'Подтвердить',
        'character.select.delete': 'Удалить',
        'character.select.spawn': 'Появиться',
        'character.select.create': 'Создать персонажа',
        'character.select.no.appearance': 'Нет внешности',
        'character.select.confirm.delete': 'Вы уверены, что хотите удалить',
        'character.select.first': 'Имя / Первое имя',
        'character.select.last': 'Фамилия',
        'character.select.max.characters.reached': 'Достигнуто максимальное количество персонажей',
    },
});
