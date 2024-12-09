class Game {
    constructor() {
      // use the querySelectors as properties of the class
      this.easy = document.querySelector(".mode");
      this.hard = document.querySelector(".selected");
      this.mode = 0;
      this.container = document.querySelector("#container");
      this.span = document.querySelector("#color-display");
      this.reset = document.querySelector("#reset");
      this.h1 = document.querySelector("h1");
  
      //Methoden binden
      /* Es ist für eine Methode nicht wichtige wann sie definiert wird, sondern wo sie aufgerufen wird.
      Wenn man ein Event auslöst und dann .this benutzt, dann bezieht sich das .this nicht mehr auf die class, sondern auf das Element, welches das Event auslöst.
      Daher sollte man im constructor das .this in den Methoden an die Klasse binden
       */
      this.startNewGame = this.startNewGame.bind(this);
      this.setEasy = this.setEasy.bind(this);
      this.setHard = this.setHard.bind(this);
      this.disappearSquare = this.disappearSquare.bind(this);
  
      this.setRGB = this.findRGB();
  
      this.setListeners();
    }
  
    // add the EventListeners to the elements and initalize this method in the constructor -> so they work from the beginning
    setListeners() {
      this.hard.addEventListener("click", this.setHard);
      this.easy.addEventListener("click", this.setEasy);
      this.reset.addEventListener("click", this.startNewGame);
      this.h1.style.backgroundColor = this.findRGB();
    }
  
    // select random rgb
    findRGB() {
      const rgb1 = Math.floor(Math.random() * 255);
      const rgb2 = Math.floor(Math.random() * 255);
      const rgb3 = Math.floor(Math.random() * 255);
      return `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
    }
  
    //if the clicked square (event.target) is the same as setRGB the game is finished
    // otherwise the clicked square (event.target) disappears
    disappearSquare(event) {
      if (event.target.style.backgroundColor === this.setRGB) {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
          square.style.background = this.setRGB;
        });
      } else {
        event.target.style.opacity = "0";
      }
    }
  
    // starts the game
    startNewGame() {
      // set new RGB each turn
      this.setRGB = this.findRGB();
      const randomIndex = Math.floor(Math.random() * this.mode) + 1;
      const squares = document.querySelectorAll(".square");
  
      squares.forEach((square) => {
          // each square gets its opacity back
        square.style.opacity = 1;
        // each square gets a random color
        square.style.backgroundColor = this.findRGB();
  
        // remove the old EventListeners
        square.removeEventListener("click", this.disappearSquare);
        // and add them immediately 
        square.addEventListener("click", this.disappearSquare);
      });
  
      // sanity log
      console.log(this.setRGB, randomIndex);
  
      //give one random square the setRGB
      this.container.children[randomIndex].style.backgroundColor = this.setRGB;
  
      this.span.textContent = this.setRGB;
  
      //check which mode is given
      if (this.mode === 2) {
        this.setEasy();
      } else {
        this.setHard();
      }
    }
  
    setEasy() {
      //disappear more than 3 squares
      for (let i = 0; i < 6; i++) {
        if (i < 3) {
          this.container.children[i].style.opacity = 1;
        } else {
          this.container.children[i].style.opacity = 0;
        }
      }
  
      // set mode to the class and classes to the HTML
      this.mode = 2;
      this.easy.classList.add("selected");
      this.hard.classList.remove("selected");
    }
  
    setHard() {
      const squares = document.querySelectorAll(".square");
      squares.forEach((square) => (square.style.opacity = 1));
  
      // set mode to the class and classes to the HTML
      this.mode = 5;
      this.hard.classList.add("selected");
      this.easy.classList.remove("selected");
    }
  }
  
  const game = new Game();
  
  game.startNewGame();
  

//Kommentar