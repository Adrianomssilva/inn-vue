const app = Vue.createApp({
  data() {
    return {
      fristName: 'Caio',
    }
  },

  methods: {
    changeData() {
      this.fristName = 'Maria'
    },

    async getData() {
      let response = await fetch('http://localhost:3000/api/v1/inns')
      // console.log(response.json())

      let data = await response.json()
      console.log(data)
      data.forEach((item) => {
        var inn = new Object()
        inn.brand_name = item.brand_name
        inn.phone = item.phone
        inn.email = item.email

        console.log('-----------------')
        console.log(inn)
      })
    },
  },
})

app.mount('#app')
