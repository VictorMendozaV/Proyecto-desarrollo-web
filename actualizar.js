


window.onload = function(){  

class players{

    constructor(name , score , time) {
        this._name = name;
        this._score = score;
        this._time = time;
 
    }


    get Name(){
        return this._name;
    }

    get  Score(){
        return  this._score;
    }

    get Time(){
        return this._time;
    }

    set Name(name){
        this._name = name;
    }

    set Score(score){
        this._score = score;
    }

    set Time(time){
        this._time = time;
    }
}





let n = localStorage.getItem('name');
let sc = localStorage.getItem('score');
let  t = localStorage.getItem('time');

 
let p  = new players( n, sc, t);



   
    document.getElementById("printName").innerHTML = p.Name + " tu puntuacion es: ";
    document.getElementById("printScore").innerHTML = p.Score;
    document.getElementById("printTime").innerHTML =" tiempo: "+ p.Time;

}