// API configuration
export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

// Database configuration
// Uses MongoDB for flexible schema to accommodate diverse skill types
export const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';
export const DATABASE_NAME = 'women_skill_income';

// Authentication settings
// JWT tokens expire after 24 hours to balance security with user convenience
export const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production';
export const JWT_EXPIRES_IN = '24h';

// Pi Network cryptocurrency configuration
// Pi Network chosen for low transaction fees suitable for microjobs
export const PI_COIN_ADDRESS_LENGTH = 34;
export const PI_COIN_PRIVATE_KEY_LENGTH = 64;
export const PI_NETWORK_API_KEY = process.env.PI_NETWORK_API_KEY;

// AI model paths for skill matching and recommendations
export const SKILL_MATCHING_MODEL_PATH = './models/skill_matching_model.json';
export const TASK_RECOMMENDATION_MODEL_PATH = './models/task_recommendation_model.json';

// Pagination defaults
// Kept small for low-bandwidth scenarios common in rural areas
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// Escrow and payment settings
// Minimum task value to prevent transaction fees from exceeding task payment
export const MINIMUM_TASK_VALUE = 1.0; // in Pi coins
export const ESCROW_RELEASE_DELAY = 24; // hours before auto-release on no dispute
export const DISPUTE_RESOLUTION_WINDOW = 72; // hours to file a dispute
