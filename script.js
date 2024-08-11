var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
});

function skewCircle () {
    var scaleX = 1;
    var scaleY = 1;

    var prevX = 0;
    var prevY = 0;

    window.addEventListener("mousemove", function (coordinate) {
        clearTimeout(timeout);

        prevX = coordinate.clientX;
        prevY = coordinate.clientY;

        scaleX = gsap.utils.clamp(0.8, 1.2, coordinate.clientX - prevX);
        scaleY = gsap.utils.clamp(0.8, 1.2, coordinate.clientY - prevY);

        circleMouseFollow(scaleX, scaleY);

        timeout = setTimeout(() => {
            const circle = document.querySelector("#mini-circle");
            const circleSize = circle.offsetWidth / 2;
            document.querySelector(
                "#mini-circle"
            ).style.transform = `translate(${coordinate.clientX - circleSize}px, ${coordinate.clientY - circleSize}px) scaleX
            1, 1)`;
        }, 100);
    });
};

function circleMouseFollow (scaleX, scaleY) {
       window.addEventListener("mousemove", function(cordinate) {
        const circle = document.querySelector("#mini-circle");
        const circleSize = circle.offsetWidth / 2;
        circle.style.transform = `translate(${cordinate.clientX - circleSize}px, ${cordinate.clientY - circleSize}px) scale(${scaleX}, ${scaleY})`;
        circle.style.opacity = `1`;
    });
};

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '30',
        opacity: 0,
        duration: 1.5,
        ease: "power2.easeInOut"
    })
        .to(".boundingelem", {
            y: 0,
            duration: 2,
            ease: "power2.easeInOut",
            delay: -1,
            stagger: 0.2
        })
    .from("#home-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "power2.easeInOut"
    })
};

skewCircle();
circleMouseFollow();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    var currentImg = null;

    elem.addEventListener("mousemove", function(details) {
        if (!currentImg) {
            currentImg = elem.querySelector("img");
        };

        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(currentImg , {
            opacity: 1,
            ease: "power3",
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });

    elem.addEventListener("mouseleave", function() {
        if (currentImg) {
            gsap.to(elem.querySelector("img") , {
                opacity: 0,
                ease: "power3",
                duration: 0.5
            });
            currentImg = null;
        }
    });
});
