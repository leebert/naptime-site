// structure is: link title, resource type, resource url, design, code, words, year
var js_c_data = [
    {title: "A Scouting App for Directors & Cinematographers", type: "page", url: "details-cinescope.html", design: true, code: true, words: false, year: 2020},
    {title: "A SaaS Product for Data Scientists", type: "", url: "", design: true, code: false, words: true, year: 2020},
    {title: "A Video Annotation Tool for Data Labelers", type: "", url: "", design: true, code: false, words: false, year: 2020},
    {title: "A Video Timeline Prototype", type: "", url: "", design: false, code: true, words: false, year: 2020},
    {title: "Lots Branding & Marketing Content", type: "", url: "", design: true, code: true, words: true, year: 2020},
    {title: "A Case Study for Data Labeling", type: "", url: "", design: false, code: false, words: true, year: 2020},
    {title: "A Content Review Portal for Data Scientists", type: "", url: "", design: true, code: false, words: false, year: 2019},
    {title: "A Design Token Plugin for Figma", type: "", url: "", design: true, code: true, words: true, year: 2019},
    {title: "An Interactive Art Experiment Using AR", type: "", url: "", design: true, code: true, words: false, year: 2019},
    {title: "A Machine Learning Behavioral Tool for Cybersecurity Analysts", type: "", url: "", design: true, code: false, words: false, year: 2019},
    {title: "An Introducton to Computer Science Course for UT Austin", type: "", url: "", design: false, code: false, words: true, year: 2018},
    {title: "A Building Maintenance App Using AR", type: "", url: "", design: true, code: true, words: false, year: 2018},
    {title: "A Thermostat Upgrade Assistant App Using AR", type: "", url: "", design: true, code: false, words: true, year: 2018},
    {title: "Two Case Studies on iOS Design & Development", type: "", url: "", design: false, code: false, words: true, year: 2018},
    {title: "An iOS App for Airline Travelers & Pilots", type: "", url: "", design: true, code: true, words: false, year: 2017},
    {title: "An Responsive Design System for a Flight Data Company's Website", type: "", url: "", design: true, code: false, words: false, year: 2017},
    {title: "Austin's First Ride-Sharing Startup", type: "", url: "", design: true, code: true, words: true, year: 2013},
    {title: "A Mobile Design & Development Agency", type: "", url: "", design: true, code: true, words: true, year: 2011},
        ];

var js_c_ContentHolder;
var js_c_Filter = 0; //0 == none, 1 == design, 2 == code, 3 == words
var js_c_StartYear = 2020;
var js_c_EndYear = 2011;
var js_c_LastButton;

window.addEventListener('load', js_c_load);

function js_c_load() {
    js_c_ContentHolder = document.getElementById("js_main");
    document.getElementById("js_filter_1").addEventListener("click", js_c_HandleFilter);
    document.getElementById("js_filter_2").addEventListener("click", js_c_HandleFilter);
    document.getElementById("js_filter_3").addEventListener("click", js_c_HandleFilter);
    document.addEventListener("scroll", js_cmn_HandleScroll);
    js_c_loadContent();
    js_cmn_HandleScroll();
}

function js_c_HandleFilter(event) {
    var n = Number(event.target.id.charAt(event.target.id.length - 1));
    js_c_Filter = js_c_Filter == n ? 0 : n ;
    js_c_CycleButtonStyle(js_c_LastButton);
    if (!js_c_LastButton || (js_c_LastButton.id != event.target.id)) { 
        js_c_CycleButtonStyle(event.target); 
        js_c_LastButton = event.target;
    }
    else {
        js_c_LastButton = null;
    }
    js_c_loadContent()
}

function js_c_CycleButtonStyle(button) {
    if (!button) { return; }
    var n = Number(button.id.charAt(button.id.length - 1));
    var mod = "design";
    if (n == 2) {
        mod = "code";
    }
    else if (n == 3) {
        mod = "words";
    }
    button.classList.toggle("selected--" + mod);
}

function js_c_loadContent() {
    js_c_ContentHolder.innerHTML = "";

    for (var i = js_c_StartYear; i >= js_c_EndYear; i--) {
        var links = js_c_GetLinks(i);
        if (links == 0) { continue; }
        var group = document.createElement("div");
        group.classList.add("content");
        var timeline = document.createElement("div");
        timeline.classList.add("content__timeline");
        timeline.innerHTML = i;
        group.appendChild(timeline);
        if (i != js_c_EndYear) {
            var line =  document.createElement("div");
            line.classList.add("content__timeline-line");
            timeline.appendChild(line);
        }
        var linkList = document.createElement("div");
        linkList.classList.add("content__links");
        group.appendChild(linkList);
        for (link of links) {
            var container = document.createElement("div");
            container.classList.add("content__link");
            container.appendChild(js_c_GetTypes(link.design, link.code, link.words));
            var item = document.createElement("a");
            if (link.type == "page") {
                item.href = link.url;
            }
            else {
                item.href = "#";
            }
            item.textContent = link.title;
            container.appendChild(item);
            linkList.appendChild(container);
        }
        js_c_ContentHolder.appendChild(group);
        if (i != js_c_EndYear) {
            var padder = document.createElement("div");
            padder.classList.add("content__padder");
            linkList.appendChild(padder);
        }
    }
}

function js_c_GetLinks(year) {
    if (js_c_Filter == 1) {
        return js_c_data.filter(link => link.year == year && link.design == true);
    }
    else if (js_c_Filter == 2) {
        return js_c_data.filter(link => link.year == year && link.code == true);
    }
    else if (js_c_Filter == 3) {
        return js_c_data.filter(link => link.year == year && link.words == true);
    }
    return js_c_data.filter(link => link.year == year);
}

function js_c_GetTypes(design, code, words) {
    var container = document.createElement("div");
    container.classList.add("content__types");
    var d = document.createElement("div");
    d.classList.add("type");
    d.classList.add("type__" + (design ? "" : "no-") + "design");
    container.appendChild(d);
    var c = document.createElement("div");
    c.classList.add("type");
    c.classList.add("type__" + (code ? "" : "no-") + "code");
    container.appendChild(c);
    var w = document.createElement("div");
    w.classList.add("type");
    w.classList.add("type__" + (words ? "" : "no-") + "words");
    container.appendChild(w);
    return container;
}