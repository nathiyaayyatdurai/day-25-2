const rowDiv = document.querySelector(".row");

// Initially rendering the data from API
const Animefacts = async () => {
  const res = await fetch("https://anime-facts-rest-api.herokuapp.com/api/v1");
  const { data } = await res.json();

  //Passing over the data through helper function
  data.forEach((anime) => card(anime));
};

// Initial Render Call
Animefacts();

// Helper function for rendering card
const card = async (data) => {
  let title = data.anime_name.toUpperCase().replaceAll("_", " ");
  let html = `
  <div class="col-lg-3 col-md-6 col-sm-12 deck">
    <div class="card shadow-lg bg-white rounded">
     <img
      src=${data.anime_img}
      class="card-img-top"
      alt="..."
     />
     <div class="card-body" >
      <h5 class="card-title">${title}</h5>
      <p class="card-text" id=${data.anime_name}></p>
      <button
            class="btn btn-primary"
            type="button"
            id=${data.anime_name}
          >Know Random Fact</button>
      </div>
    </div>
  </div>`;

  //Adding the card to HTML using DOM method
  rowDiv.insertAdjacentHTML("afterbegin", html);

  // Adding a event handler for getting random fact tp render on screen whenever the user clicks on the
  document.querySelector("button").addEventListener("click", (e) => {
    // For identifying on which card event was fired;
    let animeName = e.target.id;

    const toKnoFacts = async () => {
      // Fetching the facts from API as per the click event
      let resFacts = await fetch(
        `https://anime-facts-rest-api.herokuapp.com/api/v1/${animeName}`
      );
      let { data } = await resFacts.json();
      let random = Math.ceil(Math.random() * data.length);
      let facts = data[random].fact;
      let el = document.getElementById(`${animeName}`);
      el.innerHTML = `"${facts}"`;
    };

    // Rendering the random fact on screen for user
    toKnoFacts();

    e.target.textContent = "Click >> Fact";
  });
};