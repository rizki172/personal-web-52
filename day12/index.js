const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

const assetsPath = path.join(__dirname, 'src/assets');
app.use("/assets", express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

let dataDummy = [];

function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} hari`;
}
const hbs = require('hbs');

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

function home(req, res) {
    const dataWithIcons = dataDummy.map(blog => {
        const techno = blog.technologies.map(element => {
            return (
                element === "NodeJs" ? '<i class="fab fa-node-js pe-2 fs-5"></i>' :
                element === "NextJs" ? '<i class="fab fa-google-play px-2 fs-5"></i>' :
                element === "ReactJs" ? '<i class="fa-brands fa-android px-2 fs-5"></i>' :
                element === "TypeScript" ? '<i class="fa-solid fa-mobile px-2 fs-5"></i>' :
                ''
            );
        });
        return {
            ...blog,
            technologies: techno.join('')
        };
    });

    res.render('index', {
        projects: dataWithIcons
    });
}

  
function testimonial(req, res) {
    res.render('testimonial');
}

function contact(req, res) {
    res.render('contact');
}

function addProjectForm(req, res) {
    res.render('addProject');
}

function addProject(req, res) {
    const newProject = {
        id: dataDummy.length + 1,
        name: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        technologies: req.body.technologies.split(','), 
        duration: calculateDuration(req.body.startDate, req.body.endDate),
    };

    dataDummy.push(newProject);

    console.log("Proyek Baru:", newProject);

    res.render('index', { projects: dataDummy.sort((a, b) => a.id - b.id) });
}

function detailproject(req, res) {
    const { id } = req.params;
    const project = dataDummy.find(p => p.id === parseInt(id));

    if (!project) {
        return res.status(404).send('Proyek tidak ditemukan');
    }

    res.render('detailProject', { data: project });
}

function deleteProject(req, res) {
    const projectId = parseInt(req.params.id);
    const projectIndex = dataDummy.findIndex(p => p.id === projectId);

    if (projectIndex !== -1) {
        dataDummy.splice(projectIndex, 1);
    }

    res.redirect('/');
}

function editProjectForm(req, res) {
    const { id } = req.params;
    const data = dataDummy.find(p => p.id === parseInt(id));

    if (!data) {
        return res.status(404).send('Data tidak ditemukan');
    }

    res.render("editProject", { data, id, availableTechnologies: getAvailableTechnologies() });
}

function editProject(req, res) {
    const { id } = req.params;
    const { title, startDate, endDate, description, technologies, icon } = req.body;

    dataDummy[parseInt(id) - 1] = {
        id: parseInt(id),
        name: title,
        startDate,
        endDate,
        description,
        technologies: technologies ? technologies.split(',') : [],
        icon,
        duration: calculateDuration(startDate, endDate),
    };

    res.redirect("/");
}

function getAvailableTechnologies() {
    return ["NodeJs", "ReactJs", "NextJs", "TypeScript"];
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
