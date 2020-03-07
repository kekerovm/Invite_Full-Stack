const express = require("express")
const router = express.Router()
const axios = require("axios")

const data = {
  going: [],
  notgoing: []
}

router.get("/", (req, res, next) => {
  axios
    .get("https://randomuser.me/api?results=1")
    .then(resp => {
      const results = resp.data.results
      const user = {
        name: results[0].name.first + "" + results[0].name.last,
        img: results[0].picture.large,
        phone: results[0].phone,
        email: results[0].email
      }

      res.json({
        user,
        goingCount: data.going.length,
        notGoingCount: data.notgoing.length
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.get("/going", (req, res, next) => {
  res.json(data.going)
})

router.get("/notgoing", (req, res, next) => {
  res.json(data.notgoing)
})

router.post("/mark-invitee", (req, res, next) => {
  const going = req.body.going
  console.log(req.body)

  if (going) {
    data.going.push(req.body.user)
  } else {
    data.notgoing.push(req.body.user)
  }

  res.json({
    status: going ? "going" : "notgoing",
    user: req.body.user
  })
})

module.exports = router
