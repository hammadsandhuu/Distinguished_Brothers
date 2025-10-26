$(document).ready(function () {
    // Detect current page name
    let pageName = window.location.pathname.split("/").pop().split(".")[0];
    if (pageName === "" || pageName === "index") pageName = "home";

    // Load translation for selected language
    function loadLanguage(lang) {
        const filePath = `assets/lang/${pageName}/${lang}.json`;
        console.log("Loading language file:", filePath);

        $.getJSON(filePath, function (translations) {
            $("[data-translate]").each(function () {
                const key = $(this).data("translate");
                if (translations[key]) {
                    $(this).text(translations[key]);
                }
            });
        }).fail(function () {
            console.warn(`Missing file: ${filePath}`);
        });
    }

    // Apply language (and store it)
    function applyLanguage(lang) {
        localStorage.setItem("language", lang);
        loadLanguage(lang);
        $("#langLabel").text(lang.toUpperCase());
    }

    // Get saved language or default English
    const savedLang = localStorage.getItem("language") || "en";
    applyLanguage(savedLang);

    // Handle LTR/RTL palette buttons (you already have)
    $(".rtl-version li").on("click", function () {
        const isRTL = $(this).hasClass("rtl");
        if (isRTL) {
            applyLanguage("ar");
        } else {
            applyLanguage("en");
        }
    });

    // NEW: Handle the language toggle button
    $("#languageToggle").on("click", function () {
        const currentLang = localStorage.getItem("language") || "en";
        const newLang = currentLang === "en" ? "ar" : "en";
        applyLanguage(newLang);
    });

    // Auto-update label on reload
    $("#langLabel").text(savedLang.toUpperCase());
});
