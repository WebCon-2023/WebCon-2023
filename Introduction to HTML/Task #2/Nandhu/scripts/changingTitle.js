const titles = ["TechConnect Solutions", "Job Opportunities Available!", "We're Hiring!", "Apply Now!"];
let index = 0;

function changeTitle() {
    document.title = titles[index];
    index = (index + 1) % titles.length;
}

setInterval(changeTitle, 5000);
