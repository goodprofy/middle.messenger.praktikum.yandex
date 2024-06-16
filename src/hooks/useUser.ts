const profile = {
  email: { title: 'Почта', value: 'pochta@yandex.ru' },
  login: { title: 'Логин', value: 'ivanivanov' },
  firstName: { title: 'Имя', value: 'Иван' },
  lastName: { title: 'Фамилия', value: 'Иванов' },
  chatName: { title: 'Имя в чате', value: 'Иван' },
  phone: { title: 'Телефон', value: '+7 (909) 967 30 30' }
} as const;

export function useUser() {
  return profile;
}
