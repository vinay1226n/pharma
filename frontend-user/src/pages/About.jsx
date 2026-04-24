const About = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-6">
            About Cladian Pharma
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leading provider of trusted healthcare solutions with decades of
            experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/pharma_logo.png"
              alt="Cladian Pharma"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Cladian Pharma, we are committed to delivering high-quality
              pharmaceutical products and healthcare solutions. Our tagline
              "Trusted Healthcare Solutions" reflects our dedication to
              excellence, innovation, and customer satisfaction.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Quality First</h3>
                  <p className="text-gray-600">
                    Every product undergoes rigorous quality control.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Customer Centric</h3>
                  <p className="text-gray-600">
                    Your health is our priority. Always.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
