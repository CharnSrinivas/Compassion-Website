
if (process.env.NODE_ENV === 'production') {
  module.exports = ({ env }) => ({
    connection: {
      client: 'mysql',
      connection: {
        host: "toptechonly.com",
        port: 3306,
        database: "u962252833_compassion_db",
        user: "u962252833_compassion",
        password: "M&*THo6kCs2*HFX]rR?",
        ssl: {
          rejectUnauthorized: false
        },
      },
      debug: false,
    },
  })

}
else {

  module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        host: "127.0.0.1",
        port: 5432,
        database: "compassion_db",
        user: "postgres",
        password: "root",
        ssl: {
          rejectUnauthorized: false
        },
      },
      debug: false,
    },
  })
}