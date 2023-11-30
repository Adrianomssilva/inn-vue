const app = Vue.createApp({
  data() {
    return {
      innList: [],
      seeList: true,
      innSelect: null,
      roomList: [],
    }
  },

  methods: {
    async getInns() {
      let response = await fetch('http://localhost:3000/api/v1/inns')
      // console.log(response.json())

      this.innList = []

      let data = await response.json()
      data.forEach((item) => {
        var inn = new Object()
        inn.brandName = item.brand_name
        inn.phone = item.phone
        inn.email = item.email
        inn.city = item.city
        inn.state = item.state
        inn.pets = item.pets
        inn.id = item.id

        this.innList.push(inn)
      })
    },
    async getInn(id) {
      let response = await fetch(`http://localhost:3000/api/v1/inns/${id}`)
      this.seeList = false
      this.innSelect = await response.json()
      await this.getRooms(id)
    },

    async backList() {
      this.innSelect = null
      this.getInns()
      this.seeList = true
    },

    async getRooms(id) {
      let response = await fetch(
        `http://localhost:3000/api/v1/inns/${id}/rooms`
      )
      this.roomList = []
      let data = await response.json()
      console.log(data)
      data.forEach((item) => {
        var room = new Object()
        room.name = item.name
        room.capacity = item.capacity
        room.bathroom = item.bathroom
        room.balcony = item.balcony
        room.arConditioning = item.ar_conditioning
        room.tv = item.tv
        room.wardrobe = item.wardrobe
        room.safe = item.safe
        room.description = item.description
        room.pcd = item.pcd
        room.dimension = item.dimension
        room.id = item.id

        this.roomList.push(room)
      })
    },
  },
})

app.mount('#app')
