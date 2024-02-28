/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js" ></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/Flip.min.js"></script> 
<script src="https://unpkg.com/split-type"></script>*/

//
const navLinks = document.querySelectorAll(".nav-link");
const navCorners = document.querySelector(".nav-corners");

navLinks.forEach(function(link){
    link.addEventListener("click", function(){
        navLinks.forEach(function(link){
            link.classList.remove("is--active");
        });
        this.classList.add("is--active");
    });
    link.addEventListener("mouseenter", function(){
        const state = Flip.getState(navCorners);
        this.appendChild(navCorners);
        Flip.from(state,{
            duration:0.4,
            ease:"power1.inOut",
        });
    });
    link.addEventListener("mouseleave", function(){
        const state = Flip.getState(navCorners);
        const activeLink = document.querySelector(".nav-link.is--active");
        activeLink.appendChild(navCorners);
        Flip.from(state,{
            duration:0.4,
            ease:"power1.inOut",
        });
    });
});

//
let splitText;
function runSplit(){
    splitText = new SplitType("[stagger-link]",{
        types:"words, chars"
    });
}
runSplit();

//--update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
    if (windowWidth !== $(window).innerWidth()) {
        windowWidth = $(window).innerWidth();
        splitText.revert();
        runSplit ();
    }
});

//animation
const staggerLink = document.querySelectorAll("[stagger-link]");
staggerLink.forEach(function(link){
    const letters = link.querySelectorAll(".char");
    link.addEventListener("mouseenter", function(){
        gsap.to(letters,{
            yPercent: -100,
            duration: 0.5,
            ease: "power4.inOut",
            stagger: {each:0.02},
            overwrite: true
        })
    })
    link.addEventListener("mouseleave", function(){
        gsap.to(letters,{
            yPercent: 0,
            duration: 0.3,
            ease: "power4.inOut",
            stagger: {each:0.02},
            overwrite: true
        })
    })
})

$(document).ready(function() {
    $(".menu-link").on("click", function(e){
      // if ($(this).prop("hostname") === window.location.host && $(this.attr("href").indexOf("#") === -1 && $(this.attr("target") !== "_blank"))) { 
        e.preventDefault();
        let destination = $(this).attr("href");
        gsap.set(".load_grid", {display:"grid"});
        gsap.fromTo(
            ".load_grid-item",
            {
                opacity:0
            },
            {
                opacity:1,
                duration:0.001,
                stagger: {amount:0.5, from:"random"},
                onComplete:() => {
                    window.location = destination;
                }
            }
        );
      // }
    });
});