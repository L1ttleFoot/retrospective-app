import { getDatabase, get, ref } from "firebase/database";
import { useEffect } from "react";
import { useDiscassions } from "../../../../../store/useDiscassions";
import { useWorkspace } from "../../../../../store/useWorkspace";

export const useDiscassionData = () => {

    const db = getDatabase();

    const { setDiscassionsData } = useDiscassions();
    const { setWorkspaceData} = useWorkspace()

    useEffect(() => {
        const discassionsRef = ref(db, `discassions/`)
        const workspacesRef = ref(db, `workspaces/`)

        get(discassionsRef).then((snapshot) => {
            if (snapshot.exists()) {
                setDiscassionsData(Object.values(snapshot.val()))
            } else {
                setDiscassionsData([])
            }
        }).catch((error) => {
            console.error(error);
        });

        get(workspacesRef).then((snapshot) => {
            if (snapshot.exists()) {
                setWorkspaceData(Object.values(snapshot.val()))
            } else {
                setWorkspaceData([])
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [db, setDiscassionsData, setWorkspaceData])

}