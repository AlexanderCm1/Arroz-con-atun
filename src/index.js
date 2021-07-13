
const app = require('./middleware/app');

app.listen(app.get("port"), () => {
  console.log(`aca p en el puerto ` + app.get("port"))
}
);
