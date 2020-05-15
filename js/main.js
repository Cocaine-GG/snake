//создал поле
const N = 10;
let field = document.createElement('div')
document.body.appendChild(field);
field.classList.add('field');
// змея яблоко
let snake = [
	[5,4],
	[6,4],
	[7,4]
];
let appele = false;
let lastMove = 'up';
let play = true;
let speed = 220;



// увеличение скорости
minusSpeed();
function minusSpeed(){
	if(speed>120){
		speed = speed-20;
		console.log(speed);
		setTimeout(minusSpeed,10000);
	};
};
// рандомное появление яблока на поле
function createAppel() {
	let x = Math.floor(Math.random()*N);
	let y = Math.floor(Math.random()*N);
	let isSnake = false;
	for(let key in snake){
		if(snake[key][0] == y && snake[key][1] == x){
			isSnake = true;
			break;
		}
	}
	if(isSnake){
		createAppel();
	}else{
		appele = [y,x];
	}
};
// Прорисовует заново поле с новыми координатами змеи. Создает эффект движения
function draw(){
	if(!play){
		document.getElementById("wrapper").style.display='block'; //делает видимым модальное окно
		return false; //Останавливает функцию Не дает начать играть пока не поменяется значение Play
	}
	if(!appele){
		createAppel()
	}
	let html = '';
	let snakeClass = '';
	for (let y = 0; y < N; y++) {
		html +='<div class="row">';
		for (let x = 0; x < N; x++) {
			snakeClass = '';
			for (let s = 0; s < snake.length; s++){
				if (snake[s][0] == y && x == snake[s][1]) {
					snakeClass = 'snake';
					break;
				}
			}
			if(appele[0] == y && appele[1] == x){
				snakeClass += ' appele ';
			}
			html +='<div x="'+x+'" y="'+y+'" class="cell '+snakeClass+'"></div>	';
		};
		html +='</div>';
	}
	$('.field').html(html);
	setTimeout(direct,speed); //Автоматическая прорисовка
};
//Рестар игры
function refresh(){
	window.location.reload();
}
// Добавляем движение, нажатие кнопки вызвает функцию draw() которая прорисовует поле с новыми координатами
function up(){
    let newItem = cloneArray(snake[0]);
    newItem[0] = (newItem[0] - 1 < 0) ? N - 1 : --newItem[0];
    if(!isAppele(newItem)){
        snake.pop();
        isSnake(newItem);
    }else{
        appele = false;
    }
    snake.unshift(newItem);
    draw();
}
function down(){
    let newItem = cloneArray(snake[0]);
    newItem[0] = (newItem[0] + 1 >= N) ? 0 : ++newItem[0];
    if(!isAppele(newItem)){
        snake.pop();
        isSnake(newItem);
    }else{
        appele = false;
    }
    snake.unshift(newItem);
    draw();
}
function right(){
    let newItem = cloneArray(snake[0]);
    newItem[1] = (newItem[1] + 1 >= N) ? 0 : ++newItem[1];
    if(!isAppele(newItem)){
        snake.pop();
        isSnake(newItem);
    }else{
        appele = false;
    }
    snake.unshift(newItem);
    draw();
}
function left(){
    let newItem = cloneArray(snake[0]);
    newItem[1] = (newItem[1] - 1 < 0) ? N - 1 : --newItem[1];
    if(!isAppele(newItem)){
        snake.pop();
        isSnake(newItem);
    }else{
        appele = false;
    }
    snake.unshift(newItem);
    draw();
}
function isAppele(newItem){
	return (newItem[0] == appele[0] && newItem[1] == appele[1]) ? true : false;
}
function isSnake(newItem) {
    for(let key in snake){
        if(newItem[0] == snake[key][0] && newItem[1] == snake[key][1]){
            play = false;
            break;
        }
    }
}
// Нажатие кнопки вызывает функцию движения
$(document).keydown(function(event){
	if (event.keyCode == 87 && lastMove !== 'down') {
		lastMove = 'up';
		// up();
	}else if (event.keyCode == 68 && lastMove !== 'left') {
		lastMove = 'right';
		// right();
	}else if (event.keyCode == 83 && lastMove !== 'up') {
		lastMove = 'down';
		// down();
	}else if (event.keyCode == 65 && lastMove !== 'right') {
		lastMove = 'left';
		// left();
	}
});
//Добавляем движение змейке
function direct(){
    if(lastMove == 'up'){
        up();
    }else if(lastMove == 'down'){
        down();
    }else if(lastMove == 'left'){
        left();
    }else if(lastMove == 'right'){
        right();
    }
};
direct();
//Клоннируем эллемент змеи
function cloneArray(arr){
	return [
		arr[0],
		arr[1]
	]
}