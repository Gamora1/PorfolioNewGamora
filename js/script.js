// Тема сайта

const bodyClass = document.getElementsByClassName('dark-theme');
document.getElementById('btn-change-theme').addEventListener('change', function () {
    console.log(bodyClass.length);
    document.body.classList.toggle('dark-theme');
});


// ШАПКА
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu__link');
    const sections = document.querySelectorAll('div[id]');
    
    // Функция для проверки видимости блока
    function isElementInView(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight / 3 && 
            rect.bottom >= window.innerHeight / 3
        );
    }
    
    // Обновление активной ссылки
    function updateActiveMenu() {
        let foundActive = false;
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.menu__link[href="#${sectionId}"]`);
            
            if (isElementInView(section) && !foundActive) {
                // Удаляем active у всех ссылок
                menuLinks.forEach(link => link.classList.remove('active'));
                // Добавляем active к текущей
                correspondingLink.classList.add('active');
                foundActive = true;
            }
        });
        
        // Если ни один блок не виден (например, в самом верху)
        if (!foundActive && window.scrollY === 0) {
            menuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.menu__link[href="#home"]').classList.add('active');
        }
    }
    
    // Обработчик скролла с троттлингом для оптимизации
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            updateActiveMenu();
        }, 50);
    }, false);
    
    // Плавная прокрутка при клике
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Инициализация при загрузке
    updateActiveMenu();
});
// Главное окно с текстом



const words = [" веб-приложения.", " сайты-визитки.", " API.", " Desktop-приложения.", " Дизайн проекта."];
let currentWordIndex = 0;
let currentCharIndex = 0;
let outputText = "";

function printChar() {
  // Если не дошли до конца текущего слова
  if (currentCharIndex < words[currentWordIndex].length) {
    outputText += words[currentWordIndex][currentCharIndex];
    document.getElementById("output").innerHTML = outputText;
    currentCharIndex++;
    setTimeout(printChar, 200); // Скорость печати символов
  } 
  else {
    // Пауза после завершения слова
    setTimeout(() => {
      // Переход к следующему слову
      currentWordIndex = (currentWordIndex + 1) % words.length;
      currentCharIndex = 0;
      outputText = "";
      document.getElementById("output").innerHTML = "";
      // Начинаем печатать следующее слово
      printChar();
    }, 1000); // Пауза между словами
  }
}

// Запускаем анимацию
printChar();

// Круг Scoll For More
// Для управления скоростью вращения при скролле
const rotatingCircle = document.querySelector('.rotating-circle');
let rotationSpeed = 1;

window.addEventListener('scroll', () => {
  // Увеличиваем скорость при скролле
  rotationSpeed = 1 + window.scrollY * 0.01;
  rotatingCircle.style.animationDuration = `${20 / rotationSpeed}s`;
});

// Перезапуск анимации стрелки для плавности
const arrow = document.querySelector('.center-arrow');
setInterval(() => {
  arrow.style.animation = 'none';
  setTimeout(() => arrow.style.animation = 'bounce 2s infinite', 10);
}, 2000);



// Градиент

const randomX = random(-400, 400);
const randomY = random(-200, 200);
const randomDelay = random(0, 50);
const randomTime = random(20, 40);
const randomTime2 = random(5, 12);
const randomAngle = random(-30, 150);

const blurs = gsap.utils.toArray(".blur");
blurs.forEach((blur) => {
gsap.set(blur, {
    x: randomX(-1),
    y: randomX(1),
    rotation: randomAngle(-1)
});

moveX(blur, 1);
moveY(blur, -1);
rotate(blur, 1);
});

function rotate(target, direction) {
gsap.to(target, randomTime2(), {
    rotation: randomAngle(direction),
    ease: Sine.easeInOut,
    onComplete: rotate,
    onCompleteParams: [target, direction * -1]
});
}

function moveX(target, direction) {
gsap.to(target, randomTime(), {
    x: randomX(direction),
    ease: Sine.easeInOut,
    onComplete: moveX,
    onCompleteParams: [target, direction * -1]
});
}

function moveY(target, direction) {
gsap.to(target, randomTime(), {
    y: randomY(direction),
    ease: Sine.easeInOut,
    onComplete: moveY,
    onCompleteParams: [target, direction * -1]
});
}

function random(min, max) {
const delta = max - min;
return (direction = 1) => (min + delta * Math.random()) * direction;
}
