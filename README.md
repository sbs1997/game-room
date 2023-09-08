# Digital Game Room
The digital game room is mostly a couple of technical excercises trying to do different cool things in react. 

On the home page you can sign up as a new user. There isn't a password and it's only a local user, but your users and their scores will be stored in the db.json and will persist. The home page is also where you select the active user.

You can play tic-tac-toe on two different difficulty settings. I believe the logic for the "Hard" setting is impossible to beat. The logic is mostly the same as Newell and Simon's 1972 tic-tac-toe program, but a small piece of that logic is hard coded in such a way that there may be a way to exploit it. Don't let the computer's incessant taunting get to you. 

You can also play trivia, which uses the trivia API at https://the-trivia-api.com/docs/v2/ for questions. Each trivia session is 10 questions long.

Whenever you finish a game of tic-tac-toe or a session of trivia that information is automatically sent to the local database, and you can see stats on each users performance on the scoreboard page.

## Running the Program
In order run the program, navigate to the project folder in CLI and run 
```bash
npm install
npm run dev
```
and then in another terminal (also in the project folder) run: 

```bash
json-server --watch db.json
```
