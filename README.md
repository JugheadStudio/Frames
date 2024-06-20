![Frames Header Image](https://github.com/JugheadStudio/Github-assets/blob/main/Frames/FramesHeader.png?raw=true)

<!-- HEADER SECTION -->
<h2 align="center" style="padding:0;margin:0;">Ruan Jordaan</h2>
<h5 align="center" style="padding:0;margin:0;">150139</h5>
<h6 align="center">Interactive Development 300</h6>
</br>
   
<!-- TABLE OF CONTENTS -->
## Table of Contents

- [About the Project](#about-the-project)
  - [Project Description](#project-description)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [How to install](#how-to-install)
- [Features and Functionality](#features-and-functionality)
- [UI Design Mockups](#ui-design-mockups)
- [Development Process](#development-process)
  - [Implementation Process](#implementation-process)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
  - [Video Demonstration](#video-demonstration)
- [License](#license)

<!--PROJECT DESCRIPTION-->

## About the Project

### Project Description

Frames is a dynamic photography competition platform designed for photographers of all levels. Each month, Frames collaborates with sponsors who offer exciting prizes. Participants compete by uploading their best photos aligned with the monthly theme. The winner is determined based on the number of likes received during the competition period. Join Frames to showcase your talent, engage with a vibrant community of photographers, and stand a chance to win prestigious prizes!

### Built With

- [HTML](https://html.com/)
- [CSS](https://www.w3schools.com/css/)
- [Node js](https://nodejs.org/en)
- [React-Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of

- [Visual Studio Code](https://code.visualstudio.com/) installed on your machine.
- [Firebase](https://firebase.google.com/) account set up.
- [Expo Go](https://expo.dev/go) installed on your mobile device.

### How to install

### Installation

Here are a couple of ways to clone this repo:

1.  Clone Repository </br>
    Run the following in the command-line to clone the project:

    ```sh
    git clone https://github.com/JugheadStudio/Frames.git
    ```

    Open `VS Code` and select `File | Open folder` and open the cloned repository.

2.  Install Dependencies </br>
    Run the following in the terminal to install all the required dependencies:

    ```sh
    npm install
    ```
3. Create a `secrets.js` file in your `root` folder

4. Add your firebase config to `secrets.js`
```javascript
const secrets = {
  FIREBASE_API_KEY: 'Your api key',
  FIREBASE_AUTH_DOMAIN: 'Your Auth Domain',
  FIREBASE_PROJECT_ID: 'Your Project ID',
  FIREBASE_STORAGE_BUCKET: 'Your Storage Bucket',
  FIREBASE_MESSAGING_SENDER_ID: 'Your Messaging Sender ID',
  FIREBASE_APP_ID: 'Your App ID',
  FIREBASE_MEASUREMENT_ID: 'Your Messaging ID',
};

export default secrets;
```

5. Start the project using the Terminal
```sh
npm start
```

## Features and Functionality

### Feature 1

Users can register and log in.

### Feature 2

Users can change their profile picture by clicking on the profile picture in the profile screen.

### Feature 3

Users can view current competitions and upload a photo to enter.

### Feature 4

Users can vote/like other user's entries

### Feature 5

Users can view the leaderboard to see who is in the top 10 for the current competition.


<!-- CONCEPT PROCESS -->

## UI Design Mockups

![Frames Mockup 1](https://github.com/JugheadStudio/Github-assets/blob/main/Frames/mockup2.jpg?raw=true)
![Frames Mockup 1](https://github.com/JugheadStudio/Github-assets/blob/main/Frames/mockup3.jpg?raw=true)

<!-- DEVELOPMENT PROCESS -->

## Development Process

### Implementation Process

- Used `React-Native` for the front-end of the app.
- `Firebase Authentication` used as backend for user login and registration.
- `Firestore database` used as backend for competition entries and more user information.
- `Firebase Storage` used for hosting images.

#### Highlights

- Users can register and log in.
- Users can upload photos as entries into the competition.
- Users can change their profile pictures.
- Users can like entries.
- Users can view the leaderboard to see the top 10 entries.

#### Challenges

- Getting the leaderboard to automatically update after likes have been added or removed.
- Overall the navigation was a bit confusing, but I figured it out after playing around with the different stacks.
- I had some trouble with styling the top navigation tabs.
- Overall it took some getting use to how the styling worked compared to normal CSS.

### Future Implementation

- A backend where admin can add new competitions.
- Notifications when someone likes your post.
- More setting in the profile screen where users can update username, email and password.

## Final Outcome

### Video Demonstration

To see a run through of the application, click below:

[View Demonstration Video](https://drive.google.com/file/d/1ZwfC1dtw68NJ7VuCXeVgQ5dCumgKVxcu/view?usp=sharing)

<!-- AUTHORS -->

## Authors

- **Ruan Jordaan** - [JugheadStudio](https://github.com/JugheadStudio)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- LICENSE -->
