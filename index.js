window.addEventListener( 'load', init );
window.addEventListener( 'resize', resize );


let particles = [];
let particleCount = 200;

let canvas = null;
let context = null;

let palette = ['#F00', '#0F0', '#00F', '#FF0'];

let gradient = null;




// Initializes the drawing example after the browser window had finished loading the DOM.
function init(){
    
    console.log( 'This is a Test');
    
    canvas = document.getElementById( 'animation-surface' );
    context = canvas.getContext( '2d' );
    
    for (var i = 0; i < particleCount; i++){
        
        let randomColourIndex = Math.round( ( palette.length - 1) * Math.random() );
        
        let speed = Math.random() * 10;
        let angle = Math.PI * 2 * Math.random();
    
        let particle = {
    
    x : canvas.width * 0.5,
    y : canvas.height * 0.5,
    vx : Math.cos( angle ) - speed,
    vy : Math.sin( angle ) - speed,
    radius : 15 * Math.random(),
    colour : palette[ randomColourIndex ]
    
};
    
    particles.push ( particle );
    }
    
    resize();
    update();
    
}

function update(){
    
    
    context.clearRect( 0, 0, canvas.width, canvas.height );
    
    for (let i = 0; i < particleCount; i++ ){
        
        let particle = particles[ i ];
        
    particle.vy += 0;
    
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    if (particle.y > canvas.height) {
        
        particle.y = canvas.height;
        particle.vy = -particle.vy;
    } else if (particle.y < 0) {
        
        particle.y = 0;
        particle.vy = -particle.vy;
    }
    
    if(particle.x > canvas.width) {
        
        particle.x = canvas.width;
        particle.vx = -particle.vx;
    } else if (particle.x < 0 ) {
        
        particle.x = 0;
        particle.vx = -particle.vx;
    }
    
    drawParticle( context, particle );
    }
    
    context.save();
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );
    context.restore();
    
    requestAnimationFrame( update );
}

function drawParticle( context, particle ){
    
        context.fillStyle = particle.colour;
       
        context.beginPath();
        context.arc( particle.x, particle.y, particle.radius, 0, Math.PI *2 );
        context.closePath();
        context.fill();
   
}


//resizes the canvas to match the browser window

function resize (){
    if (canvas) {
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        gradient = context.createLinearGradient(0,0, canvas.width, canvas.height);
        gradient.addColorStop( 0, 'rgb(0, 144, 142)' );
        gradient.addColorStop( 1, 'rgb(162, 0, 141)' );
    }
    
}