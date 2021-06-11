'use strict';
// ADD HTML
import templateFunction from './template/menu-template.hbs';
import cards from './menu.json';
import './sass/main.scss';

const menuRef = document.querySelector('.js-menu');
const cardsMarkup = createMenuCards(cards);

menuRef.insertAdjacentHTML('beforeend', cardsMarkup);

function createMenuCards(cards) {
  return cards.map(templateFunction).join('');
}

// SWITCH THEMES
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const bodyRef = document.querySelector('body');
const checkboxRef = document.querySelector('#theme-switch-toggle');

// set defaults
checkboxRef.checked = false;
applyDefaultTheme();

// checkbox listener
checkboxRef.addEventListener('change', checkboxChangeHandler);

function checkboxChangeHandler() {
  if (checkboxRef.checked) {
    bodyRef.classList.add(Theme.DARK);
    bodyRef.classList.remove(Theme.LIGHT);
  } else {
    bodyRef.classList.remove(Theme.DARK);
    bodyRef.classList.add(Theme.LIGHT);
  }
  saveThemeToLocalStorage();
}

// local storage
function saveThemeToLocalStorage() {
  localStorage.setItem('theme', bodyRef.getAttribute('class'));
}

function applyDefaultTheme() {
  const localStorageTheme = localStorage.getItem('theme');

  // apply default theme
  if (localStorageTheme == null) {
    bodyRef.classList.add = Theme.LIGHT;
  } else {
    bodyRef.className = '';
    bodyRef.classList.add(localStorageTheme);
  }

  // setup checkbox state
  if (localStorageTheme === Theme.DARK) {
    checkboxRef.checked = true;
  }
}
