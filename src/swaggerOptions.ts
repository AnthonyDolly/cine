import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cine',
      version: '1.0.0',
      description: 'API Cine',
    },
  },
  apis: ['./src/routes/*.ts'], // Ajusta la ruta según tu estructura de archivos
  explorer: true,
};

export default swaggerOptions;
