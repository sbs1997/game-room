import { create } from 'zustand';
import {devtools, persist} from 'zustand/middleware'

const userIdStore = (set) => ({
    userId: 1,
    setUserId: (input)=> {set((state) => ({ userId : input }))}
})

const useUserIdStore = create(
    devtools(
        persist(userIdStore, {
            name : "userId",
        })
    )
)

export default useUserIdStore;