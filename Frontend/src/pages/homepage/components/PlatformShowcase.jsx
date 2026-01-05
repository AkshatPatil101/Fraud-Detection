import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlatformShowcase = () => {
  const showcaseItems = [
  {
    title: 'Command Dashboard',
    description: 'Real-time fraud monitoring with customizable risk visualization and instant alert management. Monitor threats across all channels from a unified control center.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3895ecc-1764656426788.png",
    imageAlt: 'Modern business analytics dashboard showing multiple colorful charts, graphs, and real-time data visualizations on large monitor in professional office setting',
    icon: 'LayoutDashboard',
    link: '/command-dashboard',
    features: ['Live Threat Feed', 'Custom Widgets', 'Multi-Channel View', 'Alert Streams']
  },
  {
    title: 'Detection Analytics',
    description: 'Deep pattern analysis with ML model performance metrics and fraud trend identification. Leverage AI to stay ahead of evolving fraud tactics.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_162e1bb75-1764659449969.png",
    imageAlt: 'Financial data analytics screen displaying complex line graphs, bar charts, and statistical metrics with blue and purple color scheme on dark background',
    icon: 'TrendingUp',
    link: '/detection-analytics',
    features: ['ML Algorithms', 'Pattern Recognition', 'Predictive Models', 'Trend Analysis']
  },
  {
    title: 'Risk Scoring Engine',
    description: 'Transaction and user risk assessment with configurable scoring parameters. Multi-factor analysis combining behavioral analytics and historical data.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c387e3bf-1764682773041.png",
    imageAlt: 'Digital security interface showing risk assessment gauges, threat level indicators, and security scoring metrics with red and green status lights',
    icon: 'Shield',
    link: '/risk-scoring-engine',
    features: ['Dynamic Scoring', 'Behavioral Analysis', 'Risk Thresholds', 'Custom Rules']
  }];


  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#283593] bg-opacity-30 border border-[#ffd700] border-opacity-30 mb-4 md:mb-6">
            <Icon name="Layers" size={16} color="#ffd700" />
            <span className="text-xs md:text-sm text-[#ffd700] font-medium">Platform Overview</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Explore the <span className="text-[#ffd700]">FraudGuard</span> Platform
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how our integrated modules work together to provide comprehensive fraud protection
          </p>
        </div>

        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {showcaseItems?.map((item, index) =>
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${
            index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`
            }>

              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#ffd700] bg-opacity-10 flex items-center justify-center">
                    <Icon name={item?.icon} size={24} color="#ffd700" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{item?.title}</h3>
                </div>

                <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed">
                  {item?.description}
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                  {item?.features?.map((feature, idx) =>
                <div key={idx} className="flex items-center gap-2">
                      <Icon name="CheckCircle" size={16} color="#00e676" />
                      <span className="text-xs md:text-sm text-gray-300">{feature}</span>
                    </div>
                )}
                </div>

                <Link to={item?.link}>
                  <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-[#ffd700] text-[#1a237e] hover:bg-[#ffed4e] font-semibold">

                    Explore {item?.title}
                  </Button>
                </Link>
              </div>

              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#ffd700] border-opacity-20 group">
                  <Image
                  src={item?.image}
                  alt={item?.imageAlt}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e] via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-4 right-4 bg-[#00e676] text-[#0f1419] px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0f1419] rounded-full animate-pulse"></div>
                    Live Demo Available
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default PlatformShowcase;