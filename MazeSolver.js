class Grid
{
    constructor(arr)
    {
        if (arr !== undefined)
        {
            // create outer array of the same length as arr
            this.grid = Array.from(arr.length);

            for (var i = 0; i < arr.length; i++)
                this.grid[i] = Array.from(arr[i]);
        }

        else
        {
            var dimension = 6;
            this.grid = new Array(dimension);

            for (var i = 0; i < this.grid.length; i++)
            {
                this.grid[i] = new Array(dimension);

                for (var j = 0; j < this.grid[i].length; j++)
                    this.grid[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }
    // Helper function to print the grid
    printArray()
    {
        // Iterate the grid
        for (var i = 0; i < this.grid.length; i++)
        {
            for (var j =0; j < this.grid[i].length; j++)
            {
                // Print X or O
                if(this.grid[i][j] === 0)
                    process.stdout.write(`X `);
                else
                    process.stdout.write(`O `);
            }
            console.log('');
        }
    }
}

class MazeSolver extends Grid
{
    constructor(arr)
    {
        super(arr); // initialize the grid
    }

    canTraverse(x,y)
    {
        if (0 <= x && x < this.grid.length)
            if (0 <= y && y < this.grid[x].length)
                if (this.grid[x][y] === 1)
                    return true;

        return false;
    }

    getNeighbours(x, y)
    {
        var neighbours = new Array();
        var moves = [[0, -1], [-1, 0], [0, 1], [1, 0]];

        for (var i = 0; i < moves.length; i++)
        {
            var newRow = x + moves[i][0];
            var newCol = y + moves[i][1];

            if (this.canTraverse(newRow, newCol))
                neighbours.push([newRow, newCol]);
        }

        return neighbours;
    }

    checkVisited(x,y,visited)
    {
        for (var i = 0; i < visited.length; i++)
        {
            if (x === visited[i][0])
                if (y === visited[i][1])
                    return true;
        }

        return false;
    }

    solve(x1,y1, x2, y2)
    {
        var positions = new Array();
        var visited = new Array();

        if (this.canTraverse(x1, y1))
            positions.push([x1, y1]);

        visited.push([x1, y1]);

        while (positions.length !== 0)
        {
            var pos = positions.pop();

            if (pos[0] === x2 && pos[1] === y2)
                return true;

            var neighbours = this.getNeighbours(pos[0], pos[1]);

            neighbours.forEach((_, ind) =>
            {
                var row = neighbours[ind][0];
                var col = neighbours[ind][1];

                if (!this.checkVisited(neighbours[ind][0], neighbours[ind][1], visited))
                {
                    visited.push([row, col]);
                    positions.push([row, col]);
                }
            });
        }

        return false;
    }
}
