import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationSection = ({ formData, handleInputChange, errors }) => {
  return (
    <section id="section-location" className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevation-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10">
          <Icon name="MapPin" size={20} color="var(--color-secondary)" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Location Details</h2>
          <p className="text-sm text-muted-foreground mt-1">Billing and shipping address information</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Home" size={18} color="var(--color-muted-foreground)" />
            Billing Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Billing Country"
              type="text"
              name="billing_country"
              placeholder="United States"
              value={formData?.billing_country}
              onChange={handleInputChange}
              error={errors?.billing_country}
              required
              description="Country of billing address"
            />

            <Input
              label="Billing City"
              type="text"
              name="billing_city"
              placeholder="New York"
              value={formData?.billing_city}
              onChange={handleInputChange}
              error={errors?.billing_city}
              required
              description="City of billing address"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Package" size={18} color="var(--color-muted-foreground)" />
            Shipping Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Shipping Country"
              type="text"
              name="shipping_country"
              placeholder="United States"
              value={formData?.shipping_country}
              onChange={handleInputChange}
              error={errors?.shipping_country}
              required
              description="Country of shipping address"
            />

            <Input
              label="Shipping City"
              type="text"
              name="shipping_city"
              placeholder="Los Angeles"
              value={formData?.shipping_city}
              onChange={handleInputChange}
              error={errors?.shipping_city}
              required
              description="City of shipping address"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Navigation" size={18} color="var(--color-muted-foreground)" />
            Geographic Coordinates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Latitude"
              type="number"
              name="latitude"
              placeholder="40.7128"
              value={formData?.latitude}
              onChange={handleInputChange}
              error={errors?.latitude}
              step="0.000001"
              description="Decimal degrees (-90 to 90)"
            />

            <Input
              label="Longitude"
              type="number"
              name="longitude"
              placeholder="-74.0060"
              value={formData?.longitude}
              onChange={handleInputChange}
              error={errors?.longitude}
              step="0.000001"
              description="Decimal degrees (-180 to 180)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;