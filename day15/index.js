const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('connect-flash');
const port = 3000;
const config = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

const assetsPath = path.join(__dirname, 'src/assets');
app.use("/assets", express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'nnj',
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
      },
  })
)
app.use(flash());


function calculateDuration(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} hari`;
}
const hbs = require('hbs');
const { register } = require('module');

hbs.registerHelper('isNodeJs', function (tech) {
    return tech === 'NodeJs';
});

hbs.registerHelper('isNextJs', function (tech) {
    return tech === 'NextJs';
});

hbs.registerHelper('isReactJs', function (tech) {
    return tech === 'ReactJs';
});

hbs.registerHelper('isTypeScript', function (tech) {
    return tech === 'TypeScript';
});

app.get('/', home);
app.get('/detailproject/:id', detailproject);
app.get('/addproject', addProjectForm);
app.post('/addproject', addProject);
app.get('/testimonial', testimonial);
app.get('/contact', contact);
app.get('/delete/:id', deleteProject);
app.get('/editProject/:id', editProjectForm);
app.post('/editProject/:id', editProject);
app.get('/blogproject/:id', detailproject);
app.get('/login', loginPage);
app.post('/login', addLogin);
app.get('/logout', logout)
app.get('/register', registerPage);
app.post('/register', addRegister);


async function home(req, res) {
    const query = 'SELECT * FROM project'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini dari database", obj)

    res.render('index', { project: obj, isLogin: req.session.isLogin || false, user: req.session.user });
}

function testimonial(req, res) {
    res.render('testimonial',{isLogin: req.session.isLogin,
        user: req.session.user});
}

function contact(req, res) {
    res.render('contact', {isLogin: req.session.isLogin,
        user: req.session.user});
    
}

function addProjectForm(req, res) {
    res.render('addProject', 
    {isLogin: req.session.isLogin,
        user: req.session.user});
}

async function addProject(req, res) {
    try {
        const { title, start_date, end_date, description, technologies } = req.body;
        const image = "logo2.jpg";
        const technologiesArray = technologies.split(',');

        const query = `
            INSERT INTO project (title, start_date, end_date, description, technologies, image, "createdAt", "updatedAt") 
            VALUES ('${title}', '${start_date}', '${end_date}', '${description}', ARRAY[${technologiesArray.map(tech => `'${tech.trim()}'`).join(', ')}], '${image}', NOW(), NOW())
        `;

        const result = await sequelize.query(query, { type: QueryTypes.INSERT });

        console.log("Proyek berhasil ditambahkan:", result);
        res.redirect("/");
    } catch (error) {
        console.error("Error saat menambahkan proyek:", error);
        res.status(500).send("Internal Server Error");
    }
}


app.get('/detailproject/:id', detailproject);

async function detailproject(req, res) {
    const { id } = req.params;

    try {
        const query = 'SELECT * FROM project WHERE id = :id';
        const project = await sequelize.query(query, {
            replacements: { id: id },
            type: QueryTypes.SELECT
        });

        if (!project || project.length === 0) {
            return res.status(404).send('Proyek tidak ditemukan');
        }

        res.render('detailProject', { data: project[0], isLogin: req.session.isLogin, user: req.session.user });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function deleteProject(req, res) {
    const { id } = req.params
    const query = `DELETE FROM project WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("berhasil di delete", obj)
    res.redirect('/');
}

async function editProjectForm(req, res) {
    const { id } = req.params;
    // const data = dataDummy.find(p => p.id === parseInt(id));

    // if (!data) {
    //     return res.status(404).send('Data tidak ditemukan');
    // }
    const query = `SELECT * FROM project WHERE id = ${id}`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    console.log("updateproject", obj)
    res.render("editProject", { data: obj[0] }, {isLogin: req.session.isLogin,
        user: req.session.user});
}

async function editProject(req, res) {
    try {
        const { id } = req.params;
        const { title, start_date, end_date, description, technologies } = req.body;
        const technologiesArray = technologies.split(',');

        const query = `
        UPDATE project 
        SET title='${title}', start_date='${start_date}', end_date='${end_date}', 
        description='${description}', technologies=ARRAY[${technologiesArray.map(tech => `'${tech.trim()}'`).join(', ')}] 
        WHERE id=${id}
      `;

        await sequelize.query(query, { type: QueryTypes.UPDATE });

        console.log("Update berhasil");
        res.redirect("/");
    } catch (error) {
        console.error("Error saat mengupdate proyek:", error);
        res.status(500).send("Internal Server Error");
    }
}


function loginPage(req, res) {
    res.render('login');
}
async function addLogin(req, res) {
    try {
        const { email, password } = req.body;

        const query = `SELECT * FROM users WHERE email='${email}'`;
        const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

        if (!obj.length) {
            req.flash('dark', 'User belum terdaftar');
            return res.redirect('/login');
        }

        const match = await bcrypt.compare(password, obj[0].password);
        if (!match) {
            req.flash('dark', 'Password atau email salah');
            return res.redirect('/login');
        } else {
            req.flash('success', 'login success');
            req.session.isLogin = true;
            req.session.idUser = obj[0].id;
            req.session.user = obj[0].name;
            return res.redirect('/');
        }
    } catch (error) {
        console.error("Error saat login:", error);
        res.status(500).send("Internal Server Error");
    }
}
function registerPage(req, res) {
    res.render('register');
}
async function addRegister(req, res) {
    try {
        const { name, email, password } = req.body;
        const saltRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO users (name, email, password, "createdAt", "updatedAt") 
            VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())
        `;

        await sequelize.query(query, { type: QueryTypes.INSERT });

        console.log("register berhasil");
        res.redirect('/login');
    } catch (error) {
        console.error("Error during user registration:", error);
        
    }
}
async function logout (req, res) {
    console.log('logout page ===> ')
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
  }

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
