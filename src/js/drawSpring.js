// Функция получает массив точек пружины и возвращает измененный на дельту x0
export function drawSpring(x0, springArray) {

    let polyline = [springArray[0], springArray[1]];

    for (let i = 2; i < springArray.length; i++){
        let pointArray = springArray[i].split(',');
        let newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + parseInt(x0));

        if(i < 4){
            newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + x0/4);
            polyline.push(newPoint);
        }
        if(i >= 4 && i < 6){
            newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + x0/2);
            polyline.push(newPoint);
        }
        if(i >= 6){
            newPoint = pointArray[0] + ',' + Math.trunc(parseInt(pointArray[1]) + parseInt(x0));
            polyline.push(newPoint);
        }
    }

    return polyline.join(' ');
}