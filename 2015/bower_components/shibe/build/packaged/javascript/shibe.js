$(document).ready(function(){
    var dot = document.getElementById('dot');
    var once = false;
    dot.onclick = function(event) {
        if (!once) {
            var rect = dot.getBoundingClientRect();
            var x = event.x;
            var y = event.y;
            var img = document.createElement('img');
            img.style.zIndex = 1;
            img.style.position = 'fixed';
            img.style.top = y + 'px';
            img.style.left = x + 'px';
            img.style.width = 1 + 'px';
            img.style.height = 1 + 'px';
            img.src = 'assets/images/doge.jpg';
            img.style.transition = 'all 5s ease';
            $('body').prepend(img);
            setTimeout(function() {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.top = 0;
                img.style.left = 0;
            }, 1000);
            setTimeout(function() {
                if (Math.random() < 0.85) {
                    var options = [
                        'https://medium.com/hackmit-2014/joining-the-fancycat-club-hackmit-14-puzzle-guide-6f4ebef5b69',
                        'http://www.amazon.com/s/field-keywords=puzzles',
                        'https://nodejs.org/',
                        'http://www.shibarescue.org/',
                        'https://www.google.com/search?q=dog%20toys',
                    ];
                    window.location = options[Math.floor(Math.random() * 1000000) % options.length];
                } else {
                    window.location = 'http://dogemit.party';
                }
            }, 10000);

            once = true;
        }
    };
});
