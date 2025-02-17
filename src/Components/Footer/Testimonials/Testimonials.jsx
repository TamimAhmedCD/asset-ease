const Testimonials = () => {
  const data = [
    {
      id: 1,
      name: "Jane Doe",
      company: "CEO, XYZ Corp",
      review:
        "AssetEase has transformed how we manage assets.",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      company: "Operations Manager",
      review:
        "A game-changer for asset tracking. It's easy to use and super effective.",
      image:
        "https://png.pngtree.com/png-clipart/20231003/original/pngtree-young-indian-man-png-image_13229316.png",
    },
    {
      id: 3,
      name: "Emily Brown",
      company: "Finance Director",
      review: "The best asset management tool we've used so far. 10/10!",
      image:
        "https://femalefoundersfund.com/wp-content/uploads/2020/05/Headshots-132-2.jpg",
    },
  ];
  return (
    <section className="w-11/12 md:w-10/12 mx-auto text-center py-28">
      <div>
        <h2 className="text-4xl font-bold mb-8 text-[#1753c2]">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((reviews) => (
            <div
              className="border border-gray-300 p-6 rounded-2xl shadow-lg"
              key={reviews.id}
            >
              <p className="text-lg italic">&quot;{reviews.review}&quot;</p>
              <div className="mt-4 flex items-center justify-center">
                <img
                  src={reviews.image}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                  alt={reviews.name}
                />
                <div>
                  <h4 className="font-semibold">{reviews.name}</h4>
                  <p className="text-sm text-gray-500">{reviews.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
