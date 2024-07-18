import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>
          <div className="balance">
            <h3> Your Balance</h3>
            {balance >= 0 ? <h2> Rs-{balance}/-</h2> : <h2> -Rs{balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>Rs-{income}</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>Rs-{expenses}</p>
            </div>
          </div>
          <h2>ADD A NEW TRANSACTION</h2>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>

            <button type="submit"> Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={profilePhoto} alt="" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>


      {/* <div className="transactions">
        <h3> Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p>
                  ${transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div> */}
      <div className="transactions">
  <h3>Transactions</h3>
  <div class="container">
    <table className="responsive-table">
      <thead className="table-header">
        <tr>
          <th className="col col-1">Description</th>
          <th className="col col-2">Amount</th>
          <th className="col col-3">Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="table-row">
            <td className="col col-1" data-label="Description">
              {transaction.description}
            </td>
            <td className="col col-2" data-label="Amount">
              Rs-{transaction.transactionAmount}
            </td>
            <td className="col col-3" data-label="Type">
              <label
                style={{
                  color: transaction.transactionType === "expense" ? "red" : "green",
                }}
              >
                {transaction.transactionType}
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </>
  );
};