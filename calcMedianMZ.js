"use strict";

function get_median_of_first_week_expenses(expenses) {

    let expensesTotal = [];
    
    for( const month of Object.entries(expenses)) {
    
    //----------------------------------------------------FIRST SUNDAY CALCULATION
        
        const date = new Date(month[0]);
        let firstSunday = 0;
        
        for (let i = 1; i <= 7; i++){
            date.setDate(i);
            if (date.getDay() == 0) {
                firstSunday = i;
                break;
            } 
        };

    //---------------------------------------------------ADDING VALID EXPENSES

        for (let j = 0; j <= firstSunday; j++){
            const dayExpenses = Object.values(expenses[month[0]][`0${j}`] ??= []);
            dayExpenses?.forEach(expenseArray => {
                expensesTotal = [...expensesTotal, ... expenseArray];
            });
        };
    };

    //----------------------------------------------SORTING EXPENSES & CALC MEDIAN
     
    expensesTotal.sort(function(a, b){
            if (a > b) return 1;
            if (a < b) return -1;
        });

        const length = expensesTotal.length;
        const lengthModulo = length % 2;
        
        let median = 0;
        switch (lengthModulo) {
            case 0:
                median = (
                    (
                    expensesTotal[Math.floor((length-1)/2)] + expensesTotal[Math.ceil((length-1)/2)]
                    )
                    /2
                );
                break;
        
            default:
                median = expensesTotal[Math.ceil((length-1)/2)];
                break;
        };

    const result = median;
    return result
};