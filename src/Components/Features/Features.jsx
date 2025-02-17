const Features = () => {
    const features = [
      {
        id: 1,
        title: "Real-Time Asset Tracking",
        description: "Monitor your assets with live updates and accurate tracking.",
        icon: "🚀",
      },
      {
        id: 2,
        title: "Automated Reports",
        description: "Generate insightful reports with just a click.",
        icon: "📊",
      },
      {
        id: 3,
        title: "Secure Cloud Storage",
        description: "Store and access asset data securely from anywhere.",
        icon: "☁️",
      },
      {
        id: 4,
        title: "User-Friendly Dashboard",
        description: "A simple, intuitive interface for easy management.",
        icon: "🖥️",
      },
      {
        id: 5,
        title: "Multi-User Access",
        description: "Collaborate with your team with role-based permissions.",
        icon: "👥",
      },
      {
        id: 6,
        title: "Custom Alerts & Notifications",
        description: "Stay updated with automated alerts and notifications.",
        icon: "🔔",
      },
    ];
  
    return (
      <section className="py-20">
        <div className="w-11/12 md:w-10/12 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#1753c2]">Key Features</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="border border-gray-300 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  