




class players{

    players(name, score, time){
        this._name = name;
        this._score = score;
        this._time  = time; 
    }


    get Name(){
         console.log("entra name: "+this._name);
        return this._name;; 
    }

    get  Score(){
        console.log("entra score: "+this._score);
        return  this._score;;
    }

    get Time(){
        console.log("entra time: "+this._time);
        return this._time;;
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






let n = localStorage.getItem("name");
let sc = localStorage.getItem("score");
let  t = localStorage.getItem("time");

 
 

window.onload = function(){  

    let p  = new players( n, sc, t);
    document.getElementById("printScore").innerHTML = p.Name + " tu puntuacion es: ";
    document.getElementById("printName").innerHTML = p.Score;
    document.getElementById("printTime").innerHTML =" tiempo: "+p.Time;

}