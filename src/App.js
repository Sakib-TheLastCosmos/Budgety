import React from 'react';
import Top from './Top';
import AddItem from './AddItem';
import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import db from './index';


const init = async () => {
  const docRef = doc(db, "data", "main")
  const docSnap = await getDoc(docRef)
  
  let state;
  
  if (docSnap.exists()) {
    state = docSnap.data()
  } else {
    state = {
      totals: {
        income: 0,
        expense: 0,
        expensePercentage: 0,
        budget: 0
      },
  
      incomes: [],
      expenses: []
    }
  
    await setDoc(docRef, state)
  }

  return state;
}



class App extends React.Component {
  state = {
    totals: {
      income: 0,
      expense: 0,
      expensePercentage: 0,
      budget: 0
    },

    incomes: [],
    expenses: []
  };

  async componentDidMount () {
    const state = await init()

    await this.setState({
      totals: state.totals,
      incomes: state.incomes,
      expenses: state.expenses
    })
  }


  update = async () => {
    const incomes = this.state.incomes;
    let income = 0;
    incomes.forEach(cur => {
      income += cur.value
    })

    const expenses = [...this.state.expenses]
    let expense = 0;
    expenses.forEach(cur => {
      expense += cur.value
      cur.percentage = Math.ceil((cur.value / income) * 100)
    })

    const budget = income - expense

    let expensePercentage = -1;
    if (income != 0) expensePercentage = (expense / income) * 100

    await this.setState(prevState => ({
      totals: {
        income: income,
        expense: expense,
        expensePercentage: expensePercentage,
        budget: budget
      }, 

      expenses: expenses
    }))

    const docRef = doc(db, "data", "main")
    await setDoc(docRef, this.state)
  }


  addItem = async item => {
    const type = item.type == 'inc' ? 'incomes' : 'expenses'

    if (type == 'expenses') item.percentage = (item.value / this.state.totals.income) * 100

    await this.setState(prevState => ({
      [type]: [...prevState[type], item]
    }))

    await this.update()
  }


  deleteItem = async (id, type) => {
    console.log(id, type, [...this.state[type]])

    await this.setState({
      [type]: this.state[type].filter(cur => {
        return cur.id != id
      })
    })

    this.update()
  }



  render () {
    return (
      <div className='whole-cont'>
          <Top totals={this.state.totals}/>

          <div className='bottom'>
            <AddItem addItem={ this.addItem } />

            <div className='items-cont'>
              <div className="inc-cont inc-exp-cont">
                  <div className="type-label inc-label">INCOMES</div>

                  <IncomeList incomes={this.state.incomes} deleteItem={this.deleteItem}/>
                </div>
            </div>

            <div className="exp-cont inc-exp-cont">
              <div className="type-label exp-label">EXPENSES</div>

              <ExpenseList expenses={this.state.expenses} deleteItem={this.deleteItem}/>
            </div>
          </div>
      </div>
    )
  }
}

export default App;
