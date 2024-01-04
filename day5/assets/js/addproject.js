const data = [];

function submitData(event) {
    event.preventDefault();

    const title = document.getElementById("pName").value;
    const s_date = document.getElementById("s-date").value;
    const e_date = document.getElementById("e-date").value;
    const content = document.getElementById("description").value;
    const isUsingNodeJs = document.getElementById("tech1").checked;
    const isUsingReactJs = document.getElementById("tech2").checked;
    const isUsingNextJs = document.getElementById("tech3").checked;
    const isUsingTypescript = document.getElementById("tech4").checked;
    let image = document.getElementById("attachFile").files;
    const p_duration = durationInDays(s_date, e_date);

    if (title === "" || s_date === "" || e_date === "" || content === "" || image.length === 0 || p_duration <= 0) {
        alert("Mohon isi semua field dengan benar.");
        return;
    }

    image = URL.createObjectURL(image[0]);

    const duration = durationInMonth(p_duration);

    const obj = {
        title,
        s_date,
        e_date,
        duration,
        image,
        content,
        isUsingNodeJs,
        isUsingReactJs,
        isUsingNextJs,
        isUsingTypescript,
    };

    data.push(obj);
    renderProject();
}

function renderProject() {
    const projectList = document.getElementById("project-li");
  
    data.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("card");
  
      projectCard.innerHTML = `
      <a href="blogproject.html" class="project-link">
        <div class="card-img">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="card-body">
          <h2>${project.title}</h2>
          <h3>Durasi: ${project.duration}</h3>
          <p>${project.content}</p>
        </div>
        <div class="card-icons">
          ${renderTechImages(project)}
        </div>
        <div class="card-footer">
          <button>Exit</button>
          <button>Delete</button>
        </div>
        </a>
      `;
  
      projectList.appendChild(projectCard);
    });
}

function renderTechImages(project) {
    let renderImages = "";

    if (project.isUsingNodeJs) {
        renderImages += `<li><i class="fab fa-node-js"></i></li>`;
    }
    if (project.isUsingReactJs) {
        renderImages += `<li><i class="fab fa-react"></i></li>`;
    }
    if (project.isUsingNextJs) {
        renderImages += `<li><i class="fab fa-js"></i></li>`;
    }
    if (project.isUsingTypescript) {
        renderImages += `<li><i class="fab fa-js"></i>  </li>`;
    }

    return renderImages;
}

function durationInDays(s_date, e_date) {
    const oneDay = 1000 * 60 * 60 * 24;

    const s_dateMs = new Date(s_date).getTime();
    const e_dateMs = new Date(e_date).getTime();
    const durationMs = e_dateMs - s_dateMs;

    return Math.floor(durationMs / oneDay);
}

function durationInMonth(days) {
    monthDuration = Math.floor(days / 30);
    daysDuration = days % 30;

    if (monthDuration == 0) {
        return `${daysDuration} Hari`;
    }

    if (daysDuration > 20) {
        monthDuration++;
    } else if (daysDuration <= 20 && daysDuration > 10) {
        monthDuration += 0.5;
    }

    return `${monthDuration} Bulan`;
}