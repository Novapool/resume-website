import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next's defaults start at 640, and with a `vw` in `sizes` it drops every
    // candidate below 640 × that ratio, so the 200px game covers were served
    // at 384w on desktop. Adding phone-width device sizes lets the 256w
    // candidate through; wider images get finer steps too.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
