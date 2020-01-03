let result = document.getElementById('result');

document.getElementById("generate-names").addEventListener('submit', function(e) {
    e.preventDefault();
    result.innerHTML = '';
    console.clear();
    var country = document.getElementById('country').value;
    var gander = document.getElementById('gander').value;
    var quantity = document.getElementById('quantity').value;

    var mainUrl = "https://uinames.com/api/?";
    if (country !== '') {
        mainUrl += "region=" + country + "&";
    }
    if (gander !== '') {
        mainUrl += "gender=" + gander + "&";
    }
    if (quantity !== '') {
        mainUrl += "amount=" + quantity + "&";
    }


    let xhr = new XMLHttpRequest();
    xhr.open('get', mainUrl, true);
    xhr.onload = function() {
        if (this.status === 200) {
            let responce = JSON.parse(this.responseText);
            let html = document.createElement('ul');
            html.classList = "list";
            responce.forEach(function(data) {
                html.innerHTML += `<li>${data.name}</li>`;
                // console.log(data.name);

            });
            result.appendChild(html);
        }
    }
    xhr.onloadstart = function() {
        let img = document.createElement('img');
        img.classList = "aun";
        img.src = "spinner.gif";
        img.width = 250;
        result.appendChild(img);
        console.log("Loading...  status  " + this.status);
    }
    xhr.onloadend = function() {
        let img = document.querySelector('.aun').remove();
        console.log("Recived...  status  " + this.status);
    }
    xhr.send();
});