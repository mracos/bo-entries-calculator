<template>
  <div id="app">
    <div class="flex one four-1200 center">
      <div class="one-fourth-1200">
        <label>Banca</label>
        <input type="text" v-model.number="bankroll">
        <label>Payout</label>
        <input type="text" v-model.number="payout">
        <label>Retorno</label>
        <input type="text" v-model="gain">
        <label>
          <input type="checkbox" v-model="isMartingale">
          <span class="checkable">Martingale</span>
        </label>
        <button v-on:click="doOrders">Ordens</button>
      </div>
      <div class="half">
        <table class="primary">
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
              <td class="success">{{ order.win | round }}%</td>
              <td class="error">{{ order.loss | round }}%</td>
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
        order.loss = (order.order / this.bankroll) * 100
        if (this.canMartingale()) {
          order.loss += this.lastOrder().loss
        }
        order.win = this.gain

        bankroll -= order.order
        this.orders.push(order)
      } while (
        order.loss < 50
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
    }
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
  @import 'node_modules/picnic/src/picnic';
</style>
