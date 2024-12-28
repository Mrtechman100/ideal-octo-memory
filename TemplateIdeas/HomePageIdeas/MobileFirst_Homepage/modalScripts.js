var chocolatechipmodal = document.getElementById('chocolatechip-modal');
var chocolatechipModalBtn = document.getElementById('open-chocolatechip-modal');
var chocolatechipSpan = document.getElementsByClassName('close-chocolatechip')[0];

chocolatechipModalBtn.onclick = function() {
  chocolatechipmodal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

chocolatechipSpan.onclick = function() {
  chocolatechipmodal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

var pumpkinmodal = document.getElementById('pumpkin-modal');
var pumpkinModalBtn = document.getElementById('open-pumpkin-modal');
var pumpkinSpan = document.getElementsByClassName('close-pumpkin')[0];

pumpkinModalBtn.onclick = function() {
  pumpkinmodal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

pumpkinSpan.onclick = function() {
  pumpkinmodal.style.display = 'none';
  document.body.style.overflow = 'auto';
}