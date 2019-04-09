class ImageAssets {
    constructor() {
        this.images = [];
        this.paths = []
    }
    addImg(path) {
        this.paths.push(path);
    }

    initialize(init) {
        // init is the function to run after all assets are loaded
        this.images = [];
        let counter = 0;

        this.paths.forEach(path => {
            const image = new Image();
            this.images.push(image); 
            image.src = path;
            image.onload = () => { 
                // Create a progress bar if you want
                counter++;
                if(counter >= this.paths.length) { 
                    this.paths = [];
                    console.log("All resources loaded. Continuing..."); 
                    console.log("Loaded " + this.images.length + " image(s).")
                    window.requestAnimationFrame(() => init()); 
                };
            }

        });
    }
    
    loadImg(path) {
        const image = new Image();
        image.src = path;
        image.onload = () => { 
            this.loaded++;
            start(); 
        }
        this.images.push(image);
        return image;
    }   
}

export default ImageAssets;