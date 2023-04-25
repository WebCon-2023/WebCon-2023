let movies = [
    {
        name: 'WI  vs IND 317/8 (50)',
        des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit porro et veniam excepturi, eaque voluptatem impedit nulla laboriosam facilis ut laboriosam libero!',
        image: './Assets/slider 6.PNG'
      },
      {
        name: 'falcon and the winter soldier',
        des: "Following the events of Avengers: Endgame, Sam Wilson and Bucky Barnes team up in a global adventure that tests their abilities and their patience.",
        image: './Assets/slider 2.PNG'
      },
      {
        name: 'loki',
        des:"The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers Endgame.",
        image: './Assets/slider 1.PNG'
    },
    {
        name: 'wanda vision',
        des: "Living idealized suburban lives, super-powered beings Wanda and Vision begin to suspect that everything is not as it seems.",
        image: './Assets/slider 3.PNG'
    },
    {
        name: 'raya and the last dragon',
        des: "Raya, a warrior, sets out to track down Sisu, a dragon, who transferred all her powers into a magical gem which is now scattered all over the kingdom of Kumandra, dividing its people.",
        image: './Assets/slider 4.PNG'
    },
    {
        name: 'luca',
        des:"Set in a beautiful seaside town on the Italian Riviera, the original animated feature is a coming-of-age story about one young boy experiencing an unforgettable summer filled with gelato, pasta and endless scooter rides. ",
        image: './Assets/slider 5.PNG'
    },
    {
        name: 'Rudra: The Edge of Darkness',
        des: 'In the crime-ridden streets of Mumbai, journeying through the maze of psychopathic minds is brilliant super-cop Rudra Veer Singh.',
        image: './Assets/slider 7.PNG'
    },
    {
        name: 'The Book of Boba Fett',
        des: 'Bounty hunter Boba Fett and mercenary Fennec Shand navigate the underworld when they return to Tatooine to claim Jabba the Hutt',
        image: './Assets/slider 8.PNG'
    },
]

    // Carousel
    const carousel = document.querySelector('.carousel');
    let sliders = [];

    let slideIndex = 0;


    const createSlide = () => {
	if(slideIndex >= movies.length){
		slideIndex = 0;
	}

	//creating DOM elements
	let slide = document.createElement('div');
	let imgElement = document.createElement('img');
	let content = document.createElement('div');
	let h1 = document.createElement('h1');
	let p = document.createElement('p');

	//attaching all elements
	imgElement.appendChild(document.createTextNode(''));
	h1.appendChild(document.createTextNode(movies[slideIndex].name));
	p.appendChild(document.createTextNode(movies[slideIndex].des));
	content.appendChild(h1);
	content.appendChild(p);
	slide.appendChild(content);
	slide.appendChild(imgElement);
	carousel.appendChild(slide);

    // Setting up image
	imgElement.src = movies[slideIndex].image;
	slideIndex++;

    // Setting elements class-name
	slide.className = 'slider';
	content.className = 'slide-content';
	h1.className = 'movie-title';
	p.className = 'movie-des';
	sliders.push(slide);

	if(sliders.length){
		sliders[0].style.marginLeft = `calc(-${100*(sliders.length - 2)}% - ${30*(sliders.length - 2)}px)`;
	}
    };
    for(let i=0; i<3; i++)
    {
	createSlide();	
    }

    setInterval(()=>{
	createSlide();
    }, 3000);

// Video cards
const videoCards = [...document.querySelectorAll('.video-card')];

videoCards.forEach(item => {
	item.addEventListener('mouseover', () => {
		let video = item.children[1];
		video.play();
	})

	item.addEventListener('mouseleave', () => {
		let video = item.children[1];
		video.pause();
	})
})

//card sliders
let cardContainers = document.querySelectorAll('.card-container');
let preBtns = document.querySelectorAll('.pre-btn');
let nxtBtns = document.querySelectorAll('.nxt-btn');

cardContainers.forEach((item, i) =>{
	let containerDiamensions = item.getBoundingClientRect();
	let containerWidth = containerDiamensions.width;
	
	nxtBtns[i].addEventListener('click', () => {
		item.scrollLeft += containerWidth - 200;
	})

	preBtns[i].addEventListener('click', () => {
		item.scrollLeft -= containerWidth + 200;
	});
});