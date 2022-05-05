const { type } = require("express/lib/response")

to_add = ''
css_add = ''

function colourChooser (data) {
    type = []
    firstColour = ""
    secondColour = ""
    for (k = 0; k < data.types.length; k++) {
        type += data.types[k].type.name
    }
    
    for (k = 0; k < type.length; k++) {
        if (type[k] == "normal") {
            if (k == 0) {
                firstColour = "wheat"
            }
            if (k == 1) {
                secondColour = "wheat"
            }
        }
        if (type[k] == "fighting") {
            if (k == 0) {
                firstColour = "maroon"
            }
            if (k == 1) {
                secondColour = "maroon"
            }
        }
        if (type[k] = "flying") {
            if (k == 0) {
                firstColour = "lightskyblue"
            }
            if (k == 1) {
                secondColour = "lightskyblue"
            }
        }
        if (type[k] = "poison") {
            if (k == 0) {
                firstColour = "darkviolet"
            }
            if (k == 1) {
                secondColour = "darkviolet"
            }
        }
        if (type[k] = "ground") {
            if (k == 0) {
                firstColour = "sandybrown"
            }
            if (k == 1) {
                secondColour = "sandybrown"
            }
        }
        if (type[k] = "rock") {
            if (k == 0) {
                firstColour = "darkgoldenrod"
            }
            if (k == 1) {
                secondColour = "darkgoldenrod"
            }
        }
        if (type[k] = "bug") {
            if (k == 0) {
                firstColour = "olive"
            }
            if (k == 1) {
                secondColour = "olive"
            }
        }
        if (type[k] = "ghost") {
            if (k == 0) {
                firstColour = "rebeccapurple"
            }
            if (k == 1) {
                secondColour = "rebeccapurple"
            }
        }
        if (type[k] = "steel") {
            if (k == 0) {
                firstColour = "dimgrey"
            }
            if (k == 1) {
                secondColour = "dimgrey"
            }
        }
        if (type[k] = "fire") {
            if (k == 0) {
                firstColour = "orange"
            }
            if (k == 1) {
                secondColour = "orange"
            }
        }
        if (type[k] = "water") {
            if (k == 0) {
                firstColour = "dodgerblue"
            }
            if (k == 1) {
                secondColour = "dodgerblue"
            }
        }
        if (type[k] = "grass") {
            if (k == 0) {
                firstColour = "forestgreen"
            }
            if (k == 1) {
                secondColour = "forestgreen"
            }
        }
        if (type[k] = "electric") {
            if (k == 0) {
                firstColour = "yellow"
            }
            if (k == 1) {
                secondColour = "yellow"
            }
        }
        if (type[k] = "psychic") {
            if (k == 0) {
                firstColour = "orchid"
            }
            if (k == 1) {
                secondColour = "orchid"
            }
        }
        if (type[k] = "ice") {
            if (k == 0) {
                firstColour = "cyan"
            }
            if (k == 1) {
                secondColour = "cyan"
            }
        }
        if (type[k] = "dragon") {
            if (k == 0) {
                firstColour = "darkviolet"
            }
            if (k == 1) {
                secondColour = "darkviolet"
            }
        }
        if (type[k] = "fairy") {
            if (k == 0) {
                firstColour = "pink"
            }
            if (k == 1) {
                secondColour = "pink"
            }
        }
    }
    if (k == 1) {
        css_add += firstColour
    }
    if (k == 2) {
        css_add += `lineargradient(${firstColour}, ${secondColour})`
    }
}

function finishprocessPokeResp(data) {
    for (j = 0; j < data.genera.length; j++) {
        if (data.genera[j].language.name == "en") {
            to_add += `<p>
            ${data.genera[j].genus}
            </p>
            </div>`
        }
    }
}

function processPokeResp(data) {
    to_add += `<div class="image_container">
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    <h4>${data.name}</h4>`
}

async function loadRandomPokemon() {
    for (i = 1; i <= 9; i++) {
        if (i % 3 == 1) {
            to_add += `<div class="images_group">`
        }

        x = Math.floor(Math.random() * 897) + 1

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPokeResp
        })

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon-species/${x}/`,
            success: finishprocessPokeResp
        })

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}`,
            success: colourChooser
        })

        if (i % 3 == 0) {
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)
    jQuery(".image_container").css("background-colour", css_add)
}

function setup() {
    loadRandomPokemon();
}

jQuery(document).ready(setup)