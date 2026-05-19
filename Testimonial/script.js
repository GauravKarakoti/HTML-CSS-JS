const testimonials = [
    {
        name: "Gaurav Karakoti",
        position: "Student",
        image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt augue id erat tristique ullamcorper. Vivamus commodo nisi nibh, at feugiat risus porta sed. Nulla egestas nisl dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin porta sem vel pretium maximus. Vivamus vel lectus faucibus, porta nunc vitae, bibendum neque. In viverra mi sed sem tempor elementum. Pellentesque aliquam tempus lorem ut luctus. Cras hendrerit nisl nunc, vitae tincidunt dolor molestie et. Vivamus condimentum pretium dignissim. Fusce in risus pellentesque, luctus tellus et, consectetur ante. Morbi nec mollis urna, sit amet volutpat sem."
    },
    {
        name: "Bhumika Singh",
        position: "Student",
        image: "https://cdn.pixabay.com/photo/2016/08/20/05/51/avatar-1606939_1280.png",
        testimonial: "Suspendisse pulvinar efficitur nibh quis dictum. Cras a faucibus turpis. Nullam nunc est, ornare sit amet varius sed, varius molestie felis. Maecenas eu nulla in dolor molestie luctus. Ut eu varius ipsum. Cras eget maximus quam, eget convallis magna. Nullam tincidunt, massa in molestie euismod, velit enim aliquet ante, sed laoreet eros massa eu diam. In quis blandit magna, a molestie tellus. Etiam tellus nisl, molestie quis tincidunt at, feugiat vitae nulla. Sed convallis arcu eros, vitae efficitur lorem ultricies at. Ut venenatis eget ipsum non venenatis. Curabitur arcu dui, scelerisque ut tortor eget, sollicitudin vestibulum nunc. Praesent vitae efficitur libero. Ut vel rutrum ligula, id posuere ante."
    },
    {
        name: "Aur koi nahi",
        position: "Non-Existing",
        image: "https://cdn.pixabay.com/photo/2017/11/10/05/46/user-2935523_1280.png",
        testimonial: "Quisque augue urna, fringilla non maximus eget, tempus sit amet nulla. Aenean erat nisl, consectetur ac diam ac, elementum sagittis ex. Integer lectus felis, aliquet eget luctus a, pharetra non sapien. Nulla est leo, vestibulum ut aliquam sed, dignissim et mauris. Proin a massa eget mi consectetur posuere quis eget odio. Donec vel ante ultricies, viverra nunc ut, semper est. Curabitur sit amet hendrerit ipsum, semper placerat velit. Proin diam turpis, mollis at magna eu, dignissim imperdiet mi. Donec vitae dui a sem rhoncus pellentesque. Cras volutpat neque a nunc porttitor, nec fringilla est molestie. In suscipit gravida urna eget varius. Praesent orci ipsum, dapibus sit amet felis a, pharetra fermentum massa."
    },
];
const testimonialContainer = document.getElementById("_testimonial-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let currentIndex = 0;
function showTestimonial() {
    const testimonial = testimonials[currentIndex];
    testimonialContainer.innerHTML = `
        <img src="${testimonial.image}" />
        <h3>${testimonial.name}</h3>
        <h6>${testimonial.position}</h6>
        <p>${testimonial.testimonial}</p>
    `;
}
function changeTestimonial(direction) {
    currentIndex += direction;
    if(currentIndex < 0) {
        currentIndex = testimonials.length - 1;
    } else if(currentIndex >= testimonials.length) {
        currentIndex = 0;
    }
    showTestimonial();
}
prevButton.addEventListener("click", () => changeTestimonial(-1));
nextButton.addEventListener("click", () => changeTestimonial(1));
showTestimonial();