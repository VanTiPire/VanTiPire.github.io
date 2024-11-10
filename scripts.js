document.addEventListener('DOMContentLoaded', function () {
  window.scrollTo(0, 0);
  let currentSectionId = null;
  let isCardClicked = false;

  const fadeInElements = (selectors, delay) => {
    setTimeout(() => {
      selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          element.style.opacity = '1';
        }
      });
    }, delay);
  };

  setTimeout(() => {
    const biosec = document.querySelector('.bio-sections');
    if (biosec) {
      biosec.style.overflow = 'visible';
    }

    document.querySelectorAll('.bio-sections .card').forEach(card => {
      card.classList.add('hover-enabled');
    });
  }, 3900);

  setTimeout(() => {
    const galsec = document.querySelector('.gal-sections');
    if (galsec) {
      galsec.style.overflow = 'visible';
    }

    const cards = document.querySelectorAll('.gal-sections .card');

    cards.forEach((card, index) => {
      card.classList.add('hover-enabled');

      card.addEventListener('mouseenter', () => {
        if (!isCardClicked) { 
          changeBackgroundColor(index);
        }
      });


      card.addEventListener('mouseleave', () => {
        if (!isCardClicked) {
          resetBackgroundColors();
        }
      });


      card.addEventListener('click', () => {
        isCardClicked = true;
        changeBackgroundColor(index);

        buttonUp.classList.remove('card-clicked-0', 'card-clicked-1', 'card-clicked-2');
        buttonUp.classList.add(`card-clicked-${index}`);
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY === 0 && isCardClicked) {
        isCardClicked = false;
        resetBackgroundColors();
      }
    });

  }, 3450);

  fadeInElements(['.image-container', '.bio-container', '.gal-container', '.quo-container', '.abt-container'], 100);
  fadeInElements(['.navbar-left', '.navbar-right', '.navbar-center'], 1600);
  fadeInElements(['.intro-slide', '.master-slide', '.button-down','.bio-content','artwork'], 2300);
  fadeInElements(['.slide-gal-down','.slide-gal-up'], 3300);
  const lastClickedTab = {};

  const showSection = (sectionId, scroll = true) => {
    document.querySelectorAll('.bio-section').forEach(section => {
      section.style.display = 'none';
      section.style.opacity = '0';
    });

    const selectedSection = document.getElementById(sectionId);
    if (!selectedSection) return;
    selectedSection.style.display = 'block';

    if (currentSectionId !== sectionId) {
      setTimeout(() => {
        selectedSection.style.transition = 'opacity 600ms ease-in-out';
        selectedSection.style.opacity = '1';
      }, 300);
      currentSectionId = sectionId;
    } else {
      selectedSection.style.transition = 'none';
      selectedSection.style.opacity = '1';
    }

    const lastTabButton = lastClickedTab[sectionId];
    const tabButtons = selectedSection.querySelectorAll('.tab-button');
    const tabContents = selectedSection.querySelectorAll('.tab-content');

    tabContents.forEach(content => {
      content.style.display = 'none';
      content.style.opacity = '0';
    });

    tabButtons.forEach(button => {
      button.classList.remove('active');
    });

    if (lastTabButton) {
      lastTabButton.classList.add('active');
      const lastTabContentId = lastTabButton.getAttribute('data-target');
      const lastTabContent = selectedSection.querySelector(`#${lastTabContentId}`);

      if (lastTabContent) {
        lastTabContent.style.display = 'block';
        setTimeout(() => {
          lastTabContent.style.opacity = '1';
        }, 10);
      }
    } else {
      const firstTabButton = tabButtons[0];
      if (firstTabButton) {
        firstTabButton.classList.add('active');
        const firstTabContentId = firstTabButton.getAttribute('data-target');
        const firstTabContent = selectedSection.querySelector(`#${firstTabContentId}`);

        if (firstTabContent) {
          firstTabContent.style.display = 'block';
          setTimeout(() => {
            firstTabContent.style.opacity = '1';
          }, 10);
        }
      }
    }

    if (scroll) {
      selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  showSection('section4', false);

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const sectionId = card.getAttribute('data-section');
      showSection(sectionId);

      ['#text1', '#text5', '#text9', '#text12'].forEach(id => {
        const element = document.querySelector(id);
        if (element) {
          element.style.opacity = '1';
        }
      });
    });
  });

  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      const section = button.closest('.bio-section');
      if (!section) return; 
  
      const sectionId = section.id;
      lastClickedTab[sectionId] = button;
  
      document.querySelectorAll(`#${sectionId} .tab-content`).forEach(content => {
        content.style.display = 'none';
        content.style.opacity = '0';
      });
  
      document.querySelectorAll(`#${sectionId} .tab-button`).forEach(btn => {
        btn.classList.remove('active');
      });
  
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.style.display = 'block';
        setTimeout(() => {
          targetContent.style.opacity = '1';
        }, 10);
      }
    });
  });

  const overlay = document.getElementById('overlay');

  document.querySelectorAll('.navbar-left li a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('bio.html') || link.href.includes('about.html') ) {
          overlay.classList.add('show-bio');
        } else if (link.href.includes('gal.html')|| link.href.includes('quo.html')) {
          overlay.classList.add('show-gal');
        }

        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.button-about a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('about.html')) {
          overlay.classList.add('show-bio');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.button-letter a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('quo.html')) {
          overlay.classList.add('show-gal');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.button-month a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('month.html')) {
          overlay.classList.add('show-bio');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.cards1 a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('quo.html')) {
          overlay.classList.add('show-gal');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.cards2 a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('quo.html')) {
          overlay.classList.add('show-gal');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.cards3 a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('quo.html')) {
          overlay.classList.add('show-gal');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.cards4 a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('quo.html')) {
          overlay.classList.add('show-gal');
        }
  
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  document.querySelectorAll('.navbar-center li a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (overlay) {
        overlay.className = '';
        if (link.href.includes('index.html')) {
          overlay.classList.add('show-gal');
        } 

        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      }
    });
  });

  const buttonDown = document.querySelector('.button-down');
  const buttonUp = document.querySelector('.button-up');

  if (buttonDown) {
    buttonDown.addEventListener('click', function () {
      if (buttonUp) {
        setTimeout(() => {
          buttonUp.style.opacity = '1';
        }, 500);
      }

      document.querySelectorAll('.cards1, .cards2, .cards3, .cards4').forEach(card => {
        card.style.opacity = '1';
      });

      const cardImages = [...document.querySelectorAll('.card1-image, .card2-image, .card3-image, .card4-image')];
      const animationDurations = [2200, 1800, 2200, 2400];

      cardImages.forEach((img, index) => {
        img.style.opacity = '1';
        img.style.animation = `slide-cards ${animationDurations[index]}ms ease-in-out forwards`;
      });

      setTimeout(() => {
        const letterSlide = document.querySelector('.letter-slide');
        if (letterSlide) {
          letterSlide.style.opacity = '1';
          letterSlide.style.animation = 'slide-letter-in 1000ms ease-in-out forwards';
        }
      }, 500);
    });
  }

  const buttonDownLink = document.querySelector('.button-down a');
  if (buttonDownLink) {
    buttonDownLink.addEventListener('click', function (event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const buttons = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  if (buttons.length > 0 && contents.length > 0) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => {
          content.style.display = 'none';
          content.style.opacity = '0';
        });

        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          targetContent.style.display = 'block';
          setTimeout(() => {
            targetContent.style.opacity = '1';
          }, 10);
        }
      });
    });
  }

  function changeBackgroundColor(index) {
    const caixa = document.querySelector('.caixa');
    const navbarLinks = document.querySelectorAll('.navbar li a');
    const navbar = document.querySelector('.navbar');
    const buttonUpLink = document.querySelector('.button-up a');

    let bgColor, textColor, borderColor, buttonColor, buttonBorderColor;

    switch (index) {
      case 0:
        bgColor = '#8fa8b2';
        textColor = '#ffffff';
        borderColor = '#ffffff';
        buttonColor = '#ffffff';
        buttonBorderColor = '#ffffff'; 
        break;
      case 1:
        bgColor = '#e0d087';
        textColor = '#333333';
        borderColor = '#333333';
        buttonColor = '#333333';
        buttonBorderColor = '#333333';
        break;
      case 2:
        bgColor = '#72604b';
        textColor = '#ffffff';
        borderColor = '#ffffff';
        buttonColor = '#ffffff'; 
        buttonBorderColor = '#ffffff';
        break;
      default:
        bgColor = '';
        textColor = '';
        borderColor = '';
        buttonColor = '';
        buttonBorderColor = ''; 
    }

    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;

    if (caixa) caixa.style.color = textColor;
    navbarLinks.forEach(link => {
      link.style.color = textColor;
    });
    if (navbar) navbar.style.borderBottom = `2px solid ${borderColor}`;
    if (buttonUpLink) {
      buttonUpLink.style.color = buttonColor; 
      buttonUpLink.style.border = `2px solid ${buttonBorderColor}`; 
    }
  }

  const resetBackgroundColors = () => {
    document.documentElement.style.backgroundColor = '';
    document.body.style.backgroundColor = '';
    document.body.style.color = '';

    const caixa = document.querySelector('.caixa');
    const navbarLinks = document.querySelectorAll('.navbar li a');
    const navbar = document.querySelector('.navbar');
    const buttonUpLink = document.querySelector('.button-up a');

    if (caixa) caixa.style.color = '';
    navbarLinks.forEach(link => {
      link.style.color = '';
    });
    if (navbar) navbar.style.borderBottom = '';
    if (buttonUpLink) {
      buttonUpLink.style.color = ''; 
      buttonUpLink.style.border = '';
    }

    buttonUp.classList.remove('card-clicked-0', 'card-clicked-1', 'card-clicked-2');
    isCardClicked = false;
  };

  if (buttonUp) {
    buttonUp.addEventListener('click', resetBackgroundColors);
  }
});

const carouselIndexes = {
  section1: 0,
  section2: 0,
  section3: 0
};


let autoSlideInterval = null;
function updateCarousel(sectionID) {
  const section = document.querySelector(`#${sectionID}`);
  if (!section) return;  // Add this check
  const items = section.querySelectorAll('.carousel-item');
  const numberElements = section.querySelectorAll('.slide-number');
  const textSections = section.querySelectorAll('.text-right');
  let currentIndex = carouselIndexes[sectionID];


  items.forEach((item, index) => {
      item.classList.remove('previous', 'next', 'active', 'hidden');
      if (index === currentIndex) {
          item.classList.add('active');
      } else if (index === (currentIndex - 1 + items.length) % items.length) {
          item.classList.add('previous');
      } else if (index === (currentIndex + 1) % items.length) {
          item.classList.add('next');
      } else {
          item.classList.add('hidden');
      }
  });
  numberElements.forEach((number, index) => {
    if (index === currentIndex) {
        number.classList.add('active');
    } else {
        number.classList.remove('active');
    }
});

textSections.forEach((section, index) => {
    section.classList.remove('fade-in');
    if (index === currentIndex) {
        section.style.display = 'block';
   
        void section.offsetWidth; 
        section.classList.add('fade-in');
    } else {
        section.style.display = 'none';
    }
});
}

function nextSlide(sectionID) {
  const section = document.querySelector(`#${sectionID}`);
  const items = section.querySelectorAll('.carousel-item');
  carouselIndexes[sectionID] = (carouselIndexes[sectionID] + 1) % items.length;
  updateCarousel(sectionID);
}

function prevSlide(sectionID) {
  const section = document.querySelector(`#${sectionID}`);
  const items = section.querySelectorAll('.carousel-item');
  carouselIndexes[sectionID] = (carouselIndexes[sectionID] - 1 + items.length) % items.length;
  updateCarousel(sectionID);
}

function goToSlide(slideIndex, sectionID) {
  const section = document.querySelector(`#${sectionID}`);
  const items = section.querySelectorAll('.carousel-item');
  if (slideIndex >= 0 && slideIndex < items.length) {
      carouselIndexes[sectionID] = slideIndex;
      updateCarousel(sectionID);
  }
}



function startAutoSlide(sectionID, button, buttonStyles) {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }

  button.style.backgroundColor = buttonStyles.activeBackground; 
  button.style.color = buttonStyles.activeColor; 
  
  autoSlideInterval = setInterval(() => {
    nextSlide(sectionID); 
  }, 3000);
}

function stopAutoSlide(button, buttonStyles) {

  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
  button.style.backgroundColor = buttonStyles.defaultBackground; 
  button.style.color = buttonStyles.defaultColor; 
}

function toggleAutoSlide(sectionID, button, buttonStyles) {
  if (autoSlideInterval) {
    stopAutoSlide(button, buttonStyles); 
  } else {
    startAutoSlide(sectionID, button, buttonStyles); 
  }
}

const buttonStyles1 = {
  defaultBackground: '', 
  defaultColor: '#fff',
  activeBackground: '#fff', 
  activeColor: '#8fa8b2', 
};

const buttonStyles2 = {
  defaultBackground: '',
  defaultColor: '#000', 
  activeBackground: '#43413a', 
  activeColor: '#e0d087', 
};

const buttonStyles3 = {
  defaultBackground: '', 
  defaultColor: '#fff', 
  activeBackground: '#fff', 
  activeColor: '#72604b', 
};

const autoSlide1Button = document.querySelector('.auto-slide1');
if (autoSlide1Button) {
  autoSlide1Button.addEventListener('click', (e) => {
    toggleAutoSlide('section1', e.target, buttonStyles1);
  });
}

const autoSlide2Button = document.querySelector('.auto-slide2');
if (autoSlide2Button) {
  autoSlide2Button.addEventListener('click', (e) => {
    toggleAutoSlide('section2', e.target, buttonStyles2);
  });
}

const autoSlide3Button = document.querySelector('.auto-slide3');
if (autoSlide3Button) {
  autoSlide3Button.addEventListener('click', (e) => {
    toggleAutoSlide('section3', e.target, buttonStyles3);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  updateCarousel('section1');
  updateCarousel('section2');
  updateCarousel('section3');
});


const BASE_URL = 'https://api.artic.edu/api/v1/artworks';
const VAN_GOGH_ARTWORK_ID = '28862';

async function fetchMasterpiece() {
      const response = await fetch(`${BASE_URL}/${VAN_GOGH_ARTWORK_ID}?fields=id,title,artist_display,date_display,image_id,description`);
      if (!response.ok) {
          throw new Error('Failed to fetch the artwork data');
      }
      const data = await response.json();
      const artwork = data.data;

      document.getElementById('artwork-title').innerText = artwork.title;
      const cleanDescription = artwork.description ? artwork.description.replace(/<\/?p>/g, '') : "Description not available.";
      document.getElementById('artwork-description').innerText = cleanDescription;

      if (artwork.image_id) {
          const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
          document.getElementById('artwork-image').src = imageUrl;
          document.getElementById('artwork-image').style.display = 'block';
      } else {
          document.getElementById('artwork-image').style.display = 'none';
          console.warn("Image not available for this artwork.");
      }
}
fetchMasterpiece();
