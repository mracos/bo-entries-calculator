<template>
  <div id="app">
    <div>
      <div>
        <label>Banca</label>
        <input type="number" min="0" v-model.number="bankroll">
        <label>Payout</label>
        <input type="number" min="1" max="100" v-model.number="payout">
        <label>Retorno</label>
        <input type="number" min="1" v-model="gain">
        <label>
          <input type="checkbox" v-model="isMartingale">
          <span>Martingale</span>
        </label>
        <button v-on:click="doOrders">Calcular Ordens</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Ordem</th>
              <th>Retorno</th>
              <th>Win</th>
              <th>Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders">
              <td>{{ order.id }}</td>
              <td>${{ order.order | round }}</td>
              <td>${{ order.gain | round }}</td>
              <td >
                <button v-if="isActualOrder(order.id)" v-on:click="winOrder">
                  {{ order.win | round }}%
                </button>
                <span v-else>
                  {{ order.win | round }}%
                </span>
              </td>
              <td>
                <button v-if="isActualOrder(order.id)" v-on:click="loseOrder">
                  {{ order.loss | round }}%
                </button>
                <span v-else>
                  {{ order.loss | round }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      bankroll: 100,
      payout: 91,
      gain: 15,
      isMartingale: true,
      orders: [],
    }
  },
  methods: {
    doOrders: function() {
      let bankroll = this.bankroll
      let gainPercent = this.gainPercent

      this.orders = []
      do {
        var order = {}

        if (this.canMartingale()) {
          gainPercent += (this.lastOrder().loss / 100)
        }

        order.id = this.orders.length
        order.order = this.bankroll * (gainPercent / this.payoutPercent)
        order.gain = order.order * this.payoutPercent
        order.win = this.gain
        order.loss = (order.order / this.bankroll) * 100
        if (this.canMartingale()) {
          order.loss += this.lastOrder().loss
        }
        if (order.loss > 100) {
          break
        }

        bankroll -= order.order
        this.orders.push(order)
      } while (
        order.loss < 100
        && this.isMartingale
      )
    },
    lastOrder: function() {
      return this.orders.slice(-1).pop()
    },
    canMartingale: function() {
      return (
        this.isMartingale
        && this.orders.length > 0
      )
    },
    isActualOrder: function(idOrder) {
      return (
        idOrder === this.orders[0].id
      )
    },
    winOrder: function() {
      this.bankroll += Number(this.$options.filters.round(this.orders.shift().gain))
      this.doOrders()
    },
    loseOrder: function() {
      this.bankroll -= Number(
        this.$options.filters.round(
          (this.bankroll * (this.orders.shift().loss / 100))
        )
      )
    },
  },
  computed: {
    payoutPercent: function() {
      return (this.payout / 100)
    },
    gainPercent: function() {
      return (this.gain / 100)
    },
  }
}
</script>

<style lang="scss">
</style>
