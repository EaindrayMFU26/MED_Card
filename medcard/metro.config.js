const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Prevent Metro from choosing ESM export entries that contain import.meta
config.resolver.unstable_enablePackageExports = false;

// Prefer CommonJS/main entries
config.resolver.resolverMainFields = ["react-native", "main", "browser"];

module.exports = config;
