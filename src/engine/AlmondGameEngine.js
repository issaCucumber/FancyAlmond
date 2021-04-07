class AlmondGameEngine {

    almondCount = 0;
    gameSpeed = 10; // 10 to 100
    isPaused = false;
    almondCreateTimer = null;
    windowWidth = 0;
    windowHeight = 0;

    getHeight = () => {
        return this.containerHeightStyle;
    }

    getFallDuration = (distance, speed) => {
        let duration = Math.floor((distance / speed)*1000);
        return duration;
    }

    updateDimensions = () => {
        this.windowWidth = 800;
        this.windowHeight = 600;
    };

    generateNewAlmond() {
        if (!this.isPaused) {
            // if the game is running, generate a new almond

            let diameter = this.initDiameter();
            let startX = this.initStartPosition(diameter);
            this.almondCount++;

            return {diameter: diameter, startX: startX, id: "almond-"+this.almondCount};
        }

        return null;
    }

    initDiameter() {
        return Math.floor(Math.random() * 90) + 10;
    }

    initStartPosition(diameter) {
        let minX = 0;
        let maxX = this.windowWidth - minX;
        let diff = maxX - minX;

        let startX = Math.floor(Math.random() * diff) + minX;
        return startX;
    }

    getScore(size) {
        return Math.floor(10 * (1 / (parseInt(size) * 10 / 100)));
    }
}

export default AlmondGameEngine;