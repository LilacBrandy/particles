const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//mouse
let mouse = {
    x: null,
    y: null,
    radius: 100,
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x + canvas.clientLeft/2;
        mouse.y = event.y + canvas.clientTop/2;
    });

    function lollyPop(){
        let imageWidth = png1.width;
        let imageHeight = png1.height;
        const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        class Particle {
            constructor(x, y, color, size) {
                this.x = x + canvas.width/2 - png1.width * 2,
                this.y = y + canvas.height/2 - png1.height * 2,
                this.color = color,
                this.size = size,
                this.baseX =  x + canvas.width/2 - png1.width * 2,
                this.baseY = y + canvas.height/2 - png1.height * 2,
                this.density = (Math.random() * 10) + 2;
            
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();  
            }

            update(){
                ctx.fillStyle = this.color;

                //collision detection
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
    
                //max distance
                const maxDistance = 100;
                let force = (maxDistance - distance) / maxDistance;
                if (force < 0) force = 0;
    
                let directionX = (forceDirectionX * force * this.density * 0.6);
                let directionY = (forceDirectionY * force * this.density * 0.6);

                if (distance < mouse.radius + this.size) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx/20;
                    } if(this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy/20;
                    }
                }
                this.draw()
            }
        }
        
        function init() {
            particleArray = [];

            for (let y = 0, y2 = data.height; y < y2; y++) {
                for (let x = 0, x2 = data.width; x < x2; x++) {
                    if (data.data [(y * 4 * data.width) + (x * 4) + 3] > 128) {
                        let positionX = x;
                        let positionY = y;
                        let color = "rgb("+ data.data [(y * 4 * data.width) + (x * 4)] + ","
                        + data.data[(y * 4 * data.width) + (x * 4) + 1] + ","
                        + data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";
                        particleArray.push(new Particle (positionX * 4, positionY * 4, color))
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.fillStyle = "rgba(0,0,0,.05)";
            ctx.fillRect(0, 0, innerWidth, innerHeight);

            for (let i=0; i < particleArray.length; i++) {
                particleArray[i].update();
            }
        }

        init();
        animate();

        window.addEventListener("resize",
        function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        });
    }

    const png1 = new Image();
    png1.src = "data:image/jpg;base64,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";

    window.addEventListener("load", (event) => {
        console.log("Page has loaded");
        ctx.drawImage(png1, 0, 0);
        lollyPop();
    });