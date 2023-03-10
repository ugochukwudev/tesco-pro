const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/db");
const TeacherRoute = require("./route/Teacher_route");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swagger.doc");
const cors = require("cors");
const Topics_Router = require("./route/Topic_route");
const Question_Router = require("./route/Question_route");
const Admin_Router = require("./route/Amin_route");
const Result_Router = require("./route/Result_route");
const app = express();

dotenv.config();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// app.use(express.urlencoded({extended:true}))
// app.use((req, res, next) => {
//   res.set({
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//     'Access-Control-Allow-Headers': 'Content-Type/application'
//   });
//   next();
// });
app.use(cors());

//Here is the APi of the different routing
app.use("/api", TeacherRoute);
app.use("/api", Topics_Router);
app.use("/api", Question_Router);
app.use("/api", Admin_Router);
app.use("/api", Result_Router);

db.connection();

const options = {
  swaggerDefinition,
  apis: ["./route/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.end("Welcome to tesoc backend");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serve is running on port:${PORT}`);
});
