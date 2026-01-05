import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DeviceSection = ({ formData, handleInputChange, errors }) => {
  const deviceTypeOptions = [
    { value: 'mobile', label: 'Mobile Phone' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'desktop', label: 'Desktop Computer' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'other', label: 'Other Device' }
  ];

  const deviceOsOptions = [
    { value: 'windows', label: 'Windows' },
    { value: 'macos', label: 'macOS' },
    { value: 'linux', label: 'Linux' },
    { value: 'ios', label: 'iOS' },
    { value: 'android', label: 'Android' },
    { value: 'other', label: 'Other OS' }
  ];

  const browserOptions = [
    { value: 'chrome', label: 'Google Chrome' },
    { value: 'firefox', label: 'Mozilla Firefox' },
    { value: 'safari', label: 'Safari' },
    { value: 'edge', label: 'Microsoft Edge' },
    { value: 'opera', label: 'Opera' },
    { value: 'other', label: 'Other Browser' }
  ];

  return (
    <section id="section-device" className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevation-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/10">
          <Icon name="Smartphone" size={20} color="var(--color-accent)" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Device Details</h2>
          <p className="text-sm text-muted-foreground mt-1">Device and network information</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="IP Address"
            type="text"
            name="ip_address"
            placeholder="192.168.1.100"
            value={formData?.ip_address}
            onChange={handleInputChange}
            error={errors?.ip_address}
            required
            description="IPv4 or IPv6 address"
          />

          <Input
            label="Device ID"
            type="text"
            name="device_id"
            placeholder="DEV-ABC123XYZ"
            value={formData?.device_id}
            onChange={handleInputChange}
            error={errors?.device_id}
            required
            description="Unique device identifier"
          />
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="MapPin" size={18} color="var(--color-muted-foreground)" />
            Device Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Device Latitude"
              type="number"
              name="device_location_lat"
              placeholder="34.0522"
              value={formData?.device_location_lat}
              onChange={handleInputChange}
              error={errors?.device_location_lat}
              step="0.000001"
              description="Device GPS latitude"
            />

            <Input
              label="Device Longitude"
              type="number"
              name="device_location_lon"
              placeholder="-118.2437"
              value={formData?.device_location_lon}
              onChange={handleInputChange}
              error={errors?.device_location_lon}
              step="0.000001"
              description="Device GPS longitude"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Monitor" size={18} color="var(--color-muted-foreground)" />
            Device Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
              label="Device Type"
              name="device_type"
              options={deviceTypeOptions}
              value={formData?.device_type}
              onChange={(value) => handleInputChange({ target: { name: 'device_type', value } })}
              error={errors?.device_type}
              required
              description="Type of device used"
            />

            <Select
              label="Operating System"
              name="device_os"
              options={deviceOsOptions}
              value={formData?.device_os}
              onChange={(value) => handleInputChange({ target: { name: 'device_os', value } })}
              error={errors?.device_os}
              required
              description="Device operating system"
            />

            <Select
              label="Browser"
              name="browser"
              options={browserOptions}
              value={formData?.browser}
              onChange={(value) => handleInputChange({ target: { name: 'browser', value } })}
              error={errors?.browser}
              required
              description="Web browser used"
            />

            <Input
              label="User Agent"
              type="text"
              name="user_agent"
              placeholder="Mozilla/5.0..."
              value={formData?.user_agent}
              onChange={handleInputChange}
              error={errors?.user_agent}
              description="Browser user agent string"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceSection;