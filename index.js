fetch("https://striveschool-api.herokuapp.com/books?", {})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 404) {
        throw new Error("404 - Page not found");
      } else if (response.status === 500) {
        throw new Error("500 - Internal server error");
      } else {
        throw new Error("Generic error");
      }
    }
  })
  .then((booksArray) => {
    console.log("library array", booksArray);
    const colCard = document.getElementById("colCard");
    booksArray.forEach((elements, i) => {
      const newCol = document.createElement("div");
      newCol.classList.add("col");
      newCol.innerHTML = `
      <div class="card" >
      <img src="${booksArray[i].img}" class="card-img-top" alt="book-image"  style="height: 450px">
      <div class="card-body">
        <h5 class="card-title" style="height: 90px">${booksArray[i].title}</h5>
        <p class="card-text text-end">
        <span>price: ${booksArray[i].price} €</span>
        </p>
        <div class="d-flex justify-content-between"> 
        <a class="btn btn-danger delete-btn">Delete</a>
        <a  class="btn btn-success add-cart">Add to cart</a>
        </div>
       
      </div>
    </div>
        `;
      colCard.appendChild(newCol);

      const deleteBtn = newCol.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        newCol.remove();
      });

      const addCart = newCol.querySelector(".add-cart");

      addCart.addEventListener("click", () => {
        const list = document.getElementById("list");
        const newItem = document.createElement("li");
        newItem.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        newItem.textContent = `${booksArray[i].title}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger");

        deleteButton.addEventListener("click", () => {
          list.removeChild(newItem);
          addCart.style.backgroundColor = "#198754";
        });

        addCart.style.backgroundColor = "#6C757D";
        addCart.style.border = "#6C757D";

        newItem.appendChild(deleteButton);
        list.appendChild(newItem);
      });
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
