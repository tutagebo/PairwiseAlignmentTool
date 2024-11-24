class BLOSUM62{
    table = [
        [ 4, -1, -2, -2,  0, -1, -1,  0, -2, -1, -1, -1, -1, -2, -1,  1,  0, -3, -2,  0],
        [-1,  5,  0, -2, -3,  1,  0, -2,  0, -3, -2,  2, -1, -3, -2, -1, -1, -3, -2, -3],
        [-2,  0,  6,  1, -3,  0,  0,  0,  1, -3, -3,  0, -2, -3, -3,  1,  0, -4, -2, -3],
        [-2, -2,  1,  6, -3,  0,  2, -1, -1, -3, -4, -1, -3, -3, -3,  0, -1, -4, -3, -3],
        [ 0, -3, -3, -3,  9, -3, -4, -3, -3, -1, -1, -3, -1, -2, -3, -1, -1, -2, -2, -1],
        [-1,  1,  0,  0, -3,  5,  2, -2,  0, -3, -2,  1,  0, -3, -1,  0, -1, -2, -1, -2],
        [-1,  0,  0,  2, -4,  2,  5, -2,  0, -3, -3,  1, -2, -3, -1,  0, -1, -3, -2, -2],
        [ 0, -2,  0, -1, -3, -2, -2,  6, -2, -4, -4, -2, -3, -3, -2,  0, -2, -2, -3, -3],
        [-2,  0,  1, -1, -3,  0,  0, -2,  8, -3, -3, -1, -2, -1, -2, -1, -2, -2,  2, -3],
        [-1, -3, -3, -3, -1, -3, -3, -4, -3,  4,  2, -3,  1,  0, -3, -2, -1, -3, -1,  3],
        [-1, -2, -3, -4, -1, -2, -3, -4, -3,  2,  4, -2,  2,  0, -3, -2, -1, -2, -1,  1],
        [-1,  2,  0, -1, -3,  1,  1, -2, -1, -3, -2,  5, -1, -3, -1,  0, -1, -3, -2, -2],
        [-1, -1, -2, -3, -1,  0, -2, -3, -2,  1,  2, -1,  5,  0, -2, -1, -1, -1, -1,  1],
        [-2, -3, -3, -3, -2, -3, -3, -3, -1,  0,  0, -3,  0,  6, -4, -2, -2,  1,  3, -1],
        [-1, -2, -3, -3, -3, -1, -1, -2, -2, -3, -3, -1, -2, -4,  7, -1, -1, -4, -3, -2],
        [ 1, -1,  1,  0, -1,  0,  0,  0, -1, -2, -2,  0, -1, -2, -1,  4,  1, -3, -2, -2],
        [ 0, -1,  0, -1, -1, -1, -1, -2, -2, -1, -1, -1, -1, -2, -1,  1,  5, -2, -2,  0],
        [-3, -3, -4, -4, -2, -2, -3, -2, -2, -3, -2, -3, -1,  1, -4, -3, -2, 11,  2, -3],
        [-2, -2, -2, -3, -2, -1, -2, -3,  2, -1, -1, -2, -1,  3, -3, -2, -2,  2,  7, -1],
        [ 0, -3, -3, -3, -1, -2, -2, -3, -3,  3,  1, -2,  1, -1, -2, -2,  0, -3, -1,  4]
    ];
    aminoAcids = ['A', 'R', 'N', 'D', 'C', 'Q', 'E', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V'];
    constructor(){

    }
    /**
     * 
     * @param {string} base1 
     * @param {string} base2 
     */
    getScore(base1, base2){
        const base1Index = this.aminoAcids.indexOf(base1);
        const base2Index = this.aminoAcids.indexOf(base2);
        return this.table[base1Index][base2Index];
    }
}

const blosum = new BLOSUM62();

class Cell{
    score;
    isStartHorizontal = false;
    isStartVertical = false;
    nextCell=null;
    base1;
    base2;
    /**
     * 
     * @param {string} base1 
     * @param {string} base2 
     * @param {Cell} leftCell 
     * @param {Cell} leftUpperCell 
     * @param {Cell} upperCell 
     */
    constructor(base1,base2,leftCell,leftUpperCell,upperCell){
        this.base1 = base1;
        this.base2 = base2;
        const leftScore = (leftCell?.score??0)-1-11*(!(leftCell?.isStartHorizontal??0));
        const upperScore = (upperCell?.score??0)-1-11*(!(upperCell?.isStartVertical??0));
        const leftUpperScore = (leftUpperCell?.score??0)+blosum.getScore(base1,base2);
        this.score = Math.max(leftScore, upperScore, leftUpperScore, 0);
        switch(this.score){
            case leftScore:
                this.nextCell = leftCell;
                this.isStartHorizontal=true;
                break;
            case upperScore:
                this.nextCell = upperCell;
                this.isStartVertical=true;
                break;
            case leftUpperScore:
                this.nextCell = leftUpperCell;
                break;
            default:
                break;
        }
    }
}

class Calculator{
    table=[];
    constructor(baseArray1, baseArray2){
        this.baseArray1 = baseArray1;
        this.baseArray2 = baseArray2;
    }
    createTable(){
        for(let i=0;i<this.baseArray1.length;i++){
            this.table.push([]);
            for(let j=0;j<this.baseArray2.length;j++){
                const leftCell = (i>0)?this.table[i-1][j]:0
                const leftUpperCell = (i>0&&j>0)?this.table[i-1][j-1]:0
                const upperCell = (j>0)?this.table[i][j-1]:0
                this.table[i][j] = new Cell(this.baseArray1[i],this.baseArray2[j],leftCell,leftUpperCell,upperCell);
            }
        }
    }
    /**
     * 
     * @returns {Cell}
     */
    searchMaxCell(){
        let maxCell;
        let maxScore = 0;
        for(let i=0;i<this.baseArray1.length;i++){
            for(let j=0;j<this.baseArray2.length;j++){
                if(maxScore<this.table[i][j].score){
                    maxScore = this.table[i][j].score;
                    maxCell = this.table[i][j];
                }
            }
        }
        return maxCell;
    }
    createPair(){
        let baseArray1 = "";
        let baseArray2 = "";
        let nowCell = this.searchMaxCell();
        while(nowCell.nextCell!=null){
            if(nowCell.isStartVertical){
                baseArray1 = "-" + baseArray1;
                baseArray2 = nowCell.base2 + baseArray2;
            }else if(nowCell.isStartHorizontal){
                baseArray1 = nowCell.base1 + baseArray1;
                baseArray2 = "-" + baseArray2;
            }else{
                baseArray1 = nowCell.base1 + baseArray1;
                baseArray2 = nowCell.base2 + baseArray2;
            }
            nowCell = nowCell.nextCell;
        }
        this.complete1 = baseArray1;
        this.complete2 = baseArray2;
    }
}

const test = new Calculator("GCTTACGTAAGT","TACGTA");
test.createTable();
test.createPair();
console.log(test.complete1);
console.log(test.complete2);
