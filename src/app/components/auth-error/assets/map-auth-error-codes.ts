export const MapAuthErrorCodes: Record<string, string> = {
  'auth/user-not-found': 'Такой пользователь не найден',
  'auth/wrong-password': 'Неверный пароль',
  'auth/phone-number-already-exists': 'Такой номер телефона уже существует',
  'auth/invalid-password': 'Недопустимый пароль',
  'auth/email-already-exists': 'Такой адрес почты уже существует',
  'auth/email-already-in-use': 'Такой адрес почты уже используется',
  'auth/network-request-failed': 'Ошибка подключения. Попробуйте позже',
  'auth/popup-closed-by-user': 'Авторизация прервана. Попробуйте снова',
  'auth/requires-recent-login':
    'Авторизационные данные устарели. Перелогинтесь.',
};
