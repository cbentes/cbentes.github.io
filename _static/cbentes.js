
var ga_script = document.createElement('script');
ga_script.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=G-SJ3VEG6NXY');
document.head.appendChild(ga_script);

function load_ga_tag() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SJ3VEG6NXY');
}

load_ga_tag();
