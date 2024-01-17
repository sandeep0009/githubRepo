const fetchData = async () => {
    try {
      const value = document.getElementById("input").value;
      const res = await fetch("https://api.github.com/users/" + value);
      const userData = await res.json();
      console.log(userData)

      if(userData===null){
        document.getElementById("main").innerHTML = `<h2>No user Exist</h2>`;
        return;
      }
      const inputRepo = document.getElementById('inputRepo').value;

    
      fetchRepo(value, 1, inputRepo);

      const location = userData.location ? userData.location : "not mentioned";

      const card = `
        <div class="container-id">
          <div class="container-image" id="image">
            <img src="${userData.avatar_url}" alt="">
          </div>

          <div class="container-name" id="name">
            <h3>${userData.name}</h3>

            <div class="container-bio">
              <p>${userData.bio}</p>
            </div>

            <div class="location">
              <p>${location}</p>
            </div>
          </div>
        </div>

        <div>
          <a href="${userData.html_url}" target="_blank" rel="noopener noreferrer">GitHub Link</a>
        </div>

        <div id="repoList"></div>
        <div id="pagination"></div>
      `;

      document.getElementById("main").innerHTML = card;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRepo = async (username, page = 1, perPage = 10) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
      const data = await res.json();
      console.log(data)

      const repoListContainer = document.getElementById("repoList");
      repoListContainer.innerHTML = ""; 

      data.forEach(repo => {
        const repoItem = document.createElement("div");
        repoItem.innerHTML = `<p><span>Title:</span>${repo.name}</p>  <p><span>Language:</span> ${repo.language || 'Not specified'}</p>`;
        
        repoListContainer.appendChild(repoItem);
      });

    
      const paginationContainer = document.getElementById("pagination");
      paginationContainer.innerHTML = "";

      if (page > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous Page";
        prevButton.onclick = () => fetchRepo(username, page - 1, perPage);
        paginationContainer.appendChild(prevButton);
      }
      if(data.length>0){
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next Page";
        nextButton.onclick = () => fetchRepo(username, page + 1, perPage);
        paginationContainer.appendChild(nextButton);


      }
     

      
    
    } catch (error) {
      console.log(error);
    }
  };