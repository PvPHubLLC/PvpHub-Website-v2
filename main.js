var PLAYER_COUNT = 0;

function scrollToSection(sec) {
    var x = document.getElementById(sec);
    x.scrollIntoView();
}

function topbar() {
    var x = document.getElementById("#header");
    if (x.className === "header") {
        x.className += " responsive";
    } else {
        x.className = "header";
    }
}

window.addEventListener("load", () => {
    var copyIp = document.getElementsByClassName("_ip");
    for (link of copyIp) {
        link.addEventListener("click", (e) => {
            if (link.innerHTML === "Copied IP") return;
            var before = link.innerHTML;
            link.innerHTML = "Copied IP"
            let copy = document.createElement("textarea");
            copy.style.position = "absolute";
            copy.style.left = "-99999px";
            copy.style.top = "0";
            copy.setAttribute("id", "ta");
            document.body.appendChild(copy);
            copy.textContent = "pvphub.me";
            copy.select();
            document.execCommand("copy");
            setTimeout(() => {
                link.innerHTML = before;
                var copy = document.getElementById("ta");
                copy.parentNode.removeChild(copy);
            }, 1000)
        })
    }
})

function onPlayerCountUpdate() {
    document.getElementById("#jointoday").innerHTML = `Join ${PLAYER_COUNT} players now`
}

const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
        if (result.hasOwnProperty('online')) {
            PLAYER_COUNT = result.online
            onPlayerCountUpdate();
        } else {
            PLAYER_COUNT = "Server isn't online!"
        }
    });
    setTimeout(() => {
        updatePlayercount("pvphub.me", 25565);
    }, 30000)
};
updatePlayercount("pvphub.me", 25565);

$(window).scroll(function () {

    // selectors
    var $window = $(window),
        $body = $('#bg'),
        $panel = $('section');

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 8);

    $panel.each(function () {
        var $this = $(this);

        // if position is within range of this panel.
        // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
        // Remember we set the scroll to 33% earlier in scroll var.
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

            // Remove all classes on body with color-
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
            });

            // Add class of currently active div
            $body.addClass('bg-' + $(this).data('color'));
        }
    });

}).scroll();

function openUrl(url) {
    window.open(url, "_blank");
}