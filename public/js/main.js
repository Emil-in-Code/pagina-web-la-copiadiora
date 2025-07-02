
const presupuestarBtn = document.getElementById('presupuestar-btn');

presupuestarBtn.addEventListener('mouseover', function() {
  if (presupuestarBtn.textContent === 'Presupuestar Gratis') {
    presupuestarBtn.textContent = 'Tu tiempo es hoy';
  } else {
    presupuestarBtn.textContent = 'Presupuestar Gratis';
  }
});

presupuestarBtn.addEventListener('mouseout', function() {
    if (presupuestarBtn.textContent === 'Tu tiempo es hoy') {
      presupuestarBtn.textContent = 'Presupuestar Gratis';
    }
});

