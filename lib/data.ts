
export const CATEGORIES = [
    { id: 'men', name: 'Men', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80' },
    { id: 'women', name: 'Women', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80' },
    { id: 'kids', name: 'Kids', image: 'https://images.unsplash.com/photo-1514989940723-e8875ea28f52?w=800&q=80' },
    { id: 'sports', name: 'Sports', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80' },
    { id: 'casual', name: 'Casual', image: 'https://images.unsplash.com/photo-1525966543048-b8ac86af3267?w=800&q=80' },
    { id: 'formal', name: 'Formal', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80' },
];

export const PRODUCTS = Array.from({ length: 50 }).map((_, i) => {
    const names = [
        'Air Stride One', 'Urban Trekker', 'Cloud Walker', 'Summit Peak', 'Metro Glide',
        'Velocity X', 'Terra Firma', 'Zenith Runner', 'Apex Drift', 'Nova Blast',
        'Horizon Dash', 'Quantum Leap', 'Stellar Pace', 'Gravity Defy', 'Aero Flux'
    ];
    const categories = ['men', 'women', 'kids', 'sports', 'casual', 'formal'];

    return {
        id: `prod-${i + 1}`,
        name: names[i % names.length] + (Math.floor(i / names.length) > 0 ? ` V${Math.floor(i / names.length) + 1}` : ''),
        price: 120 + (i * 17) % 330,
        category: categories[i % categories.length],
        description: "Engineered for ultimate comfort and performance, these shoes feature our signature responsive cushioning and breathable mesh upper. Perfect for daily wear or intense training sessions.",
        images: [
            `https://images.unsplash.com/photo-${[
                '1542291026-7eec264c27ff', '1606107557195-0e29a4b5b4aa', '1560769625-ed597487d9dd',
                '1595950653106-6c9ebd614d3a', '1608231387042-66d1773070a5', '1525966543048-b8ac86af3267',
                '1491553895911-0055eca6402d', '1543508282-6319a3e2621f', '1603808033192-082d6919d3e1',
                '1460353581641-37baddab0fa2'
            ][i % 10]}?w=800&q=80`,
            `https://images.unsplash.com/photo-${[
                '1542291026-7eec264c27ff', '1606107557195-0e29a4b5b4aa'
            ][(i + 1) % 2]}?w=800&q=80&auto=format&fit=crop`
        ],
        sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12],
        colors: ['Black', 'White', 'Navy', 'Red'],
        badges: i % 7 === 0 ? ['New'] : i % 5 === 0 ? ['Best Seller'] : i % 10 === 0 ? ['Sale'] : [],
        reviews: {
            rating: 4.0 + (i % 10) / 10,
            count: 10 + (i * 23) % 200
        },
        details: {
            material: "Premium synthetic mesh",
            sole: "Rubber with EVA foam mid-sole",
            fit: "True to size",
            care: "Wipe clean with damp cloth"
        }
    };
});
