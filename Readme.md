YouTubeclone is developed using the MERN stake. 


// Frontend
Different pages are created using react with other functions to handle other work.

1. homepage
   in this component, the header, sidebar, and videos are shown
   and state-managed for the search and options of the sidebar

2.header
   in the header, if a user is already log-in then the image will be shown with the option to create the channel 
   and search input and hamburger menu used for changing the state

3.sidebar
   it is just a component of icons and p tags of their name that are shown and hidden using the hamburger menu

4. videos
    it fetches all the videos from the API and sends a token for authorization 
    and changes the videos when the filter button is clicked and if anything is searched

5. video page
    it fetches video with the videoId from API and fetches all videos for the playlist on side 
    and have a function to create comments, add likes, and add dislikes 

6. video card
   it shows video info from the data received as props

7. sign-in
   it creates a new user with the help of form and sends the data to database
   and navigate to the log-in page

8. log-in
     it helps to log the user that sign-in in or already signed in with email and password
     and it also sets user info in local storage token, image, username, and userId for different components to use
9. channel
   it creates a channel with a name and handle and if already been created then gets access to the channel page
   it shows a channel page with default videos

.*      react-router used for the different pages and lazy loading used to load the pages when required

// Backend

  a server created using express and Mongoose is used to handle the database functions
  MongoDB is used as the database 

  .1 videos
     module created for the videos Schema with all the info
     controller created for different functions like fetching all videos, fetching specific videos, adding comments, adding likes and dislike

  .2 user
     module created for the user-Schema with  username, email, password, image
     controller created for different functions like log-in and sign-in

  .3 channel
     module created channel Schema  with name, handle, and owner (which have the user ID)  
     controller created for the creating channel and fetching the channel info 
     
  *. JSON web token used for the authorization 
