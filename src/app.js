/* app.get('/help', (req, res) => {
    //позволяет определить, что делать серверу, когда кто-то
                               //обращается по определенному URL(здесь по адресу /). 1 аргумент принимает URL, 2 аргумент принимает cb. cb определяет, сто делать серверу
    res.send('Help page');
}); */

// app.com
// app.com/help
// app.com/about
// nodemon app.js -e js,hbs рестартит сервер после файлов с перечисленными расширениями

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({  // без return сервер пытается дважды отправить ответ
//             error: 'You must provide a search term',
//         });
//     }
//     console.log(req.query.search); // получаем значения из строки запроса
//     res.send({
//         products: [],
//     });
// });

const path = require("path"); //core-module для работы с path-строками
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // позволяет установить значение для property объекта express. В первом аргументе key, во втором value
app.set("views", viewsPath); // поменяли название и положение папки views
hbs.registerPartials(partialsPath); // говорим hbs, где искать partials

app.use(express.static(publicDirectoryPath)); // позволяет загружать cтатические html страницы по запросу из папки с путем из переменной publicDirectoryPath.
// Если страница динамическая то предыдущую строку удалять не надо, т.к. не загрузятся стили и картинки

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nicki Minaj",
  }); // рендерит hbs страницу. hbs дает возможность извенять html динамически
  // вотрым агрументом принимает объект из которого считывает значения и подставляет из в html вместо строк вида {{key}}
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nicki Minaj",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMessage: `Brought out the pink Lamborghini just to race with Chyna
        Brought the Wraith to China just to race in China
        Lil' bad trini bitch but she mixed with China
        Real thick vagina, smuggle bricks to China (woo)
        I tell all my niggas, (yo) cut the check (cut the check)
        Buss it down, turn your goofy down, (down) pound
        I'mma do splits on it, yes, splits on it, (splits) I'm a bad bitch, I'mma throw fits on it (fits)
        I'mma bust it open, I'mma go stupid and be a ditz on it (ditz)
        I don't date honey, (no?) cookie on tsunami (oh)
        All my niggas wife me once they get that good punani.`,
    name: "Nicki Minaj",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    //в названиях файлов hbs не должно быть никаких сиволов кроме букв и цифр
    title: "404",
    errorMessage: "Help article not found",
    name: "Nicki Minaj",
  });
});

app.get("*", (req, res) => {
  // в express * обозначает всевозможные строки. Этот event handler ставится в конце, т.к. он использует *, т.е. для всех URL кроме вышеперечисленных будет срабатывать данный event handler, выдающий страницу 404
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Nicki Minaj",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
}); //принимает порт и cb(опц.), который выполнится, как только запустится сервер
