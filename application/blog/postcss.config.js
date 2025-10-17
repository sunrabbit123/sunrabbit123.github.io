import stylexPlugin from '@stylexjs/postcss-plugin';

export default {
  plugins: [
    stylexPlugin({
      // StyleX configuration
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: import.meta.dirname,
      },
    }),
  ],
};
