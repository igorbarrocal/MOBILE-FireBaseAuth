const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Resolver problemas com Firebase e outras dependências
config.resolver.assetExts.push('cjs');

module.exports = config;