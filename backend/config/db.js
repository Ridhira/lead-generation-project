// const mongoose = require("mongoose");
// const colors = require("colors");
// const dotenv = require("dotenv");

// dotenv.config();
// const mongo_url = process.env.MONGO_CONNECTION;

// const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(mongo_url);
//     console.log(`Mongodb Connected: ${connect.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit(1); // Exit with a non-zero status code to indicate an error
//   }
// };

// module.exports = connectDB;

const mysql = require("mysql2/promise");
const { DBConfig, ERRORS } = require("./config");

var fn = [];

const pool = mysql.createPool({
  connectionLimit: DBConfig.connectionLimit,
  host: DBConfig.host,
  port: DBConfig.port,
  user: DBConfig.user,
  password: DBConfig.password,
  database: DBConfig.database,
});

async function GetDbPool() {
  try {
    const connection = await pool.getConnection();
    console.log("threadId: ", connection.threadId);
    return { error: null, client: connection };
  } catch (err) {
    if (err instanceof AggregateError) {
      console.log("Multiple errors occurred:");
      for (const individualError of err.errors) {
        console.log(individualError.message);
      }
    } else {
      console.log("Not connected due to error: " + err.message);
    }
    return { error: err, client: null };
  }
}

// fn.Execute = async (query) => {
//   const { error, client } = await GetDbPool();

//   if (error) {
//     console.log("Error", error);
//     return { status: ERRORS.NOT_FOUND, statusText: error.message };
//   }

//   if (client === null) {
//     return {
//       status: ERRORS.BAD_REQUEST,
//       statusText: "Failed Creating Pool",
//     };
//   }

//   try {
//     const results = await client.query(query);
//     console.log("Result---->", results);
//     const [procedureResult, errResult] = results;
//     client.release();
//     client.end();

//     return {
//       status: ERRORS.OK,
//       data: procedureResult,
//     };
//   } catch (err) {
//     client.release();
//     client.end();

//     let text = err.message;
//     let status = ERRORS.BAD_REQUEST;
//     if (err.code === "ER_DUP_ENTRY") {
//       text = "Duplicate entry";
//       status = ERRORS.DUPLICATE_ENTRY;
//     }
//     return { status: status, statusText: text };
//   }
// };

fn.Execute = async (query) => {
  const { error, client } = await GetDbPool();

  if (error) {
    return { status: ERRORS.NOT_FOUND, statusText: error.message };
  }

  if (client === null) {
    return {
      status: ERRORS.BAD_REQUEST,
      statusText: "Failed Creating Pool",
    };
  }

  try {
    const results = await client.query(query);

    const [procedureResult, errResult] = results;

    return {
      status: ERRORS.OK,
      data: procedureResult,
    };
  } catch (err) {
    let text = err.message;
    let status = ERRORS.BAD_REQUEST;
    if (err.code === "ER_DUP_ENTRY") {
      text = "Duplicate entry";
      status = ERRORS.DUPLICATE_ENTRY;
    }
    return { status: status, statusText: text };
  } finally {
    client.release();
  }
};

module.exports = fn;
