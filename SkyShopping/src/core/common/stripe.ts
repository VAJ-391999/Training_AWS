import { Stripe } from "stripe";
import { config } from "../config/config";

export class StripePayment {
  stripeInstance: Stripe;

  constructor() {}

  createStripeInstance = () => {
    this.stripeInstance = new Stripe(config.stripe.secretKey, {
      apiVersion: "2022-08-01",
      maxNetworkRetries: 3,
      host: "api.stripe.com",
      protocol: "https",
      port: 443,
    });
  };

  createCharge = async (amount: number, tokenId: string): Promise<boolean> => {
    if (!this.stripeInstance) {
      this.createStripeInstance();
    }
    console.log("Stripe Charge", amount, tokenId, this.stripeInstance);
    const chargeCreated = await this.stripeInstance.charges.create({
      amount: 1,
      currency: "USD",
      description: "Sky Shopping",
      source: tokenId,
    });
    console.log(chargeCreated);
    if (chargeCreated) {
      return true;
    } else {
      return false;
    }
  };
}
