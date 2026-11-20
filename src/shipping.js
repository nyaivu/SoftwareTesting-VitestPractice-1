// Shipping cost calculator
//
// Designed for practicing Boundary Value Analysis and parameterized tests.
//
// Boundaries to explore:
//   weight      : invalid | -1 | 0 | 1 | 5 | 5.01 | 10 | 10.01 | 20 | 20.01 | 50 | 51
//   tier edges  : (0, 5] light | (5, 10] medium | (10, 20] heavy | (20, 50] extra-heavy
//   zone        : invalid | 0 | 1 | 2 | 3 | 4 | 1.5
//   orderTotal  : invalid | -1 | 0 | threshold-1 | threshold | threshold+1 | 100000 | 100001
//   express     : invalid | true | false

export const MAX_WEIGHT_KG = 50;
export const MAX_ORDER_TOTAL = 100000;
export const DEFAULT_FREE_SHIPPING_THRESHOLD = 100;

export const ZONE_MULTIPLIERS = {
  1: 1,
  2: 1.5,
  3: 2,
};

const BASE_DELIVERY_DAYS = {
  1: 3,
  2: 5,
  3: 7,
};

function assertValidWeight(weight) {
  if (typeof weight !== "number" || Number.isNaN(weight)) {
    throw new TypeError("Weight must be a valid number");
  }
  if (weight < 0 || weight > MAX_WEIGHT_KG) {
    throw new RangeError(`Weight must be between 0 and ${MAX_WEIGHT_KG}`);
  }
}

function assertValidZone(zone) {
  if (typeof zone !== "number" || Number.isNaN(zone)) {
    throw new TypeError("Zone must be a valid number");
  }
  if (zone < 1 || zone > 3) {
    throw new RangeError("Zone must be between 1 and 3");
  }
  if (!Number.isInteger(zone)) {
    throw new Error("Zone must be a whole number (1, 2 or 3)");
  }
}

function assertValidAmount(value, label) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new TypeError(`${label} must be a valid number`);
  }
  if (value < 0 || value > MAX_ORDER_TOTAL) {
    throw new RangeError(`${label} must be between 0 and ${MAX_ORDER_TOTAL}`);
  }
}

// Returns the tier name for a weight:
//   0 -> "empty", (0, 5] -> "light", (5, 10] -> "medium",
//   (10, 20] -> "heavy", (20, 50] -> "extra-heavy"
export function getWeightTier(weight) {
  assertValidWeight(weight);

  if (weight === 0) return "empty";
  if (weight <= 5) return "light";
  if (weight <= 10) return "medium";
  if (weight <= 20) return "heavy";
  return "extra-heavy";
}

// Base rate per tier (before the zone multiplier):
//   empty 0 | light 5 | medium 8 | heavy 12 | extra-heavy 20
export function getBaseRate(weight) {
  const tier = getWeightTier(weight);

  const rates = {
    empty: 0,
    light: 5,
    medium: 8,
    heavy: 12,
    "extra-heavy": 20,
  };

  return rates[tier];
}

// Total shipping cost = base rate for the weight tier * zone multiplier,
// rounded to 2 decimal places. Weight of 0 always costs 0.
export function calculateShippingCost(weight, zone) {
  assertValidWeight(weight);
  assertValidZone(zone);

  const total = getBaseRate(weight) * ZONE_MULTIPLIERS[zone];

  return Number(total.toFixed(2));
}

// Free shipping when the order total reaches the threshold (inclusive).
// The threshold itself defaults to 100 and can be overridden.
export function isFreeShipping(orderTotal, threshold = DEFAULT_FREE_SHIPPING_THRESHOLD) {
  assertValidAmount(orderTotal, "Order total");
  assertValidAmount(threshold, "Free shipping threshold");

  return orderTotal >= threshold;
}

// Estimated delivery in days for a zone, optionally as an express order.
// Express orders always take 1 day.
export function estimateDeliveryDays(zone, express = false) {
  assertValidZone(zone);

  if (typeof express !== "boolean") {
    throw new TypeError("Express must be a boolean");
  }

  return express ? 1 : BASE_DELIVERY_DAYS[zone];
}
