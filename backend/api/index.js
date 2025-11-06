const strapi = require('@strapi/strapi');

let instance;

async function createStrapi() {
  if (!instance) {
    instance = strapi({ distDir: './dist' });
    await instance.load();
  }
  return instance;
}

module.exports = async (req, res) => {
  const strapiInstance = await createStrapi();
  return strapiInstance.server.app(req, res);
};