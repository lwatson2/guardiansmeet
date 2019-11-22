# GuardiansMeet

## Why I made GuardiansMeet

I made GuardiansMeet because I saw a post on [dev.to](https://dev.to/skill_pathway/4-ways-you-can-level-up-as-a-developer-17ol) on ways to level up as a developer that said try to make a tinder for dogs. I chose to go with
a destiny themed dating site because it was outlandish and hilarious at the time as still is pretty funny to think about.

## What I learned

Some of the things I learned so far from developing guardians meet is that there is a lot more moving parts to consider when working in a real time enviroment such as a dating site. I forced myself to use mongodb syntax to try to better utilize it and while I didn't use it on all of the routes I did learn about filtering and how to deal with nested arrays inside of nested arrays. I still struggle trying to find better ways to utilize the mongodb api but I'm happy with what I've learned so far.I tried out a new way to structure my react components with the view, styles, and logic is seperate files and I really think it worked out well espicially when using styled-components since it can make files huge. Profile pictures are a main component in dating websites so of course I had to have it for guardians meet which was a first for me as I've never used profile pictures in my projects. I learned about cloudinary and how to use their api which was pretty straight-forward.

## What I struggled with

One of the main things I struggled with in the beginning was figuring out how to create a infinite loading component and limit how many users were fetched in each api call. I ended up using the useOnScreen react hook which worked out really well but I still had to figure out how to track the offset and how to make sure no api calls were run if all users were fetched. I struggled also with figuring out how to use the mongodb api to update a nested array inside a nested array based on the user id and the group id. While I could've used javascript to easily update it I wanted try to figure out how to do it with the mongodb api. Overall I still used javascript for most of my routes just beause I couldn't figure out the best way to approach it with mongodb. In the future I would like to only use mongodb for my routes. I used notifications before in my [buddyfinder](https://github.com/lwatson2/buddyFinder) app however this time I used [react-toastify](https://fkhadra.github.io/react-toastify/) and making it depenedent on whenever the user logs in if they've viewed the notification or not.

## What I would change

Overall I like GuardiansMeet and what I've created however I'm not fully happy with the profile card design and I dont think I ever will be so I moved on.
