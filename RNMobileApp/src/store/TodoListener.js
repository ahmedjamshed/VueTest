import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchandTrackToDoItems = async (dispatch, loaded) => {
    try {
        let initLoading = true;
        const initialItems = [];
        const me = auth().currentUser;
        if (!me.uid) throw new Error('No User');
        const subscriber = firestore().collection("todos")
            .where(`roles.${me.uid}`, 'in', ['owner', 'collaborator'])
            .onSnapshot((querySnapshot) => {
                querySnapshot?.docChanges().forEach((change) => {
                    const item = { id: change.doc.id, ...change.doc.data() };
                    if (change.type === 'added') {
                        if (initLoading) {
                            initialItems.push(item);
                        } else {
                            // setTimeout(() => dispatch(upsertWhiteboardItem({ updates: item, fromListener: true })), 0);
                        }
                    }
                    if (change.type === 'modified') {
                        // setTimeout(() => dispatch(upsertWhiteboardItem({ updates: item, fromListener: true })), 0);
                    }
                    if (change.type === 'removed') {
                        // setTimeout(() => dispatch(deleteWhiteboardItem({ updates: item, fromListener: true })), 0);
                    }
                });
                if (initLoading) {
                    // dispatch(addAllWhiteboardItems(initialItems));
                    loaded();
                }
                initLoading = false;
            });
        return subscriber;
    } catch (e) {
        console.log(e);
        throw e;
    }
};