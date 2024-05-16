/*
1. Deposit Money - ✔
2. Number of Lines to bet(1-3) - ✔
3. Bet Amount per Line - ✔
4. Spin Slot Machine - ✔
5. Check if user won - ✔
6. Give the User their Winnings
7. Play Again
*/

const prompt = require("prompt-sync")();


const ROWS  = 3
const COLM = 3;
const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
} 
const SYMBOLS_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}



function deposit()
{
    while(true)
    {
        const depositAmount = prompt("Enter a deposit amount : ")
    const numDepositAmount = parseFloat(depositAmount)

    if(isNaN(numDepositAmount) || numDepositAmount <= 0)
    {
        console.log("Enter a valid number");
    }
    else
    {
        return numDepositAmount

    }
    }
}

function getNumberOfLines()
{
    while(true)
    {
        const numberOfLines = prompt("Enter Number Of Lines to bet on (1 - 3) : ")
    const numLines = parseFloat(numberOfLines)

    if(isNaN(numLines) || numLines > 3 || numLines <= 0)
    {
        console.log("Enter a valid number between 1 - 3");
    }
    else
    {
        return numLines

    }
}


}

function betAmount(balance,numLines)
{
    while(true)
    {
    const inpt = prompt("Enter the Bet Amount per Line : ");
    const betAmnt = parseFloat(inpt)

    
        if(isNaN(betAmnt) ||  betAmnt <= 0)
        {
            console.log("Enter a valid amount");
        }
        else if(betAmnt > balance / numLines)
        {
            console.log("Insuffient Balance !!")
        }
        else
        {
            return betAmnt
        }
    }

}

function spin()
{
    const symbols = []
    for(const [symb,c] of Object.entries(SYMBOLS_COUNT))
    {
        for(let i = 0; i < c; i++)
        {
            symbols.push(symb)
        }

    }
    const reels = []
    for(let i = 0 ; i < COLM; i++)
    {
        reels.push([])
        const reelSymbol = [...symbols]
        for(let j = 0; j < ROWS; j++ )
        {
            const randomIndex = Math.floor(Math.random() * reelSymbol.length)
            const selectedSymbol = reelSymbol[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbol.splice(randomIndex,1)

        }
    }
    return reels
}

function transpose(reels)
{
    const rows = []
    for(let i = 0 ; i < ROWS; i++)
    {
        rows.push([])
        for(let j = 0;j < COLM ; j++)
        {
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

function printRows(rows)
{
    for(const row of rows)
    {
        let rowString = ""
        for(const [i,symbol] of row.entries())
        {
            rowString += symbol
            if(i != rows.length - 1)
            {
                rowString += " | "

            }
        }

        console.log(rowString)
    }
}

function getWinnings(rows,betAmnt,numLines)
{
    let winnings = 0
    for(let row = 0; row < numLines ; row++)
    {
        const symbols = rows[row]
        let allSame = true
        for(const symbol of symbols)
        {
            if(symbol != symbol[0])
            {
                allSame = false
                break;
            }
        }
        if(allSame)
        {
            winnings += betAmnt * SYMBOLS_VALUE[symbols[0]]
        }
    }
    return winnings
}

function game()
{
    let balance = deposit();
    while(true)
    {
    console.log("Balance : $" + balance)
    const numLines = getNumberOfLines();
    const betAmnt = betAmount(balance,numLines)
    balance -= betAmnt * numLines
    const reels = spin()
    const rows = transpose(reels)
    printRows(rows)
    const winnings = getWinnings(rows,betAmnt,numLines)
    balance += winnings
    console.log("You Won, $" + winnings.toString())
    if(balance <= 0)
    {
        console.log("You ran out of money")
        break;
    }
    const playAgain = prompt("Do you want to play Again : (y / n)");
    if(playAgain != "y") break;



    }

}

game()




