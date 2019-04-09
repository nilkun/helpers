import Vector from "../Vector.js";

export default class Polygon2D {
    constructor(coords = []) {
       this.point = coords; 
        this.scale = 60;
        this.radians = 0;
    }

    rotate(radians) {
        let rotated = [];
        for(let i = 0; i < this.point.length; i++) {    
            let x = this.point[i].x;
            let y = this.point[i].y;
            rotated.push(new Vector(
                x * Math.cos(radians) - y * Math.sin(radians), 
                x * Math.sin(radians) + y * Math.cos(radians)
            ));
        }
        return rotated;
    }

    pentagon() {
        const next = Math.PI * 2 / 5; // 108 degrees
        for(let rotate = 0; rotate < 5; rotate++) {
            this.point.push(new Vector(Math.sin(next * rotate), Math.cos(next * rotate)));
        }
    }
    star() {
        const pointiness = .5;
        const next = Math.PI * 2 / 5; // 108 degrees
        const half = next/2;
        for(let rotate = 0; rotate < 5; rotate++) {
            this.point.push(new Vector(Math.sin(next * rotate), Math.cos(next * rotate)));
            this.point.push(new Vector(pointiness * Math.sin(half +  next * rotate), pointiness * Math.cos(half + next * rotate)));
        }
    }

    render(renderer, position = new Vector(400, 300)) {
        renderer.beginPath();
        let currentPoly = this.rotate(this.radians);
        renderer.moveTo(Math.floor(position.x + this.scale * currentPoly[0].x), Math.floor(position.y - this.scale * currentPoly[0].y));
        for(let i = 1; i < this.point.length; i++) {
            renderer.lineTo(Math.floor(position.x + this.scale * currentPoly[i].x), Math.floor(position.y - this.scale * currentPoly[i].y));
        }
        renderer.lineTo(Math.floor(position.x + this.scale * currentPoly[0].x), Math.floor(position.y - this.scale * currentPoly[0].y));
        renderer.fillStyle = "red";
        renderer.fill();
        renderer.stroke();
    }
}