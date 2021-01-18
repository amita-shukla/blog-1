---
title: Solve the N queen's problem using backtracking
tags: ["ALGORITHMS","JAVA","PROGRAMMING"]
cover: NQueen.png
author: Amita Shukla
---


### Problem Statement:

Given a NxN chess board, find a way to place N queens in such a way that no queen is in danger from another.

A queen is said to be in danger from another when both the queens share the same row, column or diagonal.

One of the solutions to the 4-Queen's Puzzle is:

 


[![](http://4.bp.blogspot.com/-qrch24vNM4Q/VoVttnOzI9I/AAAAAAAAAr0/8woPBuzHis8/s1600/NQueen.png)](http://4.bp.blogspot.com/-qrch24vNM4Q/VoVttnOzI9I/AAAAAAAAAr0/8woPBuzHis8/s1600/NQueen.png)

 
Solutions to this problem exist for all natural numbers N, with N=2 and N=3 as exception. 
 
This is a classic example of a problem that can be solved using a technique called **Recursive Backtracking**. 
 


### Strategy:

How do we go about solving this problem programmatically?

We can try all possible places one by one. But, we can observe, that we do not need to go beyond a certain limiting condition, when we realize that a solution is not possible.

 


- Take one row at a time.
- Now, given a row, consider one column at a time and check if it is \"safe\" to place the queen in the cell.
- If we find the column is safe, then place the queen, and make a recursive call to place the queen on the next row.
- If we can’t find one, backtrack by returning from the recursive call, and try to find another safe column in the previous row.

So, the main routine is `findSafeColumn(int row)`

 


| 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21 | private static void findSafeColumn(int row) {
 if (row == (boardSize)) {
 addBoard();
 return;
 }
 
 // iterate over each column
 for (int col = 0; col < boardSize; col++) {
 if (isSafe(row, col)) {
 placeQueen(row, col);
 
 // move on to next row
 findSafeColumn(row + 1);

 // when we have got here, means backTracked.
 // now remove the queen you have placed so as 
 //to check the next col
 removeQueen(row, col);
 } 
 }
 } |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

 
This is the main outline of the whole program.

 


Line 2 forms the base case, that is, if the variable row becomes equal to the size of the board, then the present configuration can be added as one of the solutions. 
The method `addBoard()` does exactly that. 
 
The methods `placeQueen()` and `removeQueen()` will be described later. 
 


### How to implement the chess board?

We can implement a chess board using a 2-D boolean array, like, 
 
private static boolean\[]\[] board; 
 
We also keep track of the board size, as we need it at many places later. 
 
private static int boardSize; 
 


### Implementing `placeQueen()`, `removeQueen()` , and `isSafe()`

It seems a 2- dimentional array is sufficient to implement placeQueen() and removeQueen functions as follows: 
 
private void placeQueen(int row, int col) { 
board\[row]\[col] = true; 
} 
private void removeQueen(int row, int col) { 
board\[row]\[col] = false; 
} 
 
But, the method isSafe() becomes too complex. 
 
A workaround this problem is introducing the following data structures (array of booleans): 
 
private static boolean\[] colEmpty; 
private static boolean\[] upDiagEmpty; 
private static boolean\[] downDiagEmpty; 
 
An entry in one of these arrays is 
true if no queen is placed in the corresponding column or diagonal, 
false otherwise 
 
But now we need to map these boolean arrays to our 2 dimentional board: 


| [![](http://4.bp.blogspot.com/-qiH-64xzPN4/VoV85r-YqyI/AAAAAAAAAsQ/OprNx8Q_AXM/s1600/DownDiag.png)](http://4.bp.blogspot.com/-qiH-64xzPN4/VoV85r-YqyI/AAAAAAAAAsQ/OprNx8Q_AXM/s1600/DownDiag.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| upDiagonal = row + col |

 


| 
 | |
| --- | --- |

 
 


 


 


| [![](http://3.bp.blogspot.com/-znpNqpsZHR8/VoV85sEp0hI/AAAAAAAAAsM/CVq84A0BCEg/s1600/UpDiag.png)](http://3.bp.blogspot.com/-znpNqpsZHR8/VoV85sEp0hI/AAAAAAAAAsM/CVq84A0BCEg/s1600/UpDiag.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| downDiagonal = (boardSize - 1) + row - col |

 


We use these additional arrays as follows:

 


| 1
 2
 3
 4
 5
 6 | private static void removeQueen(int row, int col) {
 board[row][col] = false;
 colEmpty[col] = true;
 upDiagEmpty[row + col] = true;
 downDiagEmpty[boardSize - 1 + row - col] = true;
 } |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

 


| 1
 2
 3
 4
 5
 6 | private static void placeQueen(int row, int col) {
 board[row][col] = true;
 colEmpty[col] = false;
 upDiagEmpty[row + col] = false;
 downDiagEmpty[boardSize - 1 + row - col] = false;
 } |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| 1
 2
 3
 4
 5
 6
 7
 8
 9 | private static boolean isSafe(int row, int col) {
 // if col & up diag & down diag is empty, then the given position is
 // safe
 if (colEmpty[col] && upDiagEmpty[row + col]
 && downDiagEmpty[boardSize - 1 + row - col]) {
 return true;
 }
 return false;
 } |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

 
To save all the solutions of N-Queens problem, we can have an arraylist named `solutions` as follows: 
static ArrayList&lt;ArrayList&lt;String>> solutions; 
 
Method that initializes all the data structures used and calls the recursive `findSafeColumn()` method: 


| ```

``` 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18 | ```

``` public static void solveNQueens(int n) { // take the board as a boolean array. A true value indicates the
 // presence of queen.
 board = new boolean[n][n];
 boardSize = n;
 solutions = new ArrayList<ArrayList<String>>();
 colEmpty = new boolean[n];
 upDiagEmpty = new boolean[2 blogger_posts blogger_posts.json blogger_posts_old blogger_posts_v2.json create_blogger_posts.sh n - 1];
 downDiagEmpty = new boolean[2 blogger_posts blogger_posts.json blogger_posts_old blogger_posts_v2.json create_blogger_posts.sh n - 1];
 Arrays.fill(colEmpty,true);
 Arrays.fill(upDiagEmpty, true);
 Arrays.fill(downDiagEmpty, true);

 // try the first row
 findSafeColumn(0);
 
 //return solutions;
 } |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

 
The method `addBoard()` is used to fill up the solutions arrayList: 


 


| 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14 | private static void addBoard() {
 ArrayList<String> boardList = new ArrayList<>();
 for(int i=0; i<boardSize;i++){
 String row = \"\";
 for(int j=0;j<boardSize;j++){
 if(board[i][j])
 row = row.concat(\"Q\");
 else
 row = row.concat(\".\");
 }
 boardList.add(row);
 }
 solutions.add(boardList);
 } |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

 
We're done! 
Call the main method as: 


 


| 1
 2
 3
 4
 5
 6 | public static void main(String[] args) {
 
 solveNQueens(8);
 System.out.println(solutions.toString());

 } |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |

 


The output shown for 4 Queens is:

\[\[.Q.., ...Q, Q..., ..Q.], \[..Q., Q..., ...Q, .Q..]]

 


Click [here](https://github.com/amita-shukla/programs/blob/master/NQueens.java) to get the complete code.

 


