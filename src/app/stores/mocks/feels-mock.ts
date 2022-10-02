import { FeelsModel } from 'app/models';

export const feelsMock: FeelsModel = {
  primary: ['Злость', 'Страх', 'Грусть', 'Радость', 'Любовь'],
  secondary: [
    {
      parent: 'Злость',
      list: [
        'Бешенство',
        'Возмущение',
        'Враждебность',
        'Вредность',
        'Вседозволенность',
        'Высокомерие',
        'Гнев',
        'Досада',
        'Зависть',
        'Истерия',
        'Напряжение',
        'Негодование',
        'Недовольство',
        'Ненависть',
        'Неприязнь',
        'Обида',
        'Отвержение',
        'Отвращение',
        'Превосходство',
        'Презрение',
        'Пренебрежение',
        'Принуждение',
        'Протест',
        'Раздражение',
        'Ревность',
        'Уязвленность',
        'Ярость',
      ],
    },
    {
      parent: 'Страх',
      list: [
        'Беспокойство',
        'Вина',
        'Дискомфорт',
        'Замешательство',
        'Застенчивость',
        'Испуг',
        'Надменность',
        'Настороженность',
        'Неловкость',
        'Неполноценность',
        'Неуверенность',
        'Неудобство',
        'Одиночество',
        'Опасение',
        'Отчаяние',
        'Оцепенение',
        'Ошарашенность',
        'Ошеломленность',
        'Подвох',
        'Подозрение',
        'Растерянность',
        'Робость',
        'Сломленность',
        'Смущение',
        'Сомнение',
        'Страх',
        'Стыд',
        'Тревога',
        'Угрызения совести',
        'Ужас',
        'Унижение',
        'Холодность',
      ],
    },
    {
      parent: 'Грусть',
      list: [
        'Апатия',
        'Безнадежность',
        'Безразличие',
        'Безысходность',
        'Беспомощность',
        'Горечь',
        'Грусть',
        'Душевная боль',
        'Жалость',
        'Жалость к себе',
        'Загнанность',
        'Лень',
        'Нервозность',
        'Огорчение',
        'Опустошенность',
        'Отверженность',
        'Отрешенность',
        'Отчужденность',
        'Печаль',
        'Подавленность',
        'Потрясение',
        'Равнодушие',
        'Разочарование',
        'Скорбь',
        'Скука',
        'Сожаление',
        'Тоска',
        'Тупик',
        'Удрученность',
        'Уныние',
        'Усталость',
      ],
    },
    {
      parent: 'Радость',
      list: [
        'Блаженство',
        'Вдохновение',
        'Взаимовыручка',
        'Возбуждение',
        'Воодушевление',
        'Восторг',
        'Довольство',
        'Изумление',
        'Интерес',
        'Кураж',
        'Ликование',
        'Любопытство',
        'Надежда',
        'Облегчение',
        'Ободренность',
        'Оживление',
        'Ожидание',
        'Окрыленность',
        'Предвкушение',
        'Приподнятость',
        'Радость',
        'Решимость',
        'Спокойствие',
        'Счастье',
        'Торжествование',
        'Триумф',
        'Увлеченность',
        'Удивление',
        'Удовлетворение',
        'Удовольствие',
        'Эйфория',
        'Экстаз',
        'Энтузиазм',
      ],
    },
    {
      parent: 'Любовь',
      list: [
        'Безопасность',
        'Благодарность',
        'Вера',
        'Влюбленность',
        'Восхищение',
        'Гордость',
        'Доброта',
        'Доверие',
        'Дружелюбие',
        'Единство',
        'Жизнелюбие',
        'Жизнерадостность',
        'Забота',
        'Защищенность',
        'Искренность',
        'Комфорт',
        'Любовь',
        'Любовь к себе',
        'Нежность',
        'Обожание',
        'Одобрение',
        'Озарение',
        'Очарованность',
        'Привязанность',
        'Признательность',
        'Принятие',
        'Раскаяние',
        'Самоценность',
        'Симпатия',
        'Смирение',
        'Сопереживание',
        'Сопричастность',
        'Сочувствие',
        'Теплота',
        'Уважение',
        'Уверенность',
        'Умиротворение',
        'Уравновешенность',
        'Ценность',
      ],
    },
  ],
};