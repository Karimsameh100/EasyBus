module.exports = {
    // ... other configurations ...
    resolve: {
      fallback: {
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        util: require.resolve("util/"),
        fs: false,
        net: false,
        tls: false,
      },
    },
  };