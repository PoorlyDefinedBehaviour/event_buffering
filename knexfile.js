module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "postgres",
      database: "event_buffer",
      port: 5433,
    },
    migrations: {
      tableName: "migrations",
    },
  },
}
