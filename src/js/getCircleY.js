// Функция принимает параметром строку координат пружины и возвращает последнюю координату Y -  центр груза
export function getCircleY(spring) {
        let springArr = spring.split(' ');
        let points = springArr[springArr.length - 1];
        let y = points.split(',');
   return y[1];
}