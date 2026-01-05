import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const benefits = [
    { icon: 'Zap', text: 'Deploy in 48 hours' },
    { icon: 'Shield', text: 'Enterprise-grade security' },
    { icon: 'Users', text: 'Dedicated support team' },
    { icon: 'TrendingUp', text: 'Proven ROI in 90 days' }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#1a237e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#ffd700] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-[#00e676] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Transform Your <span className="text-[#ffd700]">Fraud Prevention?</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-10">
            Join leading financial institutions protecting billions in transactions. Start your free demo today and experience intelligent fraud detection in action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
            <Link to="/command-dashboard">
              <Button
                variant="default"
                size="xl"
                iconName="Rocket"
                iconPosition="right"
                className="w-full sm:w-auto bg-[#ffd700] text-[#1a237e] hover:bg-[#ffed4e] font-bold text-base md:text-lg px-8 py-4"
              >
                Start Free Demo
              </Button>
            </Link>
            <Link to="/detection-analytics">
              <Button
                variant="outline"
                size="xl"
                iconName="Calendar"
                iconPosition="left"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#1a237e] font-semibold text-base md:text-lg px-8 py-4"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
            {benefits?.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ffd700] bg-opacity-20 flex items-center justify-center">
                  <Icon name={benefit?.icon} size={20} color="#ffd700" />
                </div>
                <span className="text-xs md:text-sm text-white font-medium text-center">{benefit?.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} color="#00e676" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} color="#00e676" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} color="#00e676" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1419] bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#ffd700] border-opacity-30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#ffd700] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <Icon name="Headphones" size={24} color="#ffd700" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1">Need Help Getting Started?</h3>
                <p className="text-xs md:text-sm text-gray-400">Our fraud prevention experts are here to guide you</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              className="border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a237e] whitespace-nowrap"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;