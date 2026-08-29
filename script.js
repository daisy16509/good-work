const goldenHour = {

    beach: null,

    activities: [],

    time: null,

    things: []

};
function get(selector) {

    return document.querySelector(selector);

}
function getAll(selector) {

    return Array.from(document.querySelectorAll(selector));

}
function updateCount() {

    const counter = get("#tripCount");

    if (!counter) return;

    const total =
        goldenHour.activities.length +
        goldenHour.things.length;

    counter.textContent = total;

}
const beachModal = get("#locationModal");

const beachModalName = get("#modalBeachName");

const beachModalImage = get("#modalBeachImage");

getAll(".beach-card").forEach(function(card) {

    card.addEventListener("click", function() {

        const beachName =
            card.dataset.beach;

        const image =
            card.querySelector("img");


        goldenHour.beach =
            beachName;


        if (beachModalName) {

            beachModalName.textContent =
                beachName;

        }


        if (beachModalImage && image) {

            beachModalImage.src =
                image.src;

            beachModalImage.alt =
                beachName;

        }


        if (beachModal) {

            beachModal.classList.add("open");

        }

    });

});
const closeModal =
    get(".close-modal");


if (closeModal) {

    closeModal.addEventListener("click", function() {

        if (beachModal) {

            beachModal.classList.remove("open");

        }

    });

}
if (beachModal) {

    beachModal.addEventListener("click", function(event) {

        if (event.target === beachModal) {

            beachModal.classList.remove("open");

        }

    });

}
const selectBeach =
    get("#selectBeach");


if (selectBeach) {

    selectBeach.addEventListener("click", function() {

        if (!goldenHour.beach) {

            alert(
                "Please choose a beach first 🌊"
            );

            return;

        }


        if (beachModal) {

            beachModal.classList.remove("open");

        }


        const activitiesSection =
            get("#activities");


        if (activitiesSection) {

            activitiesSection.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}
getAll(".activity-card").forEach(function(card) {

    card.addEventListener("click", function() {

        const activityName =
            card.dataset.activity;

        const activityPrice =
            Number(card.dataset.price) || 0;


        const existing =
            goldenHour.activities.find(function(activity) {

                return activity.name === activityName;

            });


        
        if (existing) {

            goldenHour.activities =
                goldenHour.activities.filter(function(activity) {

                    return activity.name !== activityName;

                });


            card.classList.remove("selected");

        }

        
        else {

            goldenHour.activities.push({

                name: activityName,

                price: activityPrice

            });


            card.classList.add("selected");

        }


        updateCount();

        updateDrawer();

    });

});
const chooseActivities =
    get("#chooseActivities");


if (chooseActivities) {

    chooseActivities.addEventListener("click", function() {


    

        if (!goldenHour.beach) {

            alert(
                "Choose a beach first 🌊"
            );

            const places =
                get("#places");

            if (places) {

                places.scrollIntoView({

                    behavior: "smooth"

                });

            }

            return;

        }
        if (goldenHour.activities.length === 0) {

            alert(
                "Pick at least one activity that excites you ✨"
            );

            return;

        }
        const slotSection =
            get("#slot");


        if (slotSection) {

            slotSection.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}
const slotGrid =
    get("#slotGrid");


if (slotGrid) {

    for (let hour = 0; hour < 24; hour++) {


        let displayHour;


        let period;


        if (hour === 0) {

            displayHour = 12;

            period = "AM";

        }

        else if (hour < 12) {

            displayHour = hour;

            period = "AM";

        }

        else if (hour === 12) {

            displayHour = 12;

            period = "PM";

        }

        else {

            displayHour = hour - 12;

            period = "PM";

        }


        const time =
            displayHour + ":00 " + period;


        const button =
            document.createElement("button");


        button.className =
            "slot";


        button.textContent =
            time;


        button.dataset.slot =
            time;


        button.type =
            "button";


        button.addEventListener("click", function() {

            getAll(".slot").forEach(function(slot) {

                slot.classList.remove("selected");

            });

            button.classList.add("selected");


            goldenHour.time =
                time;


            updateDrawer();

            setTimeout(function() {

                const pack =
                    get("#pack");

                if (pack) {

                    pack.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            }, 350);

        });


        slotGrid.appendChild(button);

    }

}
getAll(".pack-card").forEach(function(card) {

    card.addEventListener("click", function() {

        const itemName =
            card.dataset.item;

        const itemPrice =
            Number(card.dataset.price) || 0;


        const existing =
            goldenHour.things.find(function(item) {

                return item.name === itemName;

            });
        if (existing) {

            goldenHour.things =
                goldenHour.things.filter(function(item) {

                    return item.name !== itemName;

                });


            card.classList.remove("selected");

        }
        else {

            goldenHour.things.push({

                name: itemName,

                price: itemPrice

            });


            card.classList.add("selected");

        }


        updateCount();

        updateDrawer();

    });

});
function getTotal() {

    let total = 0;


    goldenHour.activities.forEach(function(activity) {

        total +=
            Number(activity.price) || 0;

    });


    goldenHour.things.forEach(function(item) {

        total +=
            Number(item.price) || 0;

    });


    return total;

}
function createSummary() {

    const summary =
        get("#summary");


    if (!summary) return;


    const activityNames =

        goldenHour.activities.length

            ? goldenHour.activities
                .map(function(activity) {

                    return activity.name;

                })
                .join(", ")

            : "No activities";


    const thingsCount =
        goldenHour.things.length;


    const thingsText =

        thingsCount === 0

            ? "No extras"

            : thingsCount +
              (
                thingsCount === 1
                    ? " extra"
                    : " extras"
              );


    summary.innerHTML = `

        <div class="summary-line">

            <strong>Beach</strong>

            <span>
                ${goldenHour.beach || "Not selected"}
            </span>

        </div>


        <div class="summary-line">

            <strong>Activities</strong>

            <span>
                ${activityNames}
            </span>

        </div>


        <div class="summary-line">

            <strong>Time</strong>

            <span>
                ${goldenHour.time || "Not selected"}
            </span>

        </div>


        <div class="summary-line">

            <strong>Beach essentials</strong>

            <span>
                ${thingsText}
            </span>

        </div>


        <div class="summary-total">

            Total:

            Rs.
            ${getTotal().toLocaleString()}

        </div>

    `;

}
const checkoutButton =
    get("#checkoutButton");


if (checkoutButton) {

    checkoutButton.addEventListener("click", function() {

        if (!goldenHour.beach) {

            alert(
                "Choose your beach first 🌊"
            );

            const places =
                get("#places");

            if (places) {

                places.scrollIntoView({

                    behavior: "smooth"

                });

            }

            return;

        }
        if (goldenHour.activities.length === 0) {

            alert(
                "Choose at least one activity ✨"
            );

            const activities =
                get("#activities");

            if (activities) {

                activities.scrollIntoView({

                    behavior: "smooth"

                });

            }

            return;

        }
        if (!goldenHour.time) {

            alert(
                "Choose a time slot 🕐"
            );

            const slot =
                get("#slot");

            if (slot) {

                slot.scrollIntoView({

                    behavior: "smooth"

                });

            }

            return;

        }
        createSummary();

        const checkout =
            get("#checkout");


        if (checkout) {

            checkout.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}
const cardNumber =
    get("#cardNumber");


if (cardNumber) {

    cardNumber.addEventListener("input", function() {

        let value =
            cardNumber.value
                .replace(/\D/g, "")
                .slice(0, 16);


        value =
            value.replace(
                /(.{4})/g,
                "$1 "
            )
            .trim();


        cardNumber.value =
            value;

    });

}
const expiry =
    get("#expiry");


if (expiry) {

    expiry.addEventListener("input", function() {

        let value =
            expiry.value
                .replace(/\D/g, "")
                .slice(0, 4);


        if (value.length > 2) {

            value =
                value.slice(0, 2)
                + "/"
                + value.slice(2);

        }


        expiry.value =
            value;

    });

}

const cvv =
    get("#cvv");


if (cvv) {

    cvv.addEventListener("input", function() {

        cvv.value =
            cvv.value
                .replace(/\D/g, "")
                .slice(0, 4);

    });

}

const payButton =
    get("#payButton");


if (payButton) {

    payButton.addEventListener("click", function() {

        const finalBeach =
            get("#finalBeach");


        if (finalBeach) {

            finalBeach.textContent =
                goldenHour.beach ||
                "your beach";

        }
        const finalDetails =
            get("#finalDetails");


        if (finalDetails) {

            const activityCount =
                goldenHour.activities.length;


            const activityWord =
                activityCount === 1
                    ? "activity"
                    : "activities";


            finalDetails.textContent =

                activityCount +
                " " +
                activityWord +
                " · " +
                (
                    goldenHour.time ||
                    "your chosen time"
                ) +
                " · Rs. " +
                getTotal().toLocaleString();

        }
        const success =
            get("#success");


        if (success) {

            success.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}

const tripPill =
    get("#tripPill");


const tripDrawer =
    get("#tripDrawer");


const closeDrawer =
    get("#closeDrawer");


if (tripPill) {

    tripPill.addEventListener("click", function() {

        if (tripDrawer) {

            tripDrawer.classList.add("open");

        }


        updateDrawer();

    });

}


if (closeDrawer) {

    closeDrawer.addEventListener("click", function() {

        if (tripDrawer) {

            tripDrawer.classList.remove("open");

        }

    });

}
function updateDrawer() {

    const drawerContent =
        get("#drawerContent");


    if (!drawerContent) return;


    let html = "";
    if (

        !goldenHour.beach &&

        goldenHour.activities.length === 0 &&

        goldenHour.things.length === 0

    ) {

        drawerContent.innerHTML = `

            <p class="drawer-empty">

                Nothing picked yet 🌊

                <br><br>

                Start with a beach
                and build your perfect day.

            </p>

        `;

        return;

    }
    if (goldenHour.beach) {

        html += `

            <div class="drawer-item">

                <span>🌊 Beach</span>

                <strong>
                    ${goldenHour.beach}
                </strong>

            </div>

        `;

    }
    if (goldenHour.time) {

        html += `

            <div class="drawer-item">

                <span>🕐 Time</span>

                <strong>
                    ${goldenHour.time}
                </strong>

            </div>

        `;

    }
    goldenHour.activities.forEach(function(activity) {

        html += `

            <div class="drawer-item">

                <span>
                    ${activity.name}
                </span>

                <strong>
                    Rs.
                    ${Number(activity.price).toLocaleString()}
                </strong>

            </div>

        `;

    });
    goldenHour.things.forEach(function(item) {

        html += `

            <div class="drawer-item">

                <span>
                    ${item.name}
                </span>

                <strong>
                    Rs.
                    ${Number(item.price).toLocaleString()}
                </strong>

            </div>

        `;

    });
    html += `

        <div class="drawer-total">

            <span>Total</span>

            <strong>

                Rs.
                ${getTotal().toLocaleString()}

            </strong>

        </div>

    `;


    drawerContent.innerHTML =
        html;

}
const siteHeader =
    get("#siteHeader");


window.addEventListener("scroll", function() {

    if (!siteHeader) return;


    if (
        window.scrollY >
        window.innerHeight * 0.55
    ) {

        siteHeader.classList.add("visible");

    }

    else {

        siteHeader.classList.remove("visible");

    }

});
document.addEventListener("keydown", function(event) {

    if (event.key !== "Escape") return;


    if (beachModal) {

        beachModal.classList.remove("open");

    }


    if (tripDrawer) {

        tripDrawer.classList.remove("open");

    }

});
getAll("[data-scroll]").forEach(function(button) {

    button.addEventListener("click", function() {

        const target =
            button.dataset.scroll;


        const section =
            get(target);


        if (section) {

            section.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
getAll("[data-top]").forEach(function(button) {

    button.addEventListener("click", function() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});
updateCount();

updateDrawer();
console.log(
    "🌅 The Golden Hour beach planner is ready!"
);