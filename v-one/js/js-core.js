var js_c_defaultText = "👋 I'm Lee. I direct initiatives <br> and ship products for";
var js_c_hoverText = "👀 I'm Lee. I direct initiatives <br> and ship products for";
var js_c_defaultText_NoBreak = "👋 I'm Lee. <br> I direct initiatives and ship products for";
var js_c_hoverText_NoBreak = "👀 I'm Lee. <br> I direct initiatives and ship products for";
var js_c_textInterval;
var js_c_resizeInterval;
var js_c_smallBreakPoint = 670;
var js_c_mediumBreakPoint = 840;
var affectedArticle = "one";

window.addEventListener('load', js_c_load);

function js_c_load() {

    // localStorage.clear();

    js_c_initUI();
    js_c_updateStyleSheets();
    js_c_setTitleText(false);
    js_c_resizeInterval = setInterval(function() { js_c_handleResize(); }, 150);

    document.getElementById("js_one").addEventListener("click", js_c_handleLayout);
    document.getElementById("js_two").addEventListener("click", js_c_handleLayout);
    document.getElementById("js_light").addEventListener("click", js_c_handleStyling);
    document.getElementById("js_dark").addEventListener("click", js_c_handleStyling);
    document.getElementById("js_logo").addEventListener("click", js_c_handleLogo);
    document.getElementById("js_article-one").addEventListener("mouseenter", js_c_handleArticleEnter);
    document.getElementById("js_article-two").addEventListener("mouseenter", js_c_handleArticleEnter);
    document.getElementById("js_article-three").addEventListener("mouseenter", js_c_handleArticleEnter);
    document.getElementById("js_article-one").addEventListener("mouseleave", js_c_handleArticleLeave);
    document.getElementById("js_article-two").addEventListener("mouseleave", js_c_handleArticleLeave);
    document.getElementById("js_article-three").addEventListener("mouseleave", js_c_handleArticleLeave);
    document.getElementById("js_article-one").addEventListener("click", js_c_handleArticleClick, false);
    document.getElementById("js_article-two").addEventListener("click", js_c_handleArticleClick, false);
    document.getElementById("js_article-three").addEventListener("click", js_c_handleArticleClick, false);
    window.addEventListener("resize", js_c_handleResize);

    document.getElementById("js_description-one").style.opacity = "0";
    document.getElementById("js_description-two").style.opacity = "0";
    document.getElementById("js_description-three").style.opacity = "0";
}

function js_c_handleArticleClick(event) {
    var theLink = "cs-one.html"
    var description = document.getElementById("js_description-one");
    if (event.target.id.includes("two")) {
        theLink = "cs-two.html"
        description = document.getElementById("js_description-two");
    }
    else if (event.target.id.includes("three")){
        theLink = "cs-three.html"
        description = document.getElementById("js_description-three");
    }
    description.style.opacity = "0";
    event.target.style.opacity = 0;
    if (localStorage.getItem("layout") == "one") { 
        document.getElementById("js_c-effects-overlay__shim").style.right = "-50%";
        document.getElementById("js_c-effects-overlay__shim").style.transform = "skewX(0deg)";
    }
    else {
        document.getElementById("c-ui-controls").style.opacity = "0";
        document.getElementById("js_c-effects-overlay__shim").style.opacity = "1";
        document.getElementById("js_c-effects-overlay__shim").style.height = "100%";
    }
    document.getElementById("js_description-one").style.opacity = "0";
    document.getElementById("js_description-two").style.opacity = "0";
    document.getElementById("js_description-three").style.opacity = "0";
    setTimeout(function() { window.location.replace(theLink); }, 250);
}

function js_c_handleResize(event) {
    clearInterval(js_c_resizeInterval);
    var tallest = Math.max(window.innerHeight, document.body.getBoundingClientRect().height);
    document.getElementById("js_c-effects-overlay").style.height = tallest + "px";
    if (localStorage.getItem("layout") == "one") { 
        document.getElementById("js_c-effects-overlay__shim").style.height = tallest + "px";
        document.getElementById("js_c-effects-overlay__shim").style.right = "-150%";
    }
    document.body.style.height = tallest + "px";
    if (document.body.clientWidth <= js_c_smallBreakPoint) {
        document.getElementById("js_description-one").style.opacity = "1";
        document.getElementById("js_description-two").style.opacity = "1";
        document.getElementById("js_description-three").style.opacity = "1";
    }
    else {
        document.getElementById("js_description-one").style.opacity = "0";
        document.getElementById("js_description-two").style.opacity = "0";
        document.getElementById("js_description-three").style.opacity = "0";
    }
    js_c_setTitleText(false);
}

function js_c_handleLayout(event) {
    if (event.target.id == "js_one") {
        document.getElementById("js_one").classList.add("link--selected");
        document.getElementById("js_two").classList.remove("link--selected");
        document.getElementById("js_one").style.pointerEvents = "none";
        document.getElementById("js_two").style.pointerEvents = "auto";
        localStorage.setItem("layout", "one");
    }
    else {
        document.getElementById("js_one").classList.remove("link--selected");
        document.getElementById("js_two").classList.add("link--selected");
        document.getElementById("js_one").style.pointerEvents = "auto";
        document.getElementById("js_two").style.pointerEvents = "none";
        localStorage.setItem("layout", "two");
    }
    js_c_updateStyleSheets();
    js_c_resizeInterval = setInterval(function() { js_c_handleResize(); }, 150);
}

function js_c_handleStyling(event) {
    if (event.target.id == "js_light") {
        document.getElementById("js_light").classList.add("link--selected");
        document.getElementById("js_dark").classList.remove("link--selected");
        document.getElementById("js_light").style.pointerEvents = "none";
        document.getElementById("js_dark").style.pointerEvents = "auto";
        localStorage.setItem("styling", "light");
    }
    else {
        document.getElementById("js_light").classList.remove("link--selected");
        document.getElementById("js_dark").classList.add("link--selected");
        document.getElementById("js_light").style.pointerEvents = "auto";
        document.getElementById("js_dark").style.pointerEvents = "none";
        localStorage.setItem("styling", "dark");
    }    
    js_c_updateStyleSheets();
}

function js_c_initUI() {
    if (localStorage.getItem("layout") == null) {
        localStorage.setItem("layout", "one");
        localStorage.setItem("styling", "light");
    }

    if (localStorage.getItem("layout") == "one") {
        document.getElementById("js_one").classList.add("link--selected");
        document.getElementById("js_one").style.pointerEvents = "none";
    }
    else {
        document.getElementById("js_two").classList.add("link--selected");
        document.getElementById("js_two").style.pointerEvents = "none";
    }

    if (localStorage.getItem("styling") == "light") {
        document.getElementById("js_light").classList.add("link--selected");
        document.getElementById("js_light").style.pointerEvents = "none";
    }
    else {
        document.getElementById("js_dark").classList.add("link--selected");
        document.getElementById("js_dark").style.pointerEvents = "none";
    }
}

function js_c_updateStyleSheets() {
    document.getElementById("js_helpers-css").href = "css/h-" + localStorage.getItem("layout") + ".css";
    document.getElementById("js_basics-css").href = "css/b-" + localStorage.getItem("layout") + ".css";
    document.getElementById("js_media-css").href = "css/m-" + localStorage.getItem("layout") + ".css";
    document.getElementById("js_theming-css").href = "css/t-" + localStorage.getItem("layout") + "-" + localStorage.getItem("styling") + ".css";
}

function js_c_handleLogo(event) {
    js_ef_toggleEgg(true);
}

function js_c_handleArticleEnter(event) {
    clearInterval(js_c_textInterval);
    js_c_setTitleText(true);
    if (document.body.clientWidth <= js_c_smallBreakPoint) { return; }
    if (localStorage.getItem("layout") == "one") {
        document.getElementById("c-ui-controls").style.opacity = "0";
        var shim = document.getElementById("js_c-effects-overlay__shim");
        var offsetAmount = -105;
        var skewAmount = -24;
        if (event.target.id.includes("two")) {
            skewAmount = -32;
        }
        else if (event.target.id.includes("three")) {
            skewAmount = -40;
        }
        offsetAmount = offsetAmount + (document.body.clientWidth <= js_c_mediumBreakPoint ? 15 : 0);
        shim.style.right = offsetAmount + "%";
        shim.style.transform = "skewX(" + skewAmount + "deg)";
    }
    var offsetEnhancer = 0;
    affectedArticle = "one";
    if (event.target.id.includes("two")) {
        affectedArticle = "two";
        offsetEnhancer = -32;
    }
    else if (event.target.id.includes("three")) {
        affectedArticle = "three";
        offsetEnhancer = -96;
    }
    document.getElementById("js_description-" + affectedArticle).style.opacity = "1";
    if (localStorage.getItem("layout") == "one") {
        var topOffset = event.target.getBoundingClientRect().top + 16 + window.pageYOffset;
        var leftOffset = event.target.getBoundingClientRect().right + 32;
        if (document.body.clientWidth <= js_c_mediumBreakPoint) {
            topOffset = event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().height + 16 + window.pageYOffset;
            leftOffset = event.target.getBoundingClientRect().left + (event.target.getBoundingClientRect().width * 0.5) + offsetEnhancer;
        }
        document.getElementById("js_description-" + affectedArticle).style.top = topOffset;
        document.getElementById("js_description-" + affectedArticle).style.left = leftOffset;
    }
}

function js_c_handleArticleLeave(event) {
    js_c_textInterval = setInterval(js_c_ArticleLeaveHandler, 300);
    if (document.body.clientWidth <= js_c_smallBreakPoint) { return; }
    if (event.target.id.includes("one")) {
        document.getElementById("js_description-one").style.opacity = "0";
    }
    else if (event.target.id.includes("two")) {
        document.getElementById("js_description-two").style.opacity = "0";

    }
    else if (event.target.id.includes("three")) {
        document.getElementById("js_description-three").style.opacity = "0";

    }   
}

function js_c_ArticleLeaveHandler() {
    js_c_setTitleText(false);
    if (localStorage.getItem("layout") == "one") {
        document.getElementById("c-ui-controls").style.opacity = "1";
        var shim = document.getElementById("js_c-effects-overlay__shim");
        shim.style.right = "-150%";
        shim.style.transform = "skewX(0deg)";
    }
}

function js_c_setTitleText(isHovering) {
    if (document.body.clientWidth <= js_c_smallBreakPoint) {
        document.getElementById("js_header-copy").innerHTML = isHovering ? js_c_hoverText_NoBreak : js_c_defaultText_NoBreak;
    }
    else {
        document.getElementById("js_header-copy").innerHTML = isHovering ? js_c_hoverText : js_c_defaultText;
    }
}

function js_c_randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}