'use strict';


//selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabsConatiner = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')


//modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn =>{
  btn.addEventListener('click', openModal);

})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



//smooth scroll 
btnScrollTo.addEventListener('click', function(e){
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords )
  
  console.log(e.target.getBoundingClientRect());

  console.log('current scroll (X/Y)', window.scrollX, scrollY)

  console.log('height/width viewport', 
  document.documentElement.clientHeight,
  document.documentElement.clientWidth)

  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY );
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top :s1coords.top + window.scrollY,
  //   behavior: "smooth",

  // })

  section1.scrollIntoView({behavior:"smooth"})
})

///////////////////////////////////////
//page navigation


// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior : 'smooth'})
//   })

// })

//1.add event listener to common parent element
//2.determine what element orignated from the event 

document.querySelector('.nav__links').addEventListener('click', function(e){
  console.log(e.target);

  //matching strategry
  if(e.target.classList.contains('nav__link')){
    console.log('link')
    e.preventDefault();
    const id = e.target.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior : 'smooth'})
  }
})

//tabbed componet
tabsConatiner.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked)


  //guard close
  if(!clicked) return;

  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  //active tabbed content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

//menu faded animation

const fadeAnimation = function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity
    });
    logo.style.opacity = opacity
  }
}
nav.addEventListener('mouseover', function(e){
  fadeAnimation(e,0.5)
})

nav.addEventListener('mouseout', function(e){
  fadeAnimation(e,1)
})

//sticky navigation (1 using windows.scrollY)
// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function(){
//   console.log(this.window.scrollY)

//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky')
//   }else{
//     nav.classList.remove('sticky')
//   }

// })

//sticky navigation (using intersectionAPI)

// const obsCallback = function(entries,observer){
//   entries.forEach(entry =>{
//     console.log(entry)
//   })
// }

// const obsOptions = {
//   root : null,
//   threshold : [0,0.2]
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else
  nav.classList.remove('sticky')
}

const headerObsever = new IntersectionObserver(stickyNav, {
  root : null,
  threshold : 0,
  rootMargin : `${navHeight}px`,
});
headerObsever.observe(header)


//reveal sections
const allSections = document.querySelectorAll('.section')
const reavelection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
  
}

const sectionObserver = new IntersectionObserver(reavelection, {
  root : null,
  threshold : 0.15
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})


//lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets);

const loadingImg = function(entries,observer){
  const [entry] = entries
  if(!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
};

const imgObserver = new IntersectionObserver(loadingImg,{
  root:null,
  threshold:0,
  rootMargin : '300px'

})

imgTargets.forEach(img => imgObserver.observe(img))



//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////


/*
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const theHeader = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
console.log(allSections)

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button')
console.log(allButtons)

//creating and inserting elements
//.insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionalites and analytics'
message.innerHTML = 'We use cookies for improved functionalites and analytics <button class = "btn btn--close-cookie">Got it!</button>'

// theHeader.prepend(message)
theHeader.append(message)
// theHeader.append(message.cloneNode(true));

// theHeader.before(message)
// theHeader.after(message)

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
})

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);

console.log(getComputedStyle(message).color)
console.log(getComputedStyle(message).height)

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered')

const logo = document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.src)

//data attributes
console.log(logo.dataset.versionNumber)

//more event listeners
const h1 = document.querySelector('h1')

const alert1 =  function(e){
  alert('addEventListener : Great! You are reading the heading :D')
}

h1.addEventListener('mouseenter', alert1)

setTimeout(()=> h1.removeEventListener('mouseenter', alert1), 3000)

// h1.onmouseenter = function(e){
//   alert('addEventListener : Great! You are reading the heading:D')
// }
//random color 
const randomInt = (min,max) =>
  Math.floor(Math.random()* (max-min + 1) + min)
const randomColor = () => 
`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
console.log(randomColor(0,255))

document.querySelector('.nav__link').addEventListener('click', function(e){
  console.log('link', e.target)
  this.style.backgroundColor = randomColor()

})


document.querySelector('.nav__links').addEventListener('click', function(e){
  console.log('links',e.target)
  this.style.backgroundColor = randomColor()
})



document.querySelector('.nav').addEventListener('click', function(e){
  console.log('nav', e.target)
  this.style.backgroundColor = randomColor()
})

const h1 = document.querySelector('h1')

//going downards : child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes)

//going downwards ; child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes)
console.log(h1.children)

h1.firstElementChild.style.color = 'blue'
h1.lastElementChild.style.color = 'orangered'

h1.closest('.header').style.background = 'var( --gradient-secondary)'

//going sidewyas : siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el !==h1 ) el.style.transform = 'scale(0.5)'  
 });

*/
