// Getting the elements
const image = document.guerySelector('#fish-img'); //question
const answers = Array.from(document.guerySelectorAll('.answer-text')); //choices
const progressText = document.guerySelector('#progressText'); 
const scoreText = document.guerySelector('#score');
const preogressBarFull = document.guerySelector('#preogressBarFull');

let currentImage = {}; //currentQuestion
let acceptingAnswers = true;
let score = 0;
let imageCounter = 0; //questionCounter
let availableImages = [] //availableQuestions

// stating the images and answers
let imageInQuestion = [ //questions
    {
        imageExample: /workspace/FishQuiz/assets/images/carp (2).jpg,
        answer1: 'Carp',
        answer2: 'Perch',
        answer3: 'Roach',
        answer4: 'Koi',
        answer: 1,
    },
    {
        imageExample: /workspace/FishQuiz/assets/images/pearch.jpg,
        answer1: 'Largemouth Bass',
        answer2: 'Minnow',
        answer3: 'Zander',
        answer4: 'Perch',
        answer: 4,
    },
    {
        imageExample: /workspace/FishQuiz/assets/images/rainbow.jpg,
        answer1: 'Guppy',
        answer2: 'Rainbow Trout',
        answer3: 'Brown Trout',
        answer4: 'Tiger Trout',
        answer: 2,
    },
    {
        imageExample: /workspace/FishQuiz/assets/images/tench.jpg,
        answer1: 'Alligator Gar',
        answer2: 'Bream',
        answer3: 'Greayling',
        answer4: 'Tench',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_IMAGES = 4

// start function
startQuiz = () => {
    imageCounter = 0
    score = 0
    availableImages = [...imageInQuestion]
    getNewImage()
}

getNewImage = () => {
    if(availableImages.length === 0 || imageCounter > MAX_IMAGES){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    imageCounter++
    progressText.innerText = `Question ${imageCounter} of ${MAX_IMAGES}`
    preogressBarFull.style.width = `${(imageCounter/MAX_IMAGES) * 100}%` //Uppdate the progress bar

    const imageIndex = Math.floor(Math.random() * availableImages.length)
    currentImage = availableImages[imageIndex]
    imageExample.innerText = currentImage.imageExample

    answers.forEach(answer => {
        const number = answer.dataset['number']
        answer.innerText = currentImage['answer' + number]
    })

    availableImages.splice(imageIndex, 1)

    acceptingAnswers = true
}

answers.forEach(answer => {
    answer.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentImage.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewImage()
        }, 1000)
    })
})