"use strict";


// Wyznacz medianę wydatków do pierwszej niedzieli (włącznie) każdego miesiąca (np. dla 2023-09 i 2023-10 są to dni 1, 2, 3 wrz i 1 paź).

const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};


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
            return a-b;
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

console.log(get_median_of_first_week_expenses(expenses));