const imageSlide = document.getElementById("image-slide");
const leftIcon = document.getElementById("arrow-left");
const rightIcon = document.getElementById("arrow-right");
const slideIndicators = document.getElementById("slide-indicators");

const imageSlideWidth = imageSlide.offsetWidth;

const images = [
  {
    src: "./images/kseniia-lobko--8gzM1wxPYI-unsplash-min.jpg",
    alt: "Image 1",
  },
  {
    src: "./images/nataliya-melnychuk-xB12CvLM4rA-unsplash-min.jpg",
    alt: "Image 2",
  },
  {
    src: "./images/ouael-ben-salah-SmD8LAKyHWE-unsplash-min.jpg",
    alt: "Image 3",
  },
];
const imagesLength = images.length;
let currentImageIndex = 0;
let transitionInProgress; // Used to track if the slide is in transitions

const createImageSlide = (image) => {
  // Create Image Slide
  const figureElement = document.createElement("figure");
  figureElement.classList.add("image-slide__item");
  const imageElement = document.createElement("img");
  imageElement.src = image.src;
  imageElement.alt = image.alt;
  figureElement.appendChild(imageElement);
  imageSlide.appendChild(figureElement);
};

const createSlideIndicator = (index) => {
  // Create Slide Indicator
  const slideIndicator = document.createElement("div");
  slideIndicator.classList.add("slide-indicator");
  if (index === 0) {
    slideIndicator.classList.add("slide-indicator--active");
  }

  slideIndicator.addEventListener("click", () => slideToImage(index));
  slideIndicators.appendChild(slideIndicator);
};

for (let i = 0; i < imagesLength; i++) {
  createImageSlide(images[i]);
  createSlideIndicator(i);
}

function toNegativePX(value) {
  return `-${value}px`;
}

function toggleActiveSlideIndicator() {
  const currentImage = document.querySelector(".slide-indicator--active");
  currentImage.classList.remove("slide-indicator--active");
  slideIndicators.children[currentImageIndex].classList.add(
    "slide-indicator--active"
  );
}

function handleTransition(start, end, duration = 2000) {
  const fps = 60;
  const frameDuration = duration / fps;
  const distance = Math.abs(start - end);
  const distancePerFrame = distance / frameDuration;

  let direction = "right";
  if (start > end) {
    direction = "left";
  }

  const interval = setInterval(() => {
    transitionInProgress = true;
    if (direction === "right") {
      start += distancePerFrame;
      if (start <= end) {
        imageSlide.style.left = toNegativePX(start);
      } else {
        imageSlide.style.left = toNegativePX(end);
        clearInterval(interval);
        transitionInProgress = false;
      }
    } else {
      start -= distancePerFrame;
      if (start >= end) {
        imageSlide.style.left = toNegativePX(start);
      } else {
        imageSlide.style.left = toNegativePX(end);
        clearInterval(interval);
        transitionInProgress = false;
      }
    }
  }, frameDuration);
}

function slideTOPreviousImage() {
  if (transitionInProgress) {
    return;
  }

  const startValue = currentImageIndex * imageSlideWidth;
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = imagesLength - 1;
  }
  const leftValue = currentImageIndex * imageSlideWidth;
  handleTransition(startValue, leftValue);

  toggleActiveSlideIndicator();
}

function slideToNextImage() {
  if (transitionInProgress) {
    return;
  }

  const startValue = currentImageIndex * imageSlideWidth;
  if (currentImageIndex < imagesLength - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }
  const leftValue = currentImageIndex * imageSlideWidth;
  handleTransition(startValue, leftValue);

  toggleActiveSlideIndicator();
}

function slideToImage(index) {
  if (transitionInProgress) {
    return;
  }

  currentImageIndex = index;
  const leftValue = currentImageIndex * imageSlideWidth;
  imageSlide.style.left = toNegativePX(leftValue);

  toggleActiveSlideIndicator();
}

leftIcon.addEventListener("click", () => {
  slideTOPreviousImage();
});

rightIcon.addEventListener("click", () => {
  slideToNextImage();
});

setInterval(() => slideToNextImage(), 2000);
