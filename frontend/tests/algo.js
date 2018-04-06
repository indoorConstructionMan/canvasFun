function Section() {

    this.classOfWall = {
        start: 0,
        middle: 0,
        end: 0
    };
    this.orientation = 0;
    this.length = 0;
    this.jointArray = [];

    this.solveSection = (sheetsArray) => {
        console.log(sheetsArray);
        console.log(this.classOfWall);

        if ( this.getStart() ) {
            for (board in sheetsArray) {
                if (sheetsArray[board] > this.getLength()) {

                }

                console.log(sheetsArray[board]);
            }


        }
    };

    this.getStart = () => {
        return this.classOfWall.start;
    };


    this.setLength = (len) => {

        if (len) {
            this.classOfWall.start = 1;
        }
        if (len > 12) {
            this.classOfWall.middle = 1;
        }
        if (len > 24) {
            this.classOfWall.end = 1;
        }

        this.length = len;
    };
    this.getLength = () => {
        return this.length;
    };
    this.setOrientation = (o) => {
        this.orientation = o;
    };
    this.getOrientation = () => {
        return this.orientation;
    };
    this.addJointArray = (ele) => {
        this.jointArray.push(ele);
    };
    this.getJointArray = () => {
        return this.jointArray;
    };
}


var topSection = new Section();
topSection.setLength(10);
topSection.solveSection([8,9,10,12]);
