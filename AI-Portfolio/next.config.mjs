import fs from 'node:fs';

// Patch for Windows WSL Plan 9 mapped drive (U:) where readlink on regular files returns EISDIR instead of EINVAL
const patchError = (err, path) => {
  if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
    const e = new Error(`EINVAL: invalid argument, readlink '${path}'`);
    e.code = 'EINVAL';
    e.errno = -4071;
    e.syscall = 'readlink';
    e.path = path;
    return e;
  }
  return err;
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    throw patchError(err, path);
  }
};

const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  origReadlink.call(fs, path, options, (err, linkString) => {
    if (err) return callback(patchError(err, path));
    callback(null, linkString);
  });
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      throw patchError(err, path);
    }
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false;
    if (dev) {
      config.watchOptions = {
        poll: 2500,
        aggregateTimeout: 500,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
