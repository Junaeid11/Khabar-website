import Image from 'next/image';

const WhyChooseUs = () => {
  const features = [
    {
      image: 'https://cdn-icons-png.flaticon.com/512/9725/9725731.png', 
      title: 'Fastest Delivery',
      description: 'Get your food delivered within 40 minutes or less. Now, that\'s what you call ASAP!',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/512/3075/3075733.png', 
      title: 'So Much to Choose From',
      description: 'Find your favourite among the thousands of restaurants in our app.',
    },
    {
      image: 'https://png.pngtree.com/png-vector/20230311/ourmid/pngtree-best-offer-logo-image-vector-png-image_6643834.png', 
      title: 'Best Offers In Town!',
      description: 'Get the best offers and combos at the best price only at KHABAR!',
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl  mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex bg-amber-400/15  flex-col items-center justify-center rounded-3xl p-4">
              <Image className='' src={feature.image} alt={feature.title} width={200} height={200} />
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
