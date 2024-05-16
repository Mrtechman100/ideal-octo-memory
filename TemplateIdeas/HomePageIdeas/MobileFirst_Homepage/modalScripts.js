var modal = document.getElementById('modal');
var modalBtn = document.getElementById('open-modal');
var span = document.getElementsByClassName('close')[0];

modalBtn.onclick = function() {
  modal.style.display = 'block';
}

span.onclick = function() {
  modal.style.display = 'none';
}