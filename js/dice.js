class Dice{
    constructor(container){
        this.container=container;
        this.container.classList.add("dice");
        //create an image in the container:
        this.face=this.createFace(); //this will allow us acces to change the image
        this.value=1;
        this.locked=false;
    };

    get value(){
        return this._value;
    };

    set value(val){
        if(val<1||val>6){
            console.error("Invalid value set for dice: "+val);
            return;
        };
        this._value=val;
        this.face.src=`images/dice-${val}.svg`;
    };
    createFace(){
        let face=document.createElement("img");
        this.container.append(face);
        return face;
    }
    /**
     * Changes the face and value of the dice for a set period of time
     * @param {*} params  `{rollTime, speed}`. rollTime is how long in milliseconds.
     * `speed` is how frequently the face changes (lower is faster)
     * eg. `{rollTime: 1000, speed: 50}` those are defaults
     * @returns promise to be resolved when intervals are over
     */
    roll(params={}){
        if(this.locked) return; //locked, don't roll
        //destructure the object:
        let {rollTime, speed}=params; //eg {rollTime: 2000, speed: 25}
        //so if params is an object with rollTime and/ or speed, we will put those values in the
        //appropriate variable (same name)
        return new Promise((resolve)=>{
            let roller=setInterval(
                ()=>{
                    this.value=Math.floor(Math.random()*6)+1;
                },
                speed ? speed: 50,
            ); //could shorten further 
            setTimeout(()=>{
                clearInterval(roller);
                resolve();
            }, rollTime ?? 1000); //same as rollTime ? rollTime: 1000
        });
    };

    addClickHandler(){
        this.container.addEventListener("click", ()=>{
            this.container.classList.toggle("locked");
            this.locked=!this.locked;
        });
    };
};