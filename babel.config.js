module.exports = {
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        'absoluteRuntime': false,
        'corejs': false,
        'helpers': true,
        'regenerator': true,
        'version': '7.0.0-beta.0'
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    "@babel/preset-react"
  ],
  "env": {
    "production": {
      "only": ["src"],
      "plugins": [
        [
          "transform-react-remove-prop-types",
          {
            removeImport: true
          }
        ],
        "@babel/plugin-transform-react-inline-elements",
        "@babel/plugin-transform-react-constant-elements"
      ]
    }
  }
};



// @babel/plugin-transform-runtime: Reduces code duplication by extracting Babel helpers into shared modules.

// @babel/plugin-syntax-dynamic-import: Enables dynamic import() syntax in browsers lacking native Promise support.

// @babel/plugin-proposal-class-properties: Enables support for the public instance field syntax proposal, for writing class-based React components.

// babel-plugin-transform-react-remove-prop-types removes unnecessary prop-types from production code.

// @babel/plugin-transform-react-inline-elements evaluates React.createElement during compilation and inlines the result.

// @babel/plugin-transform-react-constant-elements extracts static React elements as constants.



//  npm install -D @babel/preset-env @babel/preset-react @babel/runtime @babel/plugin-transform-runtime @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-class-properties babel-plugin-transform-react-remove-prop-types @babel/plugin-transform-react-inline-elements @babel/plugin-transform-react-constant-elements