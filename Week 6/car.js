const car = {
  brand: "Toyota",
  running: false, 

  start() {
    if (this.running) {
      console.log("Car is already running.");
      return;
    }
    this.running = true;
    console.log(`${this.brand} started.`);
  },

  stop() {
    if (!this.running) {
      console.log("Car is already stopped.");
      return;
    }
    this.running = false;
    console.log(`${this.brand} stopped.`);
  }
};

car.start(); // "Toyota started."
car.start(); // "Car is already running."
car.stop();  // "Toyota stopped."
car.stop();  // "Car is already stopped."