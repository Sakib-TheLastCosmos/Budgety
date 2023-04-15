import React from "react";
import formatMoney from "./config";

const ExpenseList = ({expenses, deleteItem}) => {
    const expenseHTML = expenses.map(cur => {
        return (
            <div className="exp-list list-items" key={cur.id}>
                <div className="exp-items-desc items-desc">{ cur.description }</div>
                <div className="exp-items-val items-val"> {formatMoney(cur.value)} </div>
                <div className="exp-perc"> {cur.percentage.toFixed(0)}% </div>
                <button className="remove-btn" onClick={() => {deleteItem(cur.id, 'expenses')}}>
                    <svg>
                        <use href="./icons.svg#icon__remove"></use>
                    </svg>
                </button>
            </div>
        )
    })

    return (
        <div className="items exp-items">
            { expenseHTML }
        </div>
    )
}

export default ExpenseList;