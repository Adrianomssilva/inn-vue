const app = Vue.createApp({
  data() {
    return {
      searchText: '',
      innList: [],
      seeList: true,
      innSelect: null,
      roomList: [],
      reservation: {
        starDate: '',
        endDate: '',
        guestNumber: 1,
        roomId: '',
      },
      errorsFull: [],
      validationSelect: null,
    }
  },

  computed: {
    listResult() {
      if (this.searchText) {
        return this.innList.filter((inn) => {
          return inn.brandName
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        })
      } else {
        return this.innList
      }
    },
  },

  async mounted() {
    this.listResult = await this.getInns()
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

    async checkAvailability() {
      let requestData = {
        room_id: this.reservation.roomId,
        start_date: this.reservation.startDate,
        end_date: this.reservation.endDate,
        guest_number: this.reservation.guestNumber,
      }

      this.errorsFull = []
      this.validationSelect = null
      let response = await fetch(`http://localhost:3000/api/v1/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      let data = await response.json()
      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((item) => {
          this.errorsFull.push(item)
        })
      } else {
        this.validationSelect = data
        console.log(this.validationSelect)
      }
    },
  },
})

app.mount('#app')
