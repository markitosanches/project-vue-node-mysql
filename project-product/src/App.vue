<template>
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#"><img src="./assets/img/foodies.gif" alt="foodies"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/">All Products</router-link></li>
                        <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/product-add">Add Product</router-link></li>
                        <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/about">About</router-link></li>
                        <li>
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search by type" v-model="type">
                            <button type="button" class="btn btn-outline-secondary" @click="searchType">Search</button>
                          </div>
                        </li>
                    </ul>
                    <form class="d-flex ">
                        <button class="btn btn-outline-dark" type="button" v-on:click="toggleSideBar">
                            <i class="bi-cart-fill me-1"></i>
                            Cart
                            <span class="badge bg-dark text-white ms-1 rounded-pill"> {{ totalQuantity }}</span>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
        <!-- Header-->
        <header class="bg-warning py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">Are you hungry?</h1>
                    <p class="lead fw-normal text-white-50 mb-0">Choose your meal now !</p>
                </div>
            </div>
        </header>
  <router-view
  :inventory="inventory"
  :addToCart="addToCart"
  :addInv="addInventory"
  :removeInv="removeInventory"
  :remove="removeItem"
  :updateInv="updateInventory"
  />
  <Sidebar
  v-if="showSideBar"
  :toggle="toggleSideBar"
  :cart="cart"
  :inventory="inventory"
  :remove="removeItem"
  />
</template>

<script>
import ProductDataService from '@/services/ProductDataService'
import Sidebar from '@/components/SideBar.vue'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      showSideBar: false,
      inventory: [],
      cart: {}
    }
  },
  methods: {
    toggleSideBar () {
      this.showSideBar = !this.showSideBar
    },
    addToCart (name, index) {
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += this.inventory[index].quantity
      this.inventory[index].quantity = 0
      console.log(this.cart[name])
    },
    removeItem (name) {
      delete this.cart[name]
    },
    addInventory (data) {
      this.inventory.push(data)
    },
    removeInventory (index) {
      this.inventory.splice(index, 1)
    },
    updateInventory (index, data) {
      this.inventory[index].name = data.name
      this.inventory[index].photo = data.photo
      this.inventory[index].price = data.price
      this.inventory[index].description = data.description
      this.inventory[index].type = data.type
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  mounted () {
    ProductDataService.getAll()
      .then(response => {
        this.inventory = response.data
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
