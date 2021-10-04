//mandatory imports
const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const multer = require('multer');
const fetch = require("node-fetch");
const https = require("https");
const fs = require('fs');
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser")
// developmental imports 
const moment = require('moment-timezone'); // date time formatting for logger via moment JS

const upload = multer();
const app = express();
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} at ${moment().tz("America/New_York").format('LLL')} US/New York (GMT-4)`);
  next();
  //basically logging every request made (rn it's just a dev tool)
};

app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon', 'MM.png')));
//app.use(express.static(path.join(__dirname, '/public/static'))); // basically for static pages it'll return the exact page
app.use('/public',express.static('public'));
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

app.use(upload.array()); // for forms
app.use(bodyParser.urlencoded({ extended: true })); //even more body parsing
app.use(express.json());
app.use(cookieParser())
app.set('query parser', function(str) {
  return qs.parse(str, { depth: 50 });
});
//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: require(path.join(__dirname, 'public', 'config')) }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'public', 'views'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "static", "index.html"));
});


app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "static", "contact.html"));
});
app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "static", "newquiz.html"));
});	// to do: perhaps redirect to a render in with the form data


app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "static", "about.html"))
});



app.post("/process", (req, res) => {

        matches = [
          { raw: 'foothill-college', name: 'Foothill College' },
          { raw: 'irvine-valley-college', name: 'Irvine Valley College' },
          { raw: 'saddleback-college', name: 'Saddleback College' },
          { raw: 'hill-college', name: 'Hill College' },
          { raw: 'tulsa-community-college', name: 'Tulsa Community College' },
          { raw: 'pasadena-city-college', name: 'Pasadena City College' },
          { raw: 'de-anza-college', name: 'De Anza College' },
          {
            raw: 'san-diego-miramar-college',
            name: 'San Diego Miramar College'
          },
          {
            raw: 'moberly-area-community-college',
            name: 'Moberly Area Community College'
          },
          {
            raw: 'lorain-county-community-college',
            name: 'Lorain County Community College'
          },
          { raw: 'ohlone-college', name: 'Ohlone College' },
          {
            raw: 'illinois-valley-community-college',
            name: 'Illinois Valley Community College'
          },
          { raw: 'cuesta-college', name: 'Cuesta College' },
          {
            raw: 'missouri-state-university---west-plains',
            name: 'Missouri State University - West Plains'
          },
          { raw: 'western-texas-college', name: 'Western Texas College' },
          { raw: 'north-lake-college', name: 'North Lake College' },
          {
            raw: 'austin-community-college-district',
            name: 'Austin Community College District'
          },
          { raw: 'mesa-community-college', name: 'Mesa Community College' },
          {
            raw: 'cloud-county-community-college',
            name: 'Cloud County Community College'
          },
          {
            raw: 'lord-fairfax-community-college',
            name: 'Lord Fairfax Community College'
          }
        ];

        
        console.log(matches)

         res.render('matches', {
          top: matches[0]["name"],
          topRAW: matches[0]["raw"],
          secondRAW: matches[1]["raw"],
          second: matches[1]["name"],
          third: matches[2]["name"],
          thirdRAW: matches[2]["raw"],
          otherMatches: matches.slice(3)
      });
    });

// 404 page
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "public", "static", "404.html"));
});


// btw  if you're wondering how to load the server go type in "localhost:" and then whatever the port is
const PORT = process.env.PORT || 5000; // basically if we deploy this irl it'll use whatever port it fancies (or 5000 if locally)

app.listen(PORT, () => console.log(`Server up! @ localhost:${PORT}`));
//server.listen(PORT, () => console.log(`Server up! @ localhost:${PORT}`)); // self-reminder use a tilda on templates lmao