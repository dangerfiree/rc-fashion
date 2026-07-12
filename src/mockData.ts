import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'conjunto-alo',
    name: 'Conjunto Alo',
    description: 'O Conjunto Alo combina conforto, estilo e sofisticação em uma peça versátil para qualquer ocasião. Confeccionado em tecido premium de alta elasticidade, possui modelagem que valoriza a silhueta, oferecendo um caimento impecável e liberdade de movimento. A jaqueta com zíper frontal e gola alta, junto à legging de cintura alta, cria um visual moderno, elegante e perfeito tanto para o dia a dia quanto para atividades físicas leves.',
    price: 349.90,
    images: [
      'https://i.imgur.com/PQjUNLT.png',
      'https://i.imgur.com/W1dMekz.png'
    ],
    colorImages: {
      'Cinza': [
        'https://i.imgur.com/PQjUNLT.png',
        'https://i.imgur.com/W1dMekz.png'
      ],
      'Azul': [
        'https://i.imgur.com/HvGfdFu.png',
        'https://i.imgur.com/m7ZafdC.png'
      ],
      'Branco': [
        'https://i.imgur.com/M2UtSRr.png',
        'https://i.imgur.com/oOQqgCi.png'
      ]
    },
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Cinza', 'Azul', 'Branco'],
    stock: 100,
    created_at: new Date().toISOString(),
  }
];
