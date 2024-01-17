const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

const assetsPath = path.join(__dirname, 'src/assets');
app.use("/assets", express.static(assetsPath));
app.use(express.urlencoded({ extended: true })); 

app.get('/', home);
app.get('/detailproject', detailproject); 
app.get('/addproject', addProject);
app.post('/addproject', addProjectview);
app.get('/testimonial', testimonial);
app.get('/contact', contact);

function home(req, res) {
  res.render('index');
}
function testimonial(req, res) {
 res.render('testimonial');   
}
function contact(req,res) {
    res.render('contact');
}
function addProject(req, res) {
 res.render('addproject');
}
function addProjectview(req, res) {
  const title = req.body.title;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const description = req.body.description;
  const technologies = req.body.technologies;

  console.log("title:", title);
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("description:", description);
  console.log("technologies:", technologies);

  res.redirect('/addproject');

 }
function detailproject(req, res){
 res.render('detailproject');
}
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
