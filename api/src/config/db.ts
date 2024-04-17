export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'db',
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'ssdasadsadasd12313',
    name: process.env.DATABASE_NAME || 'example',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: process.env.JWT_SECRET || 'secretKey',
});
