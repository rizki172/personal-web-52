// KONSEP OOP

// class Testimonial {
//     constructor(name, review, image) {
//         this.name = name;
//         this.review = review;
//         this.image = image;
//     }

//     html() {
//         return `
//             <div class="testimonial">
//                 <img src="${this.image}" class="profile-testimonial" />
//                 <p class="quote">"${this.review}"</p>
//                 <p class="author">- ${this.name}</p>
//             </div>
//         `;
//     }
// }

// const testimonials = [
//     new Testimonial("Surya Elidanto", "Mantap sekali jasanya!", "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
//     new Testimonial("Surya elz", "Keren lah pokonya!", "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
//     new Testimonial("Ujang karbu", "Wuhuu Keren lah!", "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
// ];

// let testimonialsContainer = document.getElementById("testimonials");
// testimonials.forEach(testimonial => {
//     testimonialsContainer.innerHTML += testimonial.html();
// });

// KONSEP HOF 
const testimonialData = {
    Cecep: {
      author: "cecep",
      content: "Bagus banget bang",
      image: "https://images.pexels.com/photos/19040835/pexels-photo-19040835/free-photo-of-pria-jalan-jaket-potret.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
    },
    Rizal: {
      author: "Rizal",
      content: "Okee banget sii",
      image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4,
    },
    Ujangkarbu: {
      author: "Ujang Karbu",
      content: "Lumayan lah",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4,
    },
    UjangKnalpot: {
      author: "ujang knalpot",
      content: "Lumayan lah",
      image: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 3,
    },
    anton : {
      author: "anton",
      content: "Kacauu",
      image: "https://images.pexels.com/photos/19038311/pexels-photo-19038311/free-photo-of-pria-trotoar-duduk-cerutu.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 1,
    },
  };
  
  function generateTestimonialHTML(item, additionalInfoCallback) {
    let html = `<div class="testimonial">
      <img src="${item.image}" class="profile-testimonial" />
      <p class="quote">"${item.content}"</p>
      <p class="author">- ${item.author}</p>
      <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>`;
  
    if (additionalInfoCallback) {
      html += additionalInfoCallback(item);
    }
  
    html += `</div>`;
  
    return html;
  }
  
  function allTestimonials() {
    let testimonialHTML = "";
    for (const key in testimonialData) {
      testimonialHTML += generateTestimonialHTML(testimonialData[key]);
    }
  
    document.getElementById("testimonials").innerHTML = testimonialHTML;
  }
  
  function filterTestimonials(rating, additionalInfoCallback) {
    let testimonialHTML = '';
    for (const key in testimonialData) {
      if (testimonialData.hasOwnProperty(key) && testimonialData[key].rating === rating) {
        const item = testimonialData[key];
        testimonialHTML += generateTestimonialHTML(item, additionalInfoCallback);
      }
    }
  
    if (testimonialHTML === '') {
      testimonialHTML = `<h3>Data not found!</h3>`;
    }
  
    document.getElementById('testimonials').innerHTML = testimonialHTML;
  }
  
  allTestimonials();
  
  function additionalInfo(item) {
    return `<p class="additional-info">High Rating Testimonial</p>`;
  }
  
  filterTestimonials(5, additionalInfo);