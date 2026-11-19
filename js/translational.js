'use strict';
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const studentSection = document.querySelector('#students');
if (studentSection) {
  const tablist = studentSection.querySelector('.student-tabs');
  const tabs = [...tablist.querySelectorAll('button')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

  function selectStudentTab(index, focus = false) {
    tabs.forEach((tab, position) => {
      const selected = position === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[position].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  }

  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-orientation', 'vertical');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => selectStudentTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectStudentTab(next, true);
      }
    });
  });

  function selectHashPanel() {
    const target = document.getElementById(location.hash.slice(1));
    const index = panels.findIndex(panel => panel === target || panel.contains(target));
    if (index >= 0) selectStudentTab(index);
  }

  selectStudentTab(0);
  tablist.hidden = false;
  studentSection.classList.add('student-tabs-ready');
  selectHashPanel();
  window.addEventListener('hashchange', selectHashPanel);
}
