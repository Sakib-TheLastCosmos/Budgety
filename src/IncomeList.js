import React from "react";
import formatMoney from "./config";


const IncomeList = ({incomes, deleteItem}) => {
    const incomesHTML = incomes.map(cur => {
        return (
            <div className="inc-list list-items" key={cur.id}>
                <div className="inc-items-desc items-desc">{ cur.description }</div>
                <div className="inc-items-val items-val">{ formatMoney(cur.value) }</div>
                <button className="remove-btn" onClick={() => {deleteItem(cur.id, 'incomes')}}>
                    <svg>
                        <use href="./icons.svg#icon__remove"></use>
                    </svg>
                </button>
            </div>
        )
    })

    return (
        <div className="items inc-items">
            { incomesHTML }
        </div>
    )
}

export default IncomeList;