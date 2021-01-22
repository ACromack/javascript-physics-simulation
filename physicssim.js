var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

// Initialise an array to hold the physical objects
var physicalObjects = [];

// Gravity var to apply to all objs Y Vel
var gravityYVel = 0.2;

var PhysicalObject = function(x, y, w, h) 
{
    // Set the object's x/y position
    this.x = x;
    this.y = y;
    
    // Set the object's width and height
    this.width = w;
    this.height = h;
    
    // Initialise the object's x and y velocity with a value of 0 (it's stationary initially)
    this.xVel = 0;
    this.yVel = 0;
    
    // Adjust the object's x velocity
    this.addXVel = function(vel) { 
        this.xVel += vel;
    };
    
    // Adjust the object's y velocity
    this.addYVel = function(vel) { 
        this.yVel += vel;
    };
    
    // Update the object's position for the next frame
    this.nextFrame = function() { 
        this.x += this.xVel;
        this.y += this.yVel;
    }
} 

// Function to deal with detecting collisions between boxes and the boundaries of the canvas
function screenEdgeCollDetect(obj) 
{    
    // Right Edge Collision
    if (obj.x + obj.width >= canvas.width)
        obj.xVel = -obj.xVel;
    
    // Left Edge Collision
    if (obj.x <= 0)
        obj.xVel = -obj.xVel;
    
    // Botton Edge Collision
    if (obj.y + obj.height >= canvas.height){
        obj.yVel = -(obj.yVel * 0.8);
        obj.y = canvas.height - obj.height;
    }
        //obj.yVel = -obj.yVel;
    
    // Top Edge Collision
    if (obj.y <= 0)
        obj.yVel = -obj.yVel;
}

// Function to create a new box in the canvas (on clicking button in html)
function createBox(){
    // Start the render loop
    frameRenderLoop(); 
        
    // Add an object into the engine at x: 100, y: 100, with a width and height of 20 pixels.
    physicalObjects.push(new PhysicalObject(100, 100, 20, 20));
}

// Function to render each frame
frameRender = function() 
{
    // Clear view
    ctx.clearRect(0, 0, width, height);
    
    // For each object in the physicalObjects array...
    for (var i = 0; i < physicalObjects.length; i++) {
        
        // Draw a rectangle on the canvas to represent the object, based on the object's x, y, width and height
        ctx.fillRect(
            physicalObjects[i].x, 
            physicalObjects[i].y, 
            physicalObjects[i].width, 
            physicalObjects[i].height
        );

        physicalObjects[i].addYVel(gravityYVel);
        screenEdgeCollDetect(physicalObjects[i]);
            
        // Tell the object to update itself for the next frame
        physicalObjects[i].nextFrame();
    }
} 

// Function to handle the render loop
frameRenderLoop = function() 
{
    // Use requestAnimationFrame to trigger the 'frameRenderLoop' function as soon as the browser is ready to repaint
    requestAnimationFrame(frameRenderLoop);
        
    // Render the current frame
    frameRender();
}