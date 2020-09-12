var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

// Initialise an array to hold the physical objects
var physicalObjects = [];

var PhysicalObject = function(x, y, w, h) 
{
    // Set the object's x/y position
    this.x = x;
    this.y = y;
    
    // Set the object's width and height
    this.width = w;
    this.height = h;
    
    // Initialise the object's x and y velocity with a value of 0 (it's stationary initially)
    this.xVel = 0.1;
    this.yVel = 0.1;
    
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

function screenLoop(obj) 
{    
    // Drifted off of right edge 
    if (obj.x - (obj.width / 2) > canvas.width)
        obj.x = -obj.width / 2;
    
    // Drifted off of left edge
    if (obj.x + (obj.width / 2) < 0)
        obj.x = canvas.width + obj.width / 2;
    
    // Drifted off of bottom edge 
    if (obj.y - (obj.height / 2) > canvas.height)
        obj.y = -obj.height / 2;
    
    // Drifted off of top edge
    if (obj.y + (obj.height / 2) < 0)
        obj.y = canvas.height + obj.height / 2;
}

// Function to create a new box in the canvas (on clicking button in html)
function createBox(){
    // Start the render loop
    frameRenderLoop(); 
        
    // Add an object into the engine at x: 100, y: 100, with a width and height of 20 pixels.
    physicalObjects.push(new PhysicalObject(100, 100, 20, 20));  
        
    // Give it a little push!
    physicalObjects[0].addXVel(0.1);
}


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

        screenLoop(physicalObjects[i]);
            
        // Tell the object to update itself for the next frame
        physicalObjects[i].nextFrame();
    }
} 
     
frameRenderLoop = function() 
{
    // Use requestAnimationFrame to trigger the 'frameRenderLoop' function as soon as the browser is ready to repaint
    requestAnimationFrame(frameRenderLoop);
        
    // Render the current frame
    frameRender();
}