import {
    createAsyncThunk,
    createSlice,
  } from '@reduxjs/toolkit';
  import firestore from '@react-native-firebase/firestore';
  import { isEmpty } from 'lodash';
  import auth from '@react-native-firebase/auth';
  import perf from '@react-native-firebase/perf';
  import { Collections } from '../../../../constants/collections';
  import { INBOX_ID } from '../../../../constants';
  
  export const createQuickTask = (quickTask) => {
    const userId = auth().currentUser.uid;
    const { name } = quickTask;
    if (name) {
      const docRef = firestore().collection(Collections.QUICK_TASKS).doc();
      const newQuickTask = {
        id: docRef.id,
        name,
        completed: false,
        mode: 'create',
        type: 'task',
        subtype: 'check',
        duration: null,
        deadline: null,
        allDay: true,
        roles: { [userId]: 'owner' },
        projectId: INBOX_ID,
        ...quickTask
      };
      return newQuickTask;
    }
    return null;
  };
  
  export const makeQuickTasksDoc = async () => {
    const me = auth().currentUser;
    const userId = me.uid;
    const docRef = await firestore().collection(Collections.QUICK_TASKS).doc(userId).get();
    // If user doesn't have a quickTasks document, create one.
    if (!docRef.exists) {
      const trace = await perf().startTrace('create_quick_task'); // measures how long to create
      await firestore().collection(Collections.QUICK_TASKS).doc(userId).set({
        roles: { [userId]: 'owner' },
        tasks: []
      });
      trace.stop();
    }
  };
  
  export const upsertQuickTask = createAsyncThunk('quickTasksSlice/upsertQuickTask', async ({ updates, fromListener }, { getState, dispatch }) => {
    let oldItem;
    try {
      const me = auth().currentUser;
      const userId = me.uid;
      if (!userId) return { status: 400, error: 'No User' };
      const { ...newItem } = updates;
      if (isEmpty(newItem)) return { status: 400, error: 'No Item' };
      oldItem = getState().quickTaskSlice.quickTask;
      newItem.id = userId;
      if (fromListener) dispatch(upsertQuickTaskLocal(newItem));
      else firestore().collection(Collections.QUICK_TASKS).doc(userId).set(newItem, { merge: true });
      return { status: 200 };
    } catch (e) {
      console.log(e.message);
      return { status: 400, error: e.message, item: oldItem };
    }
  });
  
  export const manageItemIdInQuickTask = createAsyncThunk('quickTasksSlice/manageItemIdInQuickTask', async ({ updates, fromListener }, { getState, dispatch }) => {
    let item;
    try {
      const me = auth().currentUser;
      const userId = me.uid;
      const {
        taskId, isDeleted
      } = updates; // fromListener will ignore firestore update
      item = getState().quickTaskSlice.quickTask;
      if (!item) return { status: 400, error: 'No Item' };
      const quickTaskRef = firestore().collection(Collections.QUICK_TASKS).doc(userId);
      if (fromListener) {
        dispatch(upsertQuickTaskLocal(item));
      } else if (isDeleted) {
        quickTaskRef.update({ tasks: firestore.FieldValue.arrayRemove(taskId) });
      } else {
        quickTaskRef.update({ tasks: firestore.FieldValue.arrayUnion(taskId) });
      }
      return { status: 200, item };
    } catch (e) {
      console.log(e.message);
      return { status: 400, error: e.message, item };
    }
  });
  
  const quickTasksSlice = createSlice({
    name: 'quickTasksSlice',
    initialState: {
      quickTask: {},
      loading: false,
      error: ''
    },
    reducers: {
      upsertQuickTaskLocal(state, { payload }) {
        state.quickTask = { ...state.quickTask, ...payload };
      },
    },
    extraReducers: {
      [upsertQuickTask.fulfilled]: (state, { payload }) => {
        upsertQuickTaskLocal(payload.item);
        if (payload.status === 400) {
          state.error = payload.error;
        }
      },
      [manageItemIdInQuickTask.fulfilled]: (state, { payload }) => {
        upsertQuickTaskLocal(payload.item);
        if (payload.status === 400) {
          state.error = payload.error;
        }
      },
    }
  });
  export const { addAllQuickTasks, upsertQuickTaskLocal, deleteQuickTaskLocal } = quickTasksSlice.actions;
  export default quickTasksSlice.reducer;