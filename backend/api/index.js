const strapi = require('@strapi/strapi')

let instance

async function createStrapi() {
  if (!instance) {
    instance = await strapi().start()
  }
  return instance
}

module.exports = async (req, res) => {
  const app = await createStrapi()
  app(req, res)
}