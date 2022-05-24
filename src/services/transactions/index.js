/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import {
  collection,
  query,
  where,
  addDoc,
  runTransaction,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';

export default function useTransactions(accountId = '') {
  const transactionCollection = collection(firestore, 'transactions');
  const transactionQuery = query(transactionCollection, where('account', '==', accountId));
  const [transactions, isLoading, error] = useCollection(transactionQuery);

  const createTransaction = async (payload, successCb, errorCb) => {
    const { description, value, created_at, category, account, type } = payload;

    try {
      await runTransaction(firestore, async (transaction) => {
        const accountDoc = doc(firestore, 'accounts', account);
        const sfDoc = await transaction.get(accountDoc);

        if (!sfDoc.exists()) {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'Document does not exist!' };
        }

        const newBalance =
          type === 'earning' ? sfDoc.data().balance + value : sfDoc.data().balance - value;

        // eslint-disable-next-line no-throw-literal
        if (newBalance < 0) throw { message: 'Sem saldo suficiente' };

        await addDoc(transactionCollection, {
          description,
          value,
          created_at,
          category,
          account,
          type,
        });
        transaction.update(accountDoc, { balance: newBalance });
      });

      successCb && successCb();
    } catch (err) {
      errorCb && errorCb(err);
    }
  };

  const editTransaction = async (payload, successCb, errorCb) => {
    const { id, description, value, prevValue, created_at, category, account, type } = payload;
    const previousValue = Number(prevValue);
    const newVal = Number(value);

    try {
      await runTransaction(firestore, async (transaction) => {
        const accountDoc = doc(firestore, 'accounts', account);
        const transactionDoc = doc(firestore, 'transactions', id);
        const accountDocTransaction = await transaction.get(accountDoc);

        if (!accountDocTransaction.exists() || !accountDocTransaction.exists()) {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'Document does not exist!' };
        }

        const newBalance =
          type === 'earning'
            ? accountDocTransaction.data().balance - previousValue + newVal
            : accountDocTransaction.data().balance + previousValue - newVal;

        // eslint-disable-next-line no-throw-literal
        if (newBalance < 0) throw { message: 'Saldo insuficiente' };

        await setDoc(
          transactionDoc,
          {
            description,
            value: newVal,
            created_at,
            category,
            account,
            type,
          },
          { merge: true }
        );
        transaction.update(accountDoc, { balance: newBalance });
      });

      successCb && successCb();
    } catch (err) {
      errorCb && errorCb(err);
    }
  };

  const deleteTransaction = async (payload, successCb, errorCb) => {
    const { account, id: transactionId, type, value } = payload;

    try {
      await runTransaction(firestore, async (tr) => {
        const accountDoc = doc(firestore, 'accounts', account);
        const sfDoc = await tr.get(accountDoc);
        const transactionDoc = doc(firestore, 'transactions', transactionId);

        if (!sfDoc.exists()) {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'Document does not exist!' };
        }

        const newBalance =
          type === 'earning' ? sfDoc.data().balance - value : sfDoc.data().balance + value;

        await deleteDoc(transactionDoc);
        // eslint-disable-next-line no-throw-literal
        tr.update(accountDoc, { balance: newBalance });
      });

      successCb && successCb();
    } catch (err) {
      errorCb && errorCb(err);
    }
  };

  return {
    transactions: transactions && transactions.docs.map((e) => ({ id: e.id, ...e.data() })),
    isLoading,
    error,
    createTransaction,
    editTransaction,
    deleteTransaction,
  };
}
