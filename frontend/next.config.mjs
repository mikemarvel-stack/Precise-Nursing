
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // The `eslint` block is intentionally left out.
  // Next.js will automatically detect and use your `eslint.config.mjs` file.
};

export default nextConfig;
