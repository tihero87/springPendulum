import './styles/main.scss'
import './styles/visual.scss'
import './styles/input.scss'
import './styles/chatacteristic.scss'
import { drawSpring } from './js/drawSpring';
import { drawPeace } from "./js/drawPeace";
import { getCircleY } from "./js/getCircleY";

const weight = document.getElementById('weight');           // масса груза (m)
let m = weight.value;

const rigidity = document.getElementById('rigidity');       // жесткость пружины (k)
let k = rigidity.value;

const delta = document.getElementById('delta');             // амплитуда, начальное отклонение пружины от равновесия
let x0 = delta.value;

const spring = document.getElementById('polyline');
let points = spring.getAttribute('points');              // координаты пружины
let springPointsPeace = drawPeace(x0, points);                       // координаты не растянутой пружины в состоянии покоя при x==0

const circle = document.getElementById('circle');           // круг (груз)
let circle_cy = circle.getAttribute('cy');               // Начальная координата центра шара по оси Y

let radius = Math.cbrt(m * 100000) / 2;                           // радиус груза

let T = 2 * Math.PI / Math.sqrt(k/m);                             // Период колебаний
const time = document.getElementById('time');               // Время колебаний

const charact_count = document.getElementById('count');
let count = 0;                                                       // количество циклов колебания

const charact_w0 = document.getElementById('w0');           // циклическая частота собственных колебаний
charact_w0.innerText = hesitation();

const charact_x = document.getElementById('x');             // координата положение груза относительно положения равновесия

// циклическая частота
function hesitation() {
    let w0 = Math.sqrt(k / m);
    return w0.toLocaleString();
}

weight.addEventListener('change', () => {
    m = weight.value;
    radius = Math.cbrt(m * 100000) / 2;                                             // радиус груза
    spring.setAttribute('points', points);
    circle_cy = getCircleY(points);                                                     // получить хвост пружины (последнюю координату пружины)
    circle.setAttribute('cy', (parseInt(circle_cy) + radius).toString());   // красиво сдвинем шар по оси Y
    circle.setAttribute('r', radius.toString());
    T = 2 * Math.PI / Math.sqrt(k/m);
    charact_w0.innerText = hesitation();
});

rigidity.addEventListener('change', () => {
    k = rigidity.value;
    T = 2 * Math.PI / Math.sqrt(k/m);
    charact_w0.innerText = hesitation();
});

delta.addEventListener('change', () => {
    x0 = delta.value;
    points = drawSpring(x0, springPointsPeace);
    spring.setAttribute('points', points);
    circle_cy = getCircleY(points);
    circle.setAttribute('cy', (parseInt(circle_cy) + radius).toString());
});

// ********* Блок анимации пружины ************** //
let myAnimation;
let timeStart;              // время начала анимации
let timePassed;             // времени прошло с момента запуска анимации
let stop = false;           // флаг нажатия кнопки стоп, нужна для остановки Интервала и фиксации координаты X в момент времени нажатия

function springAnimation() {

    let coord_X;                                                // координата груза в момент времен t относительно состояния покоя

    let timer = setInterval(function () {
        timePassed = (new Date() - timeStart) / 1000;          // сколько времени прошло с начала анимации в ms

        if(timePassed > T * 1000 || stop === true){            // если времени прошло больше чем период, то удавяем интервал
            clearInterval(timer);
            return;
        }
        coord_X = x0 * Math.cos(Math.sqrt(k / m) * timePassed);      // формура уравнения незатухающих колебаний (из мат модели)
        charact_x.innerText = coord_X.toFixed(2) + ' см.';      // положение груза относительно состояния покоя + -
        time.innerText = (timePassed).toFixed(1) + ' сек.';     // время
        count = timePassed / T;                                             // количество колебаний
        charact_count.innerText = Math.trunc(count).toString();             // количество полных колебаний - вывод в окно характеристик
        draw(coord_X);                                                      // перерисовывыаем пружину в новой точке
    }, 20)
}

// Принимает координату X (отклонение +- от состояния равновесия) и перерисовывает пружину с грузом
function draw(x) {
    let newPoints = drawSpring(x, springPointsPeace);
    spring.setAttribute('points', newPoints);
    circle_cy = getCircleY(newPoints);
    circle.setAttribute('cy', (parseInt(circle_cy) + radius).toString());
}

function startAnimation() {
    if(parseInt(x0) !== 0){                                                 // Не запускаем анимацию если пружина в состоянии покоя - не оттянута вниз
        if (button.innerText.toLocaleUpperCase() === 'PLAY') {
            stop = false;
            timeStart = new Date();
            springAnimation(T*1000);
            myAnimation = setInterval(springAnimation, T * 1000);
            button.innerText = 'STOP';

            weight.setAttribute('disabled', 'disabled');    // Блокируем возможность менять параметры во время анимации
            rigidity.setAttribute('disabled', 'disabled');
            delta.setAttribute('disabled', 'disabled');

            charact_count.innerText = '0';
            time.innerText = '0.0 сек.';
            charact_x.innerText =  '0.00 см.';

        } else if (button.innerText.toLocaleUpperCase() === 'STOP') {
            stop = true;
            button.innerText = 'PLAY';
            clearInterval(myAnimation);

            weight.removeAttribute('disabled');
            rigidity.removeAttribute('disabled');
            delta.removeAttribute('disabled');
            count = 0;
        }
    }
}

const button = document.getElementById('btn_play');
button.addEventListener("click", startAnimation);







