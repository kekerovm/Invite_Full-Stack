import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

const GET_GOING = "invite/GET_GOING"
const GET_NOTGOING = "invite/NOT_GOING"
const GET_USER = "invite/GET_USER"

const initialState = {
  going: [],
  notgoing: [],
  user: {},
  goingCount: 0,
  notGoingCount: 0
}
//REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOING:
      return { ...state, going: action.payload }
    case GET_NOTGOING:
      return { ...state, notgoing: action.payload }
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        goingCount: action.payload.goingCount,
        notGoingCount: action.payload.notGoingCount
      }
    default:
      return state
  }
}
//ACTIONS
function getGoing() {
  return dispatch => {
    axios.get("/api/going").then(resp => {
      dispatch({
        type: GET_GOING,
        payload: resp.data
      })
    })
  }
}

function getNotGoing() {
  return dispatch => {
    axios.get("/api/notgoing").then(resp => {
      dispatch({
        type: GET_NOTGOING,
        payload: resp.data
      })
    })
  }
}

function getUser() {
  return dispatch => {
    axios.get("/api/").then(resp => {
      dispatch({
        type: GET_USER,
        payload: {
          goingCount: resp.data.goingCount,
          notGoingCount: resp.data.notGoingCount,
          user: resp.data.user
        }
      })
    })
  }
}

function markInvitee(user, going) {
  console.log("markuser", user, going)
  return dispatch => {
    axios.post("/api/mark-invitee", { user, going }).then(resp => {
      dispatch(getUser())
    })
  }
}

export function useInvite() {
  const dispatch = useDispatch()

  const going = useSelector(appState => appState.inviteState.going)
  const notgoing = useSelector(appState => appState.inviteState.notgoing)
  const goingCount = useSelector(appState => appState.inviteState.goingCount)
  const notGoingCount = useSelector(
    appState => appState.inviteState.notGoingCount
  )
  const user = useSelector(appState => appState.inviteState.user)

  const fetchGoing = () => dispatch(getGoing())
  const fetchNotGoing = () => dispatch(getNotGoing())
  const fetchUser = () => dispatch(getUser())
  const markUser = (user, going) => dispatch(markInvitee(user, going))

  return {
    going,
    notgoing,
    fetchGoing,
    fetchNotGoing,
    fetchUser,
    goingCount,
    notGoingCount,
    user,
    markUser
  }
}
