import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db, auth } from "../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [loan, setLoan] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchLoanAndPayments = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const loanQuery = query(
          collection(db, "loanApplications"),
          where("uid", "==", currentUser.uid),
          where("status", "==", "Approved")
        );

        const loanSnapshot = await getDocs(loanQuery);
        if (loanSnapshot.empty) {
          setLoan(null);
          setLoading(false);
          return;
        }

        const loanData = loanSnapshot.docs[0].data();
        setLoan(loanData);

        const paymentsQuery = query(
          collection(db, "payments"),
          where("userId", "==", currentUser.uid),
          where("loanId", "==", loanSnapshot.docs[0].id)
        );

        const paymentsSnapshot = await getDocs(paymentsQuery);
        const paymentRecords = paymentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPayments(paymentRecords);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching loan/payments:", error);
        setLoading(false);
      }
    };

    fetchLoanAndPayments();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!loan)
    return <p className="text-center mt-8">No approved loan found for payment history.</p>;

  const principal = loan.approvedAmount || loan.loanAmount || 0;
  const tenure = loan.loanTenure || 1;
  const interestRate = loan.interestRate || 0;

  const totalPayable = principal + (principal * interestRate * tenure) / 100;
  const monthlyPayment = totalPayable / (tenure * 12);

  // Create month-by-month payment schedule
  const paymentSchedule = [];
  let startDate = new Date();
  for (let month = 0; month < tenure * 12; month++) {
    let dueDate = new Date(startDate);
    dueDate.setMonth(startDate.getMonth() + month);

    const paymentRecord = payments.find((p) => {
      const pDate = p.paymentDate?.toDate ? p.paymentDate.toDate() : new Date(p.paymentDate);
      return (
        pDate.getMonth() === dueDate.getMonth() &&
        pDate.getFullYear() === dueDate.getFullYear()
      );
    });

    let status = "Upcoming";
    if (paymentRecord) {
      status = paymentRecord.status;
    } else if (dueDate < new Date()) {
      status = "Overdue";
    }

    paymentSchedule.push({
      dueDate,
      amount: monthlyPayment.toFixed(2),
      status,
      date: paymentRecord
        ? paymentRecord.paymentDate?.toDate?.().toLocaleDateString() || paymentRecord.paymentDate
        : "Not Paid Yet",
    });
  }

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const payment = paymentSchedule.find(
        (p) =>
          p.dueDate.getDate() === date.getDate() &&
          p.dueDate.getMonth() === date.getMonth() &&
          p.dueDate.getFullYear() === date.getFullYear()
      );

      if (payment) {
        let color = "";
        if (payment.status === "Paid") color = "bg-green-500";
        else if (payment.status === "Overdue") color = "bg-red-500";
        else if (payment.status === "Upcoming") color = "bg-yellow-500";

        return <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${color}`}></div>;
      }
    }
    return null;
  };

  const onDateClick = (date) => {
    const payment = paymentSchedule.find(
      (p) =>
        p.dueDate.getDate() === date.getDate() &&
        p.dueDate.getMonth() === date.getMonth() &&
        p.dueDate.getFullYear() === date.getFullYear()
    );
    setSelectedDate(date);
    setSelectedPayment(payment || null);
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg max-w-5xl mx-auto mt-10 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Interactive Payment Calendar</h2>

      {/* Calendar */}
      <Calendar
        onClickDay={onDateClick}
        tileContent={tileContent}
        className="mx-auto rounded-lg p-4 bg-white text-black"
      />

      {/* Payment Detail Popup */}
      {selectedPayment && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold mb-2">
            Payment Details - {selectedDate.toLocaleDateString()}
          </h3>
          <p>Amount: ₹{selectedPayment.amount}</p>
          <p>Status: {selectedPayment.status}</p>
          <p>Recorded Date: {selectedPayment.date}</p>
          <div className="mt-3 space-x-3">
            <button className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">
              Make Payment
            </button>
            <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
              Request Extension
            </button>
          </div>
        </div>
      )}

      {/* Existing Table */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Full Payment Schedule</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4">Due Date</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Payment Date</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentSchedule.map((pay, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2 px-4">{pay.dueDate.toLocaleDateString()}</td>
              <td className="py-2 px-4">₹{pay.amount}</td>
              <td className="py-2 px-4">{pay.date}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded ${
                    pay.status === "Paid"
                      ? "bg-green-600"
                      : pay.status === "Overdue"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {pay.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
