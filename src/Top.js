import React from "react";
import formatMoney from "./config";

const Top = ({totals}) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[new Date().getMonth()]

    return (
        <div className="top">
            <div className="top-contents-cont">
                <div className="budget-label">Available Budget in { month } { new Date().getFullYear() }</div>
                <div className="budget">{ formatMoney(totals.budget) }</div>

                <div className="total-inc-cont total-cont">
                    <div className="total-inc-label total-label">INCOME</div>
                    <div className="total-inc total">{ formatMoney(totals.income) }</div>
                </div>

                <div className="total-exp-cont total-cont">
                    <div className="total-exp-label total-label">EXPENSE</div>
                    <div className="total-exp total"> { formatMoney(totals.expense) } </div>
                    <div className="total-exp-perc">{ totals.expensePercentage != -1 ? totals.expensePercentage.toFixed(0) : '....' }%</div>
                </div>
            </div> 

        </div>
    )
}

export default Top;