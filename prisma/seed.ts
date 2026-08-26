import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Start seeding...')
  
  // Create Categories
  const categoryGaming = await prisma.category.upsert({
    where: { slug: 'gaming' },
    update: {},
    create: {
      name: 'Gaming Accessories',
      slug: 'gaming',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80',
    },
  })

  const categoryGadgets = await prisma.category.upsert({
    where: { slug: 'gadgets' },
    update: {},
    create: {
      name: 'Electronics & Gadgets',
      slug: 'gadgets',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    },
  })

  // Create Products
  const products = [
    {
      name: 'Pro Wireless Gaming Mouse',
      slug: 'pro-wireless-gaming-mouse',
      description: 'Ultra-lightweight wireless gaming mouse with 25K sensor.',
      price: 129.99,
      comparePrice: 149.99,
      images: ['https://images.unsplash.com/photo-1527219525722-f9767a7af8c8?w=500&q=80'],
      categoryId: categoryGaming.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Mechanical Gaming Keyboard',
      slug: 'mechanical-gaming-keyboard',
      description: 'RGB Mechanical Gaming Keyboard with tactile switches.',
      price: 99.99,
      images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'],
      categoryId: categoryGaming.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Noise Cancelling Headphones',
      slug: 'noise-cancelling-headphones',
      description: 'Over-ear wireless headphones with active noise cancellation.',
      price: 299.99,
      comparePrice: 349.99,
      images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80'],
      categoryId: categoryGadgets.id,
      inStock: true,
      featured: true,
    },
    {
      name: '4K Action Camera',
      slug: '4k-action-camera',
      description: 'Waterproof action camera with 4K video recording.',
      price: 199.99,
      images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80'],
      categoryId: categoryGadgets.id,
      inStock: true,
      featured: false,
    }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
