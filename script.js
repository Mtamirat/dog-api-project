async function fetchBreeds() {
    try {
      const response = await fetch("https://dogapi.dog/api/v2/breeds");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const list = document.getElementById("breedList");

      data.data.forEach(breed => {
        const li = document.createElement("li");
        li.textContent = breed.attributes.name;
        li.addEventListener("click", () => {
            fetchBreedDetails(breed.id);
          });
          list.appendChild(li);
        });
    
      } catch (error) {
        document.getElementById("error").textContent = error.message;
      }
    }
    async function fetchBreedDetails(id) {
        try {
          const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
          if (!response.ok) {
            throw new Error("Breed not found");
          }
      
          const data = await response.json();
          const breed = data.data.attributes;
          document.getElementById("breedDetails").innerHTML = `
          <h3>${breed.name}</h3>
          <p>${breed.description}</p>
          <p>Life span: ${breed.life.min} - ${breed.life.max} years</p>
        `;
        async function fetchFacts() {
            const response = await fetch("https://dogapi.dog/api/v2/facts");
            const data = await response.json();
          
            data.data.forEach(fact => {
              const p = document.createElement("p");
              p.textContent = fact.attributes.body;
              document.getElementById("facts").appendChild(p);
            });
          }
          async function fetchGroups() {
            const response = await fetch("https://dogapi.dog/api/v2/groups");
            const data = await response.json();
          
            data.data.forEach(group => {
              const div = document.createElement("div");
              div.innerHTML = `
                <h4>${group.attributes.name}</h4>
                <p>${group.attributes.description}</p>
              `;
              document.getElementById("groups").appendChild(div);
            });
          }
          fetchBreeds();
          fetchFacts();
          fetchGroups();
                                                            