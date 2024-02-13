import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user: Prisma.UserCreateInput = {
    name: "John Doe",
    email: "john@doe.com",
  };

  const categories: Prisma.MealCategoryCreateInput[] = [
    {
      name: "Mexican",
      banner:
        "https://media.cnn.com/api/v1/images/stellar/prod/230320152734-02-mexican-foods-birria.jpg?c=original&q=h_618,c_fill",
    },
    {
      name: "Japanese",
      banner:
        "https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1664219638.jpg",
    },
    {
      name: "Fast Food",
      banner:
        "https://excellentglobal.com.br/wp-content/uploads/2018/11/bloggif_5bfc3ae6945b8.jpeg",
    },
    {
      name: "Healthy",
      banner:
        "https://www.naturemade.com/cdn/shop/articles/healthy-foods-to-eat.jpg?v=1611988563",
    },
    {
      name: "Others",
      banner:
        "https://newsinhealth.nih.gov/sites/nihNIH/files/styles/featured_media_breakpoint-large/public/2023/August/aug-2023-cover-illustration-different-types-foods-five-food-groups-vegetables-fruits-dairy-products-oils-proteins.jpg?itok=1I_7PRfJ",
    },
  ];

  const meals: Prisma.MealUncheckedCreateInput[] = [
    {
      name: "Taco",
      description: "Taco with Chilli",
      calories: 1000,
      image: 'https://media.istockphoto.com/id/459396345/photo/taco.jpg?s=612x612&w=0&k=20&c=_yCtd6OEb2L8xNal4kC1xvm8HoBp8sry6tcBwmxmPHw=',
      categoryId: 1,
    },
    {
      name: "Chili Beans",
      description: "The best Chilli Beans! You should prove it!",
      calories: 1400,
      image: 'https://caldobom.com.br/uploads/01647fa5a1c3e01a664a3a072bbe919e1645186293.png',
      categoryId: 1,
    },
    {
      name: "Harumaki",
      description: "The best Harumaki in the World",
      calories: 840,
      image: 'https://www.longwayalimentos.com.br/images/produtos/harumaki/frango/principal_harumaki_frango_requeij%C3%A3o_570x440.png',
      categoryId: 2,
    },
    {
      name: "Sashimi",
      description: "Super Amazing Salmon Sahimi",
      calories: 5900,
      image: 'https://receitinhas.com.br/wp-content/uploads/2018/12/iStock-623858612-1200x800.jpg',
      categoryId: 2,
    },
    {
      name: "Temaki",
      description: "A Very tasty Temaki with Cream Cheese",
      calories: 4000,
      image: 'https://receitinhas.com.br/wp-content/uploads/2022/06/a72a01a7fd764bc09812c16b2928cc67-scaled.jpg',
      categoryId: 2,
    },
  ];

  await prisma.user.create({ data: user });

  for (let category of categories) {
    await prisma.mealCategory.create({ data: category });
  }
  for (let meal of meals) {
    await prisma.meal.create({ data: meal });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
