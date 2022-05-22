to_add = ''

function displayCard(data) {
    to_add += `<div id="cardBlock">
    <img src=${data.data.images.large}>
    <p>${data.data.name}</p>
    <p>Price: $1.00</p>
    <button id="buy">Add to Cart</button>
    </div>`
}

async function getCard(data) {
    for (i = 1; i < data; i++) {
        if (i % 3 == 1) {
            to_add += `<div class="images_group">`
        }
        await $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Api-key', "bc186aa4-a677-4692-85f4-8e361dd471cc")
            }
        })
        await $.ajax({
            type: "get",
            url: `https://api.pokemontcg.io/v2/cards/swsh9-${i}`,
            success: displayCard
        })

        if (i % 3 == 0) {
            to_add += `</div>`
            $("main").html(to_add)
        }
    }
}

function getTotal() {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-Api-key', "bc186aa4-a677-4692-85f4-8e361dd471cc")
        }
    })
    $.ajax({
        type: "get",
        url: "https://api.pokemontcg.io/v2/sets/swsh9",
        success: (data) => {
            total_count = data.data.printedTotal
            getCard(total_count)
        }
    })
}


function setup() {
    getTotal();
}

$(document).ready(setup)