

class Testimonial {
    constructor(name, review, image) {
        this.name = name;
        this.review = review;
        this.image = image;
    }

    html() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">"${this.review}"</p>
                <p class="author">- ${this.name}</p>
            </div>
        `;
    }
}

const testimonials = [
    new Testimonial("Surya Elidanto", "Mantap sekali jasanya!", "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
    new Testimonial("Surya elz", "Keren lah pokonya!", "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
    new Testimonial("Ujang karbu", "Wuhuu Keren lah!", "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
];

let testimonialsContainer = document.getElementById("testimonials");
testimonials.forEach(testimonial => {
    testimonialsContainer.innerHTML += testimonial.html();
});


