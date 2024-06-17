const profile = {
  email: { title: 'Почта', value: 'pochta@yandex.ru' },
  login: { title: 'Логин', value: 'ivanivanov' },
  first_name: { title: 'Имя', value: 'Иван' },
  second_name: { title: 'Фамилия', value: 'Иванов' },
  display_name: { title: 'Имя в чате', value: 'Иван' },
  phone: { title: 'Телефон', value: '+7 (909) 967 30 30' }
} as const;

export function useUser() {
  return profile;
}
