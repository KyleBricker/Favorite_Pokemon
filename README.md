This project retieves data from the PokeAPI and displays the images and stats of all pokemon to the user.
It implements login and registration with validations.
It uses jQuery to allow a user to filter the pokemon by type, region, and favorite status. 

The main issue of this project was the need to make many requests to the PokeAPI to get the data each time the page was loaded — one for each of the 800+ pokemon — and put that data on the page in an efficient way.  Experimenting with different ways of doing this, my first attempt was to make the 800 requests in succession and attach each one to the page as it runs.  The downside of this was that the requests would often complete out of order, and therefore the data would be displayed out of order.  My idea to fix this was to create my own database with all the information the app needed, so I would not have to make any requests to an API.  After doing this, I was surprised to learn that the information was retrieved even slower from my own database than from the one over the internet.  Saddened, I undid all that work and rewired the app to once again get its data grom the PokeAPI.  The way I ended up solving the problem of the slow retrival was to by default only show the first 151 pokemon, and allow as an option the ability to show them all at once.  

<img width="1440" alt="pokemon1" src="https://user-images.githubusercontent.com/19495389/118894046-58e79f80-b8b8-11eb-92e8-1ab5fe6d8918.png">
<img width="1440" alt="pokemon2" src="https://user-images.githubusercontent.com/19495389/118894120-7caae580-b8b8-11eb-8afa-10ff7812e1be.png">
<img width="1440" alt="pokemon3" src="https://user-images.githubusercontent.com/19495389/118894127-816f9980-b8b8-11eb-9915-afbcf0323ca5.png">
