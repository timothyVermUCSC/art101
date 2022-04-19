// Pong Psuedocode.
// High level Psuedocode for the game pong.
// https://timothyvermucsc.github.io/art101/lab4/index.html
// art101/lab4/lab.js
// Timothy Vermeersch, Brent Chou
// 4.18.2022

// Make Pong Canvas/Background(Can be any Color You Want)
  // Generate Two Paddles on Both Sides of the Screen
  // Make Boundaries On the Top and Bottom of the Screen
  // Generate a Ball in the middle of the Screen
  // Accept User Input (Arrow Keys Pressed to Control Paddle)
    // Move the Ball Around the Screen
      // If the Ball Hits a Paddle, Bounce it back in the Other Direction
      // If the Ball Leaves the Screen, Check Which Side it Left On
        // Add a Point to Whoever Scored
          // Check if Someone Reaches 7 Points, They Win
