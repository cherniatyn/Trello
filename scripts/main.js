;(function() {
    var cards = [];
    var group = document.getElementsByClassName('group')[0];
    
    console.log(group);

    group.innerHTML = `
    <span class="header">header</span>
    <span class="footer">footer</span>`

    // group.appendChild(`<div class="card"></div>`);
})();