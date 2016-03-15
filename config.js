System.config({
  baseURL: "/",
  transpiler: "typescript",
  map: {
    "typescript": "./node_modules/typescript/lib/typescript.js"
  },
  typescriptOptions: {
  },
  packages: {
  './src': {
    defaultExtension: 'ts'
  }
  }
});
