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
    function(event) {
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
                this.size = 1,
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
                    } if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy/20;
                    }
                }
                this.draw();
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
    png1.src = "data:image/png;base64,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";

    window.addEventListener("load", (event) => {
        console.log("Page has loaded");
        ctx.drawImage(png1, 0, 0);
        lollyPop();
    });