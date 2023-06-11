/* eslint-disable global-require */

/* eslint-disable max-len */

import { Category } from '../types/Category';
import {
  ProductDescription as Product,
} from '../types/ProductDescription';
import { Model } from '../types/Model';
import { Ram } from '../types/Ram';
import { Capacity } from '../types/Capacity';
import { ColorAvailable } from '../types/ColorAvailable';
import { Description } from '../types/Description';
import { Color } from '../types/Color';
import { Random } from '../types/Random';
import { saveToFile } from './saveToFile';

const random: Random = require('../../node_modules/lodash/random');

type ClassParams = {
  model: string;
  screen: string;
  resolution: string;
  processor: number;
  ram: Ram;
  colors: Color[];
  camera: string;
  basePrice: number;
  year: number;
  category: Category.Phones | Category.Tablets;
};

const tabletDescription: Description[] = [
  {
    title: 'Навколо краса',
    text: [
      'iPad дає змогу зануритися у все, що ви читаєте, дивитеся чи створюєте. Дисплей Liquid Retina оснащений передовими технологіями, як-от True Tone, широким кольором P3 і антибліковим покриттям.',
      'TouchID вбудовано в кнопку, тому ви можете використовувати відбиток пальця, щоб розблокувати iPad, увійти в програми та безпечно здійснювати платежі за допомогою Apple Pay. А iPad доступний у чудових кольорах.',
    ],
  },
  {
    title: 'Розваги на швидкості',
    text: [
      'Проривний чіп тепер в iPad. Він забезпечує до 60 відсотків більшу продуктивність, ніж попереднє покоління, що робить iPad потужним джерелом творчих і мобільних ігор. Плавно виконуйте багатозадачність між потужними програмами та грайте в ігри з інтенсивною графікою. Тож ви можете піти ще далі у своїй творчості за допомогою таких програм, як SketchUp.',
    ],
  },
  {
    title: 'Camera',
    text: [
      '12-мегапіксельна ультраширока передня камера забезпечує центральну сцену, роблячи відеодзвінки більш природними, а створення контенту — веселішим. У міру того, як ви рухаєтеся, камера автоматично панорамується, щоб утримувати вас у центрі кадру. Коли інші приєднуються до кадру або залишають його, зображення розширюється або збільшується. Тож ви можете зосередитися на розмові.',
      '12-мегапіксельна широка задня камера ідеально підходить для зйомки фотографій і відео 4K. А завдяки потужному ISP iPad тепер підтримує Smart HDR, тож ваші фотографії виглядають ще красивіше.',
    ],
  },
];

const phoneDescription: Description[] = [
  {
    title: 'За межами',
    text: [
      'Чарівний новий спосіб взаємодії з iPhone. Революційні функції безпеки, призначені для порятунку життів. Інноваційна камера для неймовірної деталізації. Усе це працює на найкращому чіпі для смартфона.',

      'iPhone також розроблено з нуля, щоб захистити вашу конфіденційність і надати вам можливість контролювати те, чим ви ділитеся та з ким ділитеся',
    ],
  },
  {
    title: 'Камера',
    text: [
      'Зустрічайте першу систему камери, яка поєднує передові технології з легендарною простотою iPhone. Знімайте до чотирьох разів більше кадрів. Отримуйте чудові зображення навіть за  різко слабким освітленням. Знімайте відео найвищої якості на смартфон, а потім редагуйте за допомогою тих самих інструментів, які вам подобаються для фотографій. Ви ніколи не зустрічали чогось  подібного.',

      'Спрямуйте свою камеру за допомогою фотографічних стилів. Виберіть вигляд — наприклад, «Теплий» або «Холодний» — і iPhone вибірково застосовує коригування, зберігаючи небо та відтінки шкіри природними. Тож ваші фотографії автоматично матимуть вигляд, який вам подобається.',
    ],
  },
  {
    title: 'Тривалий час автономної роботи',
    text: [
      'Високоефективний чіп, вдосконалена батарея та iOS 16 працюють разом, щоб подовжити час автономної роботи. Якщо вам знадобиться зарядити, просто покладіть iPhone на бездротовий зарядний пристрій. Або підключіть адаптер потужністю 20 Вт або вище, щоб швидко заряджати від нуля до 50 відсотків за 30 хвилин',
    ],
  },
  {
    title: 'Швидше завантаження. Швидше потокове передавання. Швидша гра. Менше відставання. Більше веселощів.',
    text: [
      'Від прямої трансляції до ігор для кількох гравців і обміну відео – 5G дійсно прискорює роботу. Це навіть робить FaceTime у високій чіткості та SharePlay плавними та безперебійними, коли ви в дорозі..',
    ],
  },
];

export class ProductDescription implements Product {
  id: number;

  namespaceId: string;

  name: string;

  screen: string;

  resolution: string;

  processor: string;

  ram: Ram;

  camera: string;

  colors: Color[];

  capacities: Capacity[];

  models: Model[];

  description: Description[];

  year: number;

  category: Category.Phones | Category.Tablets;

  static idS: number[] = [];

  constructor({
    model,
    screen,
    resolution,
    processor,
    ram,
    camera,
    colors,
    basePrice,
    year,
    category,
  }: ClassParams) {
    this.id = this.getID();
    this.category = category;
    this.year = year;
    this.namespaceId = `apple-${category === 'phones' ? 'iphone' : 'ipad'}-${model.toLocaleLowerCase().split(' ').join('-')}`;
    this.name = `Apple ${category === 'phones' ? 'iPhone' : 'iPad'} ${model}`;
    this.screen = screen;
    this.resolution = resolution;
    this.processor = `Apple A${processor} Bionic`;
    this.ram = ram;
    this.camera = camera;
    this.colors = colors;
    this.capacities = this.getCapacity();
    this.models = this.getModels(basePrice);
    this.description = category === 'phones'
      ? phoneDescription
      : tabletDescription;
  }

  getCapacity(): Capacity[] {
    return this.namespaceId.includes('pro')
      ? ['128GB', '256GB', '512GB']
      : ['64GB', '128GB', '256GB'];
  }

  getID(): number {
    const id = random(1, 999999);

    if (!ProductDescription.idS.includes(id)) {
      ProductDescription.idS.push(id);

      return id;
    }

    return this.getID();
  }

  getPrice(basePrice: number): [number, number][] {
    let price = basePrice;
    const discount = 10;
    const coefficient = 1.2;
    const prices: [number, number][] = [];

    this.capacities.forEach(() => {
      const discountPrice = this.year === 2022
        ? price
        : Math.trunc(price - (price * discount) / 100);

      prices.push([price, discountPrice]);

      price = Math.trunc(price * coefficient);
    });

    return prices;
  }

  getModels(basePrice: number): Model[] {
    const getRemain = () => (random(0, 100) >= 80 ? 0 : random(1, 100));
    const models: Model[] = [];
    const colorsAvailable = () => (this.colors.reduce(
      (acc, color) => (
        { ...acc, [color]: getRemain() }
      ),
      {} as ColorAvailable,
    ));

    this.capacities.forEach((capacity, index) => {
      const model = {
        capacity,
        fullPrice: this.getPrice(basePrice)[index][0],
        discountPrice: this.getPrice(basePrice)[index][1],
        colorsAvailable: colorsAvailable(),
      };

      models.push(model);
    });

    return models;
  }
}

const phoneModels: ClassParams[] = [
  {
    model: '11',
    screen: "6.1' IPS",
    resolution: '1792x828',
    processor: 13,
    ram: '4GB',
    camera: '12 Mp + 12 Mp',
    colors: [
      'black',
      'white',
      'green',
      'yellow',
      'purple',
      'red',
    ],
    basePrice: 500,
    year: 2019,
    category: Category.Phones,
  },
  {
    model: '12',
    screen: "6.1' IPS",
    resolution: '2532x1170',
    processor: 14,
    ram: '4GB',
    camera: '12 Mp + 12 Mp',
    colors: [
      'black',
      'blue',
      'green',
      'red',
      'white',
      'purple',
    ],
    basePrice: 682,
    year: 2020,
    category: Category.Phones,
  },
  {
    model: '13 Mini',
    screen: "5,4' IPS",
    resolution: '2340 x 1080',
    processor: 15,
    ram: '4GB',
    camera: '12 Mp + 12 Mp',
    colors: [
      'black',
      'blue',
      'green',
      'pink',
      'red',
      'white',
    ],
    basePrice: 750,
    year: 2021,
    category: Category.Phones,
  },
  {
    model: '14 Pro',
    screen: "6,1' IPS",
    resolution: '2556 x 1179',
    processor: 16,
    ram: '6GB',
    camera: '48 Mp + 12 Mp + 12MP',
    colors: [
      'black',
      'gold',
      'purple',
      'silver',
    ],
    basePrice: 1355,
    year: 2022,
    category: Category.Phones,
  },
  {
    model: 'SE 2',
    screen: "4,7' IPS",
    resolution: '1334 x 750',
    processor: 13,
    ram: '3GB',
    camera: '12 Mp',
    colors: [
      'black',
      'red',
      'white',
    ],
    basePrice: 425,
    year: 2020,
    category: Category.Phones,
  },
  {
    model: 'XR',
    screen: "6,1' IPS",
    resolution: '1792 x 828',
    processor: 12,
    ram: '4GB',
    camera: '12 Mp',
    colors: [
      'black',
      'blue',
      'coral',
      'red',
      'white',
    ],
    basePrice: 380,
    year: 2018,
    category: Category.Phones,
  },
];

const tabletModels: ClassParams[] = [
  {
    model: 'Mini 6',
    screen: "8,3' IPS",
    resolution: '2266 x 1488',
    processor: 15,
    ram: '4GB',
    camera: '12 Mp',
    colors: [
      'gold',
      'gray',
      'pink',
      'purple',
    ],
    basePrice: 675,
    year: 2021,
    category: Category.Tablets,
  },
  {
    model: 'Air 4',
    screen: "10,9' IPS",
    resolution: '2360 x 1640',
    processor: 14,
    ram: '4GB',
    camera: '12 Mp',
    colors: [
      'gold',
      'gray',
      'blue',
      'green',
      'silver',
    ],
    basePrice: 620,
    year: 2020,
    category: Category.Tablets,
  },
];

export const phones = phoneModels.map((phone) => new ProductDescription(phone));

export const tablets = tabletModels.map((tablet) => new ProductDescription(tablet));

phones.forEach((product) => {
  saveToFile({
    fileName: `${product.namespaceId}.json`,
    data: product,
  });
});

tablets.forEach((product) => {
  saveToFile({
    fileName: `${product.namespaceId}.json`,
    data: product,
  });
});
