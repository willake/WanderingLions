"use strict"

function SetupHamburger(){
    var hamburger = $('.hamburger')
    var navbar = $('.mobile ul')
    console.log(navbar);
    hamburger.click(function () {
        var active = 'active'
        // $('nav').toggleClass(active)
        $('.hamburger').toggleClass('is-active')
        navbar.toggleClass(active)
    })
}

(function () {
    SetupHamburger()
})(jQuery)