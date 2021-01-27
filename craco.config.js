const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@card-radius': '20px',
              '@primary-color': '#5549DC',
              '@border-radius-base': '20px',
              '@modal-body-padding': '50px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};