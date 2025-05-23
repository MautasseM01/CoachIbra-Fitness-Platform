// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/projets/coach-ibra/Front-end/node_modules/vite/dist/node/index.js";
import react from "file:///C:/projets/coach-ibra/Front-end/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { tempo } from "file:///C:/projets/coach-ibra/Front-end/node_modules/tempo-devtools/dist/vite/index.js";
var __vite_injected_original_dirname = "C:\\projets\\coach-ibra\\Front-end";
var conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}
var vite_config_default = defineConfig({
  root: path.resolve(__vite_injected_original_dirname, "./"),
  // Set root to the project root
  publicDir: "public",
  // Use relative path for publicDir
  base: "/",
  // Ensure base is set to root
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"]
  },
  plugins: [
    react({
      plugins: conditionalPlugins
    }),
    tempo()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 5174,
    // Explicitly set the port
    host: "0.0.0.0"
    // Bind to all network interfaces
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZXRzXFxcXGNvYWNoLWlicmFcXFxcRnJvbnQtZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9qZXRzXFxcXGNvYWNoLWlicmFcXFxcRnJvbnQtZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9wcm9qZXRzL2NvYWNoLWlicmEvRnJvbnQtZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHsgdGVtcG8gfSBmcm9tIFwidGVtcG8tZGV2dG9vbHMvZGlzdC92aXRlXCI7XHJcblxyXG5jb25zdCBjb25kaXRpb25hbFBsdWdpbnM6IFtzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT5dW10gPSBbXTtcclxuXHJcbi8vIEB0cy1pZ25vcmVcclxuaWYgKHByb2Nlc3MuZW52LlRFTVBPID09PSBcInRydWVcIikge1xyXG4gIGNvbmRpdGlvbmFsUGx1Z2lucy5wdXNoKFtcInRlbXBvLWRldnRvb2xzL3N3Y1wiLCB7fV0pO1xyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJvb3Q6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLCAvLyBTZXQgcm9vdCB0byB0aGUgcHJvamVjdCByb290XHJcbiAgcHVibGljRGlyOiAncHVibGljJywgLy8gVXNlIHJlbGF0aXZlIHBhdGggZm9yIHB1YmxpY0RpclxyXG4gIGJhc2U6ICcvJywgLy8gRW5zdXJlIGJhc2UgaXMgc2V0IHRvIHJvb3RcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGVudHJpZXM6IFtcInNyYy9tYWluLnRzeFwiLCBcInNyYy90ZW1wb2Jvb2svKiovKlwiXSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KHtcclxuICAgICAgcGx1Z2luczogY29uZGl0aW9uYWxQbHVnaW5zLFxyXG4gICAgfSksXHJcbiAgICB0ZW1wbygpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgcHJlc2VydmVTeW1saW5rczogdHJ1ZSxcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNTE3NCwgLy8gRXhwbGljaXRseSBzZXQgdGhlIHBvcnRcclxuICAgIGhvc3Q6ICcwLjAuMC4wJywgLy8gQmluZCB0byBhbGwgbmV0d29yayBpbnRlcmZhY2VzXHJcbiAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UixPQUFPLFVBQVU7QUFDeFMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsYUFBYTtBQUh0QixJQUFNLG1DQUFtQztBQUt6QyxJQUFNLHFCQUFzRCxDQUFDO0FBRzdELElBQUksUUFBUSxJQUFJLFVBQVUsUUFBUTtBQUNoQyxxQkFBbUIsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztBQUNwRDtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU0sS0FBSyxRQUFRLGtDQUFXLElBQUk7QUFBQTtBQUFBLEVBQ2xDLFdBQVc7QUFBQTtBQUFBLEVBQ1gsTUFBTTtBQUFBO0FBQUEsRUFDTixjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsZ0JBQWdCLG9CQUFvQjtBQUFBLEVBQ2hEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsSUFDbEIsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
