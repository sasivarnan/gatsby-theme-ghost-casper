module.exports = () => ({
  plugins: [
    require('postcss-easy-import'),
    require('postcss-custom-properties')({
      // postcss-custom-properties & postcss-color-function are not happy with each other 
      // https://github.com/postcss/postcss-custom-properties/issues/99
      preserve: "computed"
    }),
    require('postcss-color-function')(),
    require('autoprefixer')({ browsers: ['last 5 versions'] }),
    require('cssnano')()
  ]
});