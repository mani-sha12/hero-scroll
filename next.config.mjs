const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Static export so it can be hosted on GitHub Pages */
export default { output: "export", basePath, images: { unoptimized: true } };
