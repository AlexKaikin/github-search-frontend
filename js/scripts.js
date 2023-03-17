const searchForm = document.querySelector(".search__form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  findItemsClear();

  const searchValue = document.querySelector(".search__input");

  let url = `https://api.github.com/search/repositories?q=${searchValue.value}&sort=stars&order=desc&page=1&per_page=10`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => setRepo(res.items));
});

function setRepo(items) {
  const findItems = document.querySelector(".find__items");

  if (items.length) {
    items.map((item) => {
      findItems.append(createRepoItem(item));
    });
  } else {
    findItems.append("Ничего не найдено");
  }
}

function createRepoItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("find__item");

  const itemDivFullName = document.createElement("div");
  itemDivFullName.classList.add("find__fullname");

  const itemDivFullNameUrl = document.createElement("a");
  itemDivFullNameUrl.href = item.html_url;
  itemDivFullNameUrl.target = "_blanck";
  itemDivFullNameUrl.innerText = item.full_name;

  itemDivFullName.append(itemDivFullNameUrl);

  itemDiv.append(itemDivFullName);

  if (item.description) {
    const itemDivDescription = document.createElement("div");
    itemDivDescription.classList.add("find__desc");
    itemDivDescription.innerText = item.description;

    itemDiv.append(itemDivDescription);
  }

  if (item.homepage) {
    const itemDivHomepage = document.createElement("div");
    const itemDivHomepageUrl = document.createElement("a");
    itemDivHomepageUrl.href = item.homepage;
    itemDivHomepageUrl.target = "_blanck";
    itemDivHomepage.classList.add("find__homepage");
    itemDivHomepageUrl.innerText = item.homepage;
    itemDivHomepage.append(itemDivHomepageUrl);

    itemDiv.append(itemDivHomepage);
  }

  return itemDiv;
}

function findItemsClear() {
  const findItems = document.querySelector(".find__items");
  findItems.innerHTML = "";
}
