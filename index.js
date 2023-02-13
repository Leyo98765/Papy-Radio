// Import des bibliothèques nécessaires
const Gpio = require('onoff').Gpio;
const fs = require('fs');

// Import des radios à partir du fichier JSON
let rawdata = fs.readFileSync('radios.json');
let radios = JSON.parse(rawdata).radios;

// Initialisation de la variable pour stocker l'index de la radio actuelle
let currentRadioIndex = 0;

// Initialisation des ports GPIO pour les signaux de l'encodeur rotatif
const gpioRotaryA = new Gpio(38, 'in', 'both');
const gpioRotaryB = new Gpio(36, 'in', 'both');
const gpioRotarySw = new Gpio(34, 'in', 'both');

// Fonction pour jouer la radio précédente
function playPreviousRadio() {
  currentRadioIndex--;
  if (currentRadioIndex < 0) {
    currentRadioIndex = radios.length - 1;
  }
  playRadio(radios[currentRadioIndex].url);
}

// Fonction pour mettre en pause ou jouer la radio actuelle
function playPauseRadio() {
  // Mettre en pause ou jouer la radio en utilisant l'API Volumio
  // ...
}

// Ecouter les signaux de l'encodeur rotatif
gpioRotaryA.watch((err, value) => {
  // Si le signal A change de valeur
  if (value !== 0) {
    // Lire la radio suivante
    playPreviousRadio();
  }
});

gpioRotaryB.watch((err, value) => {
  // Si le signal B change de valeur
  if (value !== 0) {
    // Lire la radio suivante
    playNextRadio();
  }
});

gpioRotarySw.watch((err, value) => {
  // Si le signal de l'interrupteur change de valeur
  if (value === 0) {
    // Mettre en pause ou jouer la radio actuelle
    playPauseRadio();
  }
});

// Jouer la première radio à l'ouverture du plugin
playRadio(radios[0].url);
