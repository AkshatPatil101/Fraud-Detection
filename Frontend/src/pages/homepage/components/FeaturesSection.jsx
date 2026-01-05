import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Detection',
      description: 'Machine learning algorithms that adapt and evolve with emerging fraud patterns, providing predictive threat intelligence.',
      link: '/detection-analytics',
      color: '#ffd700'
    },
    {
      icon: 'Gauge',
      title: 'Real-Time Monitoring',
      description: 'Continuous transaction analysis with instant alert generation and automated risk scoring for immediate threat response.',
      link: '/command-dashboard',
      color: '#00e676'
    },
    {
      icon: 'Shield',
      title: 'Risk Scoring Engine',
      description: 'Sophisticated multi-factor risk assessment combining behavioral analytics, transaction patterns, and historical data.',
      link: '/risk-scoring-engine',
      color: '#2196f3'
    },
    {
      icon: 'Bell',
      title: 'Smart Alert System',
      description: 'Intelligent alert prioritization with customizable thresholds and investigation workflows for efficient fraud management.',
      link: '/alert-management-center',
      color: '#ff9800'
    },
    {
      icon: 'FileText',
      title: 'Compliance Reporting',
      description: 'Automated regulatory reporting with comprehensive audit trails and certification-ready documentation.',
      link: '/compliance-reporting',
      color: '#9c27b0'
    },
    {
      icon: 'Zap',
      title: 'Seamless Integration',
      description: 'RESTful APIs and SDKs for effortless integration with existing financial systems and payment platforms.',
      link: '/command-dashboard',
      color: '#ff6f00'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#283593] bg-opacity-30 border border-[#ffd700] border-opacity-30 mb-4 md:mb-6">
            <Icon name="Sparkles" size={16} color="#ffd700" />
            <span className="text-xs md:text-sm text-[#ffd700] font-medium">Platform Capabilities</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Comprehensive Fraud Prevention <span className="text-[#ffd700]">Ecosystem</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Transform complex fraud detection into intuitive intelligence with our enterprise-grade security platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-[#1e2328] rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-[#ffd700] hover:border-opacity-50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#ffd700]/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ffd700] to-transparent opacity-0 group-hover:opacity-10 rounded-2xl blur-2xl transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature?.color}20` }}
                >
                  <Icon name={feature?.icon} size={24} color={feature?.color} />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{feature?.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">{feature?.description}</p>

                <Link to={feature?.link}>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="text-[#ffd700] hover:text-[#ffed4e] p-0"
                  >
                    Explore Feature
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;