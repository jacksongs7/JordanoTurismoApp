module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // === ALIAS PRINCIPAL: Mapeia '@' para a RAIZ do projeto. ===
            // Isso permite que '@/assets', '@/components', etc. funcionem para pastas na raiz.
            '@': './app/src',

            // Alias para a pasta 'app' (para rotas e coisas dentro de 'app')
            '@/app': './app',

            // Aliases para suas pastas customizadas dentro de 'app/_lib'
            // Acessados como '@/app/_lib/components', etc.
            '@/app/_lib/components': './app/_lib/components',
            '@/app/_lib/data': './app/_lib/data',
            '@/app/_lib/services': './app/_lib/services',
            '@/app/_lib/types': './app/_lib/types',
          },
          root: ['.'], // A raiz do projeto
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
      'expo-router/babel',
    ],
  };
};