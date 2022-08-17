
if (process.env.NODE_ENV === 'production') {

  module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        // host: "217.21.95.154",
        "host": '0.0.0.0',
        // port: 3306,
        port: 5432,
        // database: "u962252833_compassion_db",
        // user: "u962252833_compassion_usr",
        // password: ":7Nw=Z$/4^",
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

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: "153.92.211.54",
//       port: 5432,
//       database: "compassion_db",
//       user: "postgres",
//       password: "root",
//       ssl: {
//         rejectUnauthorized: false
//       },
//     },
//     debug: false,
//   },
// })