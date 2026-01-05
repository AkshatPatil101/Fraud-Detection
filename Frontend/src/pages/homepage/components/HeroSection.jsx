import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const fraudMetrics = [
  { value: '99.7%', label: 'Detection Accuracy', icon: 'Target' },
  { value: '< 0.1%', label: 'False Positives', icon: 'CheckCircle' },
  { value: '24/7', label: 'Real-Time Monitoring', icon: 'Clock' },
  { value: '500M+', label: 'Transactions Analyzed', icon: 'TrendingUp' }];


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#1a237e] to-[#0d1b2a] px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-[#ffd700] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-[#283593] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#283593] bg-opacity-30 border border-[#ffd700] border-opacity-30 mb-6 md:mb-8">
              <Icon name="Shield" size={16} color="#ffd700" />
              <span className="text-xs md:text-sm text-[#ffd700] font-medium">AI-Powered Fraud Detection</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Intelligent Protection That{' '}
              <span className="text-[#ffd700]">Learns Faster</span> Than Fraud Evolves
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              Your AI-powered fraud prevention partner. Zero compromise between security and user experience. Transform complex fraud detection into intuitive, real-time intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 md:mb-12">
              <Link to="/command-dashboard">
                <Button variant="default" size="lg" iconName="Rocket" iconPosition="right" className="w-full sm:w-auto bg-[#ffd700] text-[#1a237e] hover:bg-[#ffed4e] font-semibold">
                  Start Free Demo
                </Button>
              </Link>
              <Link to="/detection-analytics">
                <Button variant="outline" size="lg" iconName="PlayCircle" iconPosition="left" className="w-full sm:w-auto border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a237e]">
                  Watch Platform Tour
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {fraudMetrics?.map((metric, index) =>
              <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <Icon name={metric?.icon} size={20} color="#ffd700" />
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#ffd700]">{metric?.value}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400">{metric?.label}</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#ffd700] border-opacity-20">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1d5e4a6aa-1764658027683.png"
                alt="Modern financial dashboard displaying real-time fraud detection analytics with colorful graphs, transaction monitoring charts, and security metrics on multiple screens in dark professional interface"
                className="w-full h-64 md:h-80 lg:h-96 object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#0f1419] bg-opacity-90 backdrop-blur-sm rounded-lg p-4 border border-[#ffd700] border-opacity-30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-400">Live Threat Detection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00e676] rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#00e676]">Active</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="AlertTriangle" size={24} color="#ff9800" />
                  <div className="flex-1">
                    <p className="text-sm md:text-base text-white font-medium">Suspicious Pattern Detected</p>
                    <p className="text-xs text-gray-400">Transaction #TXN-2025-8847 flagged for review</p>
                  </div>
                  <Button variant="ghost" size="sm" iconName="ArrowRight" className="text-[#ffd700]">
                    Review
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-[#ffd700] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 md:w-40 md:h-40 bg-[#283593] rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;