import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Start seeding...')
  
  // 1. Create / Update Categories
  const categoryGaming = await prisma.category.upsert({
    where: { slug: 'gaming' },
    update: {},
    create: {
      name: 'Gaming Accessories',
      slug: 'gaming',
      description: 'Pro gaming mice, mechanical keyboards, headsets, and chairs.',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80',
    },
  })

  const categoryGadgets = await prisma.category.upsert({
    where: { slug: 'gadgets' },
    update: {},
    create: {
      name: 'Electronics & Gadgets',
      slug: 'gadgets',
      description: 'Cutting-edge consumer tech, audio equipment, and wireless gadgets.',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    },
  })

  const categoryWorkspace = await prisma.category.upsert({
    where: { slug: 'workspace' },
    update: {},
    create: {
      name: 'Workspace & Setup',
      slug: 'workspace',
      description: 'Ergonomic monitors, motorized standing desks, lighting, and storage.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80',
    },
  })

  const categoryLifestyle = await prisma.category.upsert({
    where: { slug: 'lifestyle' },
    update: {},
    create: {
      name: 'Lifestyle & Gifts',
      slug: 'lifestyle',
      description: 'Aromatherapy, desk soft toys, stationery notebooks, and gift boxes.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
    },
  })

  const categoryWearables = await prisma.category.upsert({
    where: { slug: 'wearables' },
    update: {},
    create: {
      name: 'Wearables & Smartwatches',
      slug: 'wearables',
      description: 'Advanced AMOLED GPS smartwatches and smart fitness bands.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    },
  })

  // 2. Comprehensive Products
  const products = [
    // GAMING
    {
      name: 'Pro Wireless Gaming Mouse',
      slug: 'pro-wireless-gaming-mouse',
      description: 'Ultra-lightweight wireless esports gaming mouse with 25K DPI Hero optical sensor and zero-lag wireless connectivity.',
      price: 129.99,
      comparePrice: 149.99,
      stock: 35,
      images: ['https://images.unsplash.com/photo-1527219525722-f9767a7af8c8?w=500&q=80'],
      categoryId: categoryGaming.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Mechanical RGB Gaming Keyboard',
      slug: 'mechanical-gaming-keyboard',
      description: 'Hot-swappable mechanical gaming keyboard with custom tactile switches, sound-dampening foam, and per-key RGB backlighting.',
      price: 99.99,
      comparePrice: 119.99,
      stock: 28,
      images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'],
      categoryId: categoryGaming.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Pro 7.1 Surround Gaming Headset',
      slug: 'pro-gaming-headset',
      description: 'Immersive 7.1 surround sound gaming headset with detachable broadcast-grade microphone and memory foam ear cushions.',
      price: 79.99,
      comparePrice: 94.99,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80'],
      categoryId: categoryGaming.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Ergonomic Esports Gaming Chair',
      slug: 'esports-gaming-chair',
      description: 'High-density cold-cure foam ergonomic gaming chair with 4D armrests, full 165-degree recline, and lumbar support pillow.',
      price: 249.99,
      comparePrice: 289.99,
      stock: 12,
      images: ['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80'],
      categoryId: categoryGaming.id,
      inStock: true,
      featured: true,
    },

    // GADGETS
    {
      name: 'Noise Cancelling Wireless Headphones',
      slug: 'noise-cancelling-headphones',
      description: 'Flagship active noise cancelling over-ear headphones with 40-hour battery life, high-res audio drivers, and spatial audio.',
      price: 299.99,
      comparePrice: 349.99,
      stock: 22,
      images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80'],
      categoryId: categoryGadgets.id,
      inStock: true,
      featured: true,
    },
    {
      name: '4K Ultra HD Action Camera',
      slug: '4k-action-camera',
      description: 'Rugged waterproof action camera with dual colour touchscreens, 4K/60fps recording, and HyperSmooth gyro stabilization.',
      price: 199.99,
      comparePrice: 229.99,
      stock: 18,
      images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80'],
      categoryId: categoryGadgets.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'MagSafe Fast Wireless Power Bank 10000mAh',
      slug: 'magsafe-power-bank',
      description: 'Magnetic wireless portable charger with 20W PD fast charging, foldable kickstand, and premium aluminum finish.',
      price: 49.99,
      comparePrice: 59.99,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500&q=80'],
      categoryId: categoryGadgets.id,
      inStock: true,
      featured: false,
    },

    // WORKSPACE
    {
      name: '27-inch 4K UHD IPS Designer Monitor',
      slug: '4k-uhd-workspace-monitor',
      description: 'Frameless 4K IPS monitor with 99% sRGB color accuracy, USB-C 90W power delivery, and fully ergonomic tilt/pivot stand.',
      price: 349.99,
      comparePrice: 399.99,
      stock: 15,
      images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80'],
      categoryId: categoryWorkspace.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Electric Dual-Motor Standing Desk',
      slug: 'electric-standing-desk',
      description: 'Heavy-duty motorized standing desk with solid walnut tabletop, 4 memory height presets, and anti-collision sensor.',
      price: 399.99,
      comparePrice: 449.99,
      stock: 10,
      images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&q=80'],
      categoryId: categoryWorkspace.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Wooden Dual Monitor Stand & Storage Shelf',
      slug: 'monitor-stand-storage-shelf',
      description: 'Solid hardwood desk shelf with integrated aluminium organizer trays, cable management channels, and cork pads.',
      price: 59.99,
      comparePrice: 69.99,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80'],
      categoryId: categoryWorkspace.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Smart LED Screenbar Desk Monitor Light',
      slug: 'smart-screenbar-desk-lamp',
      description: 'Asymmetric optical monitor lamp with wireless dial controller, auto-dimming brightness sensor, and zero screen glare.',
      price: 45.99,
      comparePrice: 55.99,
      stock: 45,
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80'],
      categoryId: categoryWorkspace.id,
      inStock: true,
      featured: false,
    },

    // LIFESTYLE & GIFTS
    {
      name: 'Artisan Scented Candle & Aroma Diffuser Set',
      slug: 'scented-candle-aroma-perfume-set',
      description: 'Natural soy wax calming aromatherapy candle paired with French essential oil reed diffuser for peaceful home and workspace vibes.',
      price: 29.99,
      comparePrice: 34.99,
      stock: 60,
      images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80'],
      categoryId: categoryLifestyle.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Genuine Leather Minimalist Journal Stationery',
      slug: 'leather-daily-planner-stationery',
      description: 'Handcrafted full-grain leather refillable notebook with fountain-pen friendly 120gsm unlined ivory paper and brass pen loop.',
      price: 24.99,
      comparePrice: 29.99,
      stock: 55,
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80'],
      categoryId: categoryLifestyle.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Kawaii Desk Soft Toy Plushie Mascot',
      slug: 'kawaii-plush-desk-soft-toy',
      description: 'Ultra-soft premium cotton desk plush companion designed to bring joy and stress relief to your modern setup.',
      price: 18.99,
      comparePrice: 22.99,
      stock: 75,
      images: ['https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&q=80'],
      categoryId: categoryLifestyle.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Executive Tech Organiser Luxury Gift Box',
      slug: 'executive-tech-gift-box',
      description: 'Curated gift set featuring a leather tech pouch, braided 100W USB-C cable, anodised aluminium phone stand, and cleaning kit.',
      price: 69.99,
      comparePrice: 84.99,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80'],
      categoryId: categoryLifestyle.id,
      inStock: true,
      featured: true,
    },

    // WEARABLES
    {
      name: 'Apex Ultra GPS AMOLED Smartwatch',
      slug: 'apex-ultra-smartwatch-gps',
      description: 'Titanium case smartwatch with sapphire glass, 1.96-inch AMOLED display, dual-band GPS, 100m water resistance, and 14-day battery.',
      price: 149.99,
      comparePrice: 179.99,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'],
      categoryId: categoryWearables.id,
      inStock: true,
      featured: true,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        images: p.images,
        categoryId: p.categoryId,
        inStock: p.inStock,
        featured: p.featured,
      },
      create: p,
    })
  }

  console.log(`Seeding finished. Added ${products.length} products across 5 categories.`)
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
