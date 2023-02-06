import { createSlice } from "@reduxjs/toolkit"
const data = {
    array: []
}
const dataslice = createSlice({
    name: "data",
    initialState: data,
    reducers: ({
        Add(state, action) {
            state.array.push(action.payload)
        },
        AddTpoic(state, action) {
            let ind = 0
            state.array.map((item, index) => {
                if (item.id == action.payload.id) {
                    ind = index
                    return true
                }
                else {
                    return false
                }
            })
            state.array=[...state.array.slice(0,ind),{...state.array[ind],["list"]:[...state.array[ind].list,action.payload.obj]},...state.array.slice(ind+1)]
        },
        Display(state,action){
            let ind = 0
            state.array.map((item, index) => {
                if (item.id == action.payload.id) {
                    ind = index
                    return
                }
                else {
                    return false
                }
            })
         state.array=[...state.array.slice(0,ind),{...state.array[ind],["list"]:action.payload.l1},...state.array.slice(ind+1)]
        },
        deleteTopic(state,action){
            state.array[0].list.splice(action.payload.ind,1)
        }

    }
    )
})
export const { Add, AddTpoic,Display,deleteTopic } = dataslice.actions
export default dataslice.reducer