// see https://www.npmjs.com/package/react-app-rewired
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const notHtmlOrCssPlugin = (plugin) =>
  !(
    plugin.options?.filename === "index.html" ||
    plugin.options?.filename === "static/css/[name].[contenthash:8].css"
  );
const overrideLoaders = (rules) =>
  rules.map((rule) => ({
    ...rule,
    use: rule.use && [
      require.resolve("style-loader"),
      ...rule.use.filter(
        (use) => !use.loader.includes("mini-css-extract-plugin")
      ),
    ],
  }));
module.exports = {
  webpack: (config, env) =>
    env === "production"
      ? {
          ...config,
          // microApp entry point
          entry: "./src/render.tsx",
          plugins: [
            ...config.plugins.filter(notHtmlOrCssPlugin),
            new EsmWebpackPlugin(),
          ],
          optimization: {
            minimize: true,
            minimizer: config.optimization.minimizer,
          },
          // microApp as library
          output: { ...config.output, library: "todo" },
          module: {
            ...config.module,
            rules: [
              config.module.rules[0],
              { oneOf: overrideLoaders(config.module.rules[1].oneOf) },
            ],
          },
        }
      : config,
};
