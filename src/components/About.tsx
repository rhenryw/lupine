import React from 'react';
import { Shield, Users, Award, Gamepad2 } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and purchases are protected with industry-leading security measures."
    },
    {
      icon: Users,
      title: "Gaming Community",
      description: "Join millions of gamers worldwide and connect with fellow enthusiasts."
    },
    {
      icon: Award,
      title: "Curated Collection",
      description: "Hand-picked games from indie developers to AAA studios."
    },
    {
      icon: Gamepad2,
      title: "Multi-Platform",
      description: "Play your games across PC, console, and mobile devices."
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-[#5E17EB]">LupineVault</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            LupineVault is your premier destination for discovering, purchasing, and playing the best games across all platforms. We're passionate about bringing gamers together through exceptional gaming experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-[#5E17EB]/50 transition-all duration-300">
                <div className="bg-[#5E17EB]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#5E17EB]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-[#5E17EB]/10 to-purple-900/10 rounded-2xl p-8 md:p-12 border border-[#5E17EB]/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              We believe gaming is more than entertainment—it's a way to connect, create, and explore new worlds. 
              Our mission is to provide a platform where gamers can discover their next favorite game, connect with 
              like-minded players, and support the creative developers who make these experiences possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#5E17EB] mb-2">5M+</div>
                <p className="text-gray-400">Active Players</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#5E17EB] mb-2">20K+</div>
                <p className="text-gray-400">Games Available</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#5E17EB] mb-2">Unlimited</div>
                <p className="text-gray-400">Movies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}