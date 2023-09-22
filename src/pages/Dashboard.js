import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddIncome from "../components/Modals/addincome";
import AddExpense from "../components/Modals/addexpense";
import moment from "moment/moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {

    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isEpenseModalVisible, setIsEpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

    const showExpenseModal = () => {
        setIsEpenseModalVisible(true);
    }

    const showIncomeModal = () => {
        setIsIncomeModalVisible(true);
    }

    const handleExpenseCancel = () => {
        setIsEpenseModalVisible(false);
    }
    const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false);
    }
    const onFinish = (values, type) => {
        const newTransaction = {
            type: type,
            date: moment(values.date).format("YYYY-MM-DD"),
            amount: parseFloat(values.amount),
            tag: values.tag,
            name: values.name,
        }
        addTransaction(newTransaction);
    };

    async function addTransaction(transacation) {
        try {
            const docRef = await addDoc(
                collection(db, `users/${user.uid}/transactions`),
                transacation
            );
            console.log("docref = ", docRef.id);
            toast.success("Transaction added");
        }
        catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Can't add transaction");
        }
    }


    useEffect(() => {
        fetchTransaction();
    }, [])

    async function fetchTransaction() {
        setLoading(true);
        if (user) {
            const q = query(collection(db, `users/${user.uid}/transactions`));
            const querySnapshot = await getDocs(q);
            let transactionsArray = [];
            console.log( 1);
            querySnapshot.forEach((doc) => {
                console.log( 24531);
                transactionsArray.push(doc.data());
            });
            setTransactions(transactionsArray);
            console.log("transaction arrays",transactionsArray);
            toast.success("Transactions Fetched!");
        }
        setLoading(false);
    }

    return (
        <div>
            <Header />

            {loading ?
                <><p>Loading...</p></>
                :
                <>
                    <Cards
                        showExpenseModal={showExpenseModal}
                        showIncomeModal={showIncomeModal}
                    />
                    <AddIncome
                        isIncomeModalVisible={isIncomeModalVisible}
                        handleIncomeCancel={handleIncomeCancel}
                        onFinish={onFinish}
                    />
                    <AddExpense
                        isEpenseModalVisible={isEpenseModalVisible}
                        handleExpenseCancel={handleExpenseCancel}
                        onFinish={onFinish}
                    />
                </>}
        </div>
    )
}


export default Dashboard;