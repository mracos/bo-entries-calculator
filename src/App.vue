<template>
  <div id="ts">
    <div class="flex one three-1200 center">
      <div>
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
      <div>
        <pre>
          {{ orders }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ts',
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

        if (this.canMartingale) {
          gainPercent += (this.lastOrder().loss / 100)
        }

        order.id = this.orders.length
        order.order = this.bankroll * (gainPercent / this.payoutPercent)
        order.gain = order.order * this.payoutPercent
        order.loss = (order.order / this.bankroll) * 100
        if (this.canMartingale) {
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
    }
  },
  computed: {
    payoutPercent: function() {
      return (this.payout / 100)
    },
    gainPercent: function() {
      return (this.gain / 100)
    },
    canMartingale: function() {
      return (
        this.isMartingale
        && this.orders.length > 0
      )
    }
  }
}
</script>

<style lang="scss">
  @import 'node_modules/picnic/src/picnic';
</style>
