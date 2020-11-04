const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const submitBtn = document.querySelector("button");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      data.error
        ? (messageOne.textContent = data.error)
        : (messageOne.textContent = data.location),
        (messageTwo.textContent = data.forecast);
    });
  });
});

window.addEventListener("load", () => {
  search.value.length === 0
    ? (submitBtn.disabled = true)
    : (submitBtn.disabled = false);
});

search.addEventListener("keyup", () => {
  if (search.value.length <= 0) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("button--active");
  } else {
    submitBtn.disabled = false;
    submitBtn.classList.add("button--active");
  }
});
