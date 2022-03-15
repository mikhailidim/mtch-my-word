var iregex = "";
var ifocus = 0;
var pattern = 5;
var rLetters = /[a-zA-Z]|[а-яА-Я]/;
var guessAPI = "/guess/api/v1.0/en/";

function toggle_api(event) {
    switch (typeof event) {
        case 'object':
            lang = event.target.innerHTML === "en" ? "ru" : "en";
            break;
        case 'string':
            lang = event;
            break;
        default:
            lang = 'en';
    }
    $("#en-ru").html(lang);
    guessAPI = `/guess/api/v1.0/${lang}/`;
    kbdSrc = `/static/${lang}_kbd.html`;
    $("#keyboard").children().remove();
    $("<div id='keyboard'></div>").insertAfter($("#results"));
    $("#keyboard").load(kbdSrc, () => {
        $("button").on("click", btn_click);
        console.log($("#keyboard").children().length);
    });
    reset_input();
}

function btn_click(btn) {
    var code = btn.currentTarget.attributes.kdata.value.charCodeAt();
    if (code == 8592) {
        clear_letter({ "keyCode": 8 });
    } else {
        text_input({ "which": code });
    }
    $("body").trigger("keypress",);
}

// Handle input
// 
function update_results(evt, data) {
    // Complete the pattern  
    let ptr = data || "";
    if (ptr.length >= 3 && rLetters.test(ptr)) {
        // 3+ chars and at least one letter   
        ptr += ".".repeat(pattern - ptr.length);

        // Query API 
        $.get(guessAPI + ptr, (data) => {
            //Pretty Print
            $("#results").children().remove();
            if (data.Matches.length > 0) {
                if (data.Matches.length > 6) {
                    $("#results").css("height", "var(--res-height)");
                    $("#results").css("overflow-y", "overlay");

                } else
                    $("#results").css("height", "auto");

                data.Matches.map(element => {
                    $("#results").append(print_word(ptr, element));
                });
            } else {
                $("#results").css("height", "auto");
                $("#results").children().remove();
                $("#results").append(empty_line(data.Mask));
            }
        });
    } else {
        // cleanup result 
        $("#results").css("height", "auto");
        $("#results").children().remove();
        //        $("#results").append(empty_line());
    }

    // $("body").css("height",
    //     $("#viewport").css("height"));
}

// Generate result row 
function empty_line(ptr) {
    // Create empty result
    let wrd = $("<div class='results'></div>");
    if (typeof ptr == "undefined" || ptr == null) {
        // let adjst = pattern * 50 + (pattern - 1) * 5 + 20;
        // wrd.css("width", adjst + "px");
        for (i = 0; i < pattern; i++)
            wrd.append($("<div class='letter'></div>"));
    } else {
        // let adjst = ptr.length * 50 + (ptr.length - 1) * 5 + 20;
        // wrd.css("width", adjst + "px");
        [...ptr].map((chr, idx) => {
            wrd.append($("<div class='letter none'></div>"));
        });
    }
    return wrd;
}

function reset_input() {
    $("#inputs .letter").each(function (idx, li) {
        li.innerHTML = "";
    });
    ifocus = 0;
    $("body").trigger("redraw", build_mask());
}

function print_word(ptr, rst) {
    let wrd = $("<div class='results'></div>");
    // let adjst = ptr.length * 50 + (ptr.length - 1) * 5 + 20;
    // wrd.css("width", adjst + "px");
    [...rst].map((chr, idx) => {
        const msk = rLetters.test(ptr[idx]) ? "green" : "";
        wrd.append($("<div class='letter " + msk + "'>" + chr + "</div>"));
    });
    return wrd;
}
// Handle del and backspace 
function clear_letter(e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        // var rx = /INPUT|SELECT|TEXTAREA/i;
        // if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
        //     e.preventDefault();
        // }
        if (ifocus > 0) ifocus -= 1;
        $(".letter").eq(ifocus).html("");
        $("body").trigger("redraw", build_mask());
    }
}
// Text input 
function text_input(e) {
    let isUpdated = false;
    const dotch = [32, 46, 190];
    const ch = String.fromCharCode(e.which);
    if (rLetters.test(ch) && ifocus < pattern) {
        $(".letter").eq(ifocus).html(ch);
        ifocus += 1;
        isUpdated = true;
    }
    if (dotch.includes(e.which) && ifocus < pattern) {
        $(".letter").eq(ifocus).html(".");
        ifocus += 1;
        isUpdated = true;
    }
    // Updte search term 
    if (isUpdated)
        $("body").trigger("redraw", build_mask());
}

function build_mask() {
    let msk = "";
    $("#inputs .letter").each(function (idx, li) {
        msk += li.textContent.toLowerCase();
    });
    return msk;
}

function add_char() {
    // remove control buttons
    if (pattern < 16) {
        pattern += 1;
        $('<div class="letter"></div>').appendTo("#inputs").fadeIn('slow');
        // Remeber control buttons
        document.body.style.setProperty('--control-count', pattern + 2); //set
        document.body.style.setProperty('--result-count', pattern); //set
        // let adjst = (pattern + 1) * 5 + (pattern + 2) * 50;
        // $("#inputs").width(adjst);
        // $("hr").width(adjst + 20);
        $("body").trigger("redraw", build_mask());

    }
}

function rem_char() {
    var bodyStyles = window.getComputedStyle(document.body);
    if (pattern > 2) {
        $("#inputs").children().last().fadeOut().remove();
        pattern -= 1;
        document.body.style.setProperty('--control-count', pattern + 2); //set
        document.body.style.setProperty('--result-count', pattern); //set
        // let adjst = (pattern + 1) * 5 + (pattern + 2) * 50;
        // $("#inputs").width(adjst);
        // $("hr").width(adjst + 20);
        $("body").trigger("redraw", build_mask());
    }
}

function pop_help(event){
       $("#help").toggleClass(["popup","popdown"]);

}