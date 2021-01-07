const mrCat = function (howmanyTimes) {
    for (var i = 0; i < howmanyTimes; i++) {
         console.log( i + "Cool cat");
    }
};

mrCat(10);

var numberOfSiblings = 30 + 30;
var numberOfCandies = 60;
console.log(numberOfCandies * numberOfSiblings);

var secondsInMinute = 60;
var minutesInAnHour = 60;
var secondsInAnHour = secondsInMinute * minutesInAnHour;
console.log(secondsInAnHour);

var hoursInADay = 24;
var secondsInADay = secondsInAnHour * hoursInADay;
console.log(secondsInADay);

var daysInAYear = 365;
secondsInAYear = secondsInADay * daysInAYear;
console.log(secondsInAYear);

var arsenyAge = 11;
secondsInAnAge = arsenyAge * secondsInAYear;
console.log(secondsInAnAge);

var name = "arseny";
console.log(name[5]);

var code1 = "are";
var  code2 = "tubas";
var code3 = "unsafe";
var code4 = "?!";
console.log(code1[1] + code2[1] + code3[1] + code4[1]);

var string = "my long string is long";
console.log(string.slice(3, 14));
console.log(string.slice(0, 14));

var beautifulDay = "my beautiful day is realy beautiful";
console.log(beautifulDay.slice(3, 17));

var hello = "Hello there, how are you doing?";
console.log(hello.toUpperCase());

var sillyString = "hELLO THERE, HOW ARE YOU DOING?";
console.log(sillyString.slice(0, 1).toUpperCase() + sillyString.slice(1, 30).toLowerCase());

var javaScriptIsCool = true;
var javaScriptIsntCool = false;
 console.log(javaScriptIsntCool);
 console.log(javaScriptIsCool);

if (!javaScriptIsCool && !javaScriptIsntCool) {
    console.log('All fine');
} else {
    console.log('False is here');
}

var hadShower = true;
var hasBackpack = true;
console.log(hadShower && hasBackpack);

var hasApple = true;
var hasTomato = false;
console.log(hasApple || hasTomato);

var isWeekend = true;
var needToShowerToday = !isWeekend;
var isWeekent = false;
var needToShowerTodai = !isWeekent;
console.log(!needToShowerToday && needToShowerTodai);

var isWeekend = false;
var hadShower = true;
var hasApple = false;
var hasOrange = true;
var shoudGoToSchool = !isWeekend && hadShower && hasApple || hasOrange;
console.log(shoudGoToSchool);

var height = 74;
var heightRestriction = 60;
console.log(height <= heightRestriction);

var mySecretNumber = 5;
var chicoGuess = 3;
console.log(mySecretNumber === chicoGuess);
var harpoGuess = 7;
console.log(mySecretNumber === harpoGuess);
var grouchoGuess = 5;
console.log(mySecretNumber === grouchoGuess);

var stringNumber = "5";
var actuaJNumber = 5;
console.log(stringNumber == actuaJNumber);

var age = 15,
    accompanied = false;

if (age >= 13) {
    console.log("Welcome!");
} else if (age < 13 && accompanied === true) {
    console.log("Welcome frends!");   
} else {
    console.log("Go away!!!"); 
}

















// const btn = document.querySelector('button'),
//       text = document.querySelector('.text');

// var stringArseny = 'Ваш промокод - 5511';
// btn.addEventListener('click', () => {
//     console.log(stringArseny);

//     const promo = document.createElement('div');
//     promo.textContent = stringArseny;
//     promo.classList.add('promo');
//     document.querySelector('body').appendChild(promo);
// });