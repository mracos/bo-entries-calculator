<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="card-block">
              <h3 class="card-title">Trading System</h3>
              <ts-form
                :bankroll="this.bankroll"
                :payout="this.payout"
                :gain="this.gain"
                :is-martingale="this.isMartingale"
                @doOrders="this.doOrders"
              ></ts-form>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-block">
              <vue-tabs>
                <v-tab title="Ordens">
                  <ts-orders
                    :orders="this.orders"
                    @win="doOrder({win:true})"
                    @lose="doOrder({win:false})"
                  ></ts-orders>
                </v-tab>
                <v-tab title="Histórico" v-if="this.history.length > 0">
                  <ts-history
                    :history="this.history"
                  ></ts-history>
                </v-tab>
              </vue-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css';

import TsForm from './components/Form.vue'
import TsOrders from './components/Orders.vue'
import TsHistory from './components/History.vue'

export default {
  name: 'app',
  components: {
    VueTabs,
    VTab,
    TsForm,
    TsOrders,
    TsHistory,
  },
  data () {
    return {
      bankroll: 100,
      payout: 90,
      gain: 1,
      isMartingale: false,
      orders: [],
      history: [],
    }
  },
  methods: {
    doOrders: function() {
      this.orders = []

      while (
        this.orders.length === 0
        || this.isMartingale
      ) {
        let order = {}

        order.id = this.orders.length
        order.order = this.bankroll * (
          (this.gainPercent() + this.lastLossOrZeroPercent()) / this.payoutPercent()
        )
        order.win = this.gain
        order.gain = order.order * this.payoutPercent()
        order.loss = ((order.order / this.bankroll) * 100) + this.lastLossOrZero()

        if (order.loss > 100) {
          break
        }
        this.insertOrder(order)
      }
    },
    lastOrder: function() {
      return this.orders.slice(-1).pop()
    },
    lastLossOrZero: function() {
      let lastOrder = this.lastOrder()
      let lastLoss = 0
      if (lastOrder !== undefined) {
        lastLoss = lastOrder.loss
      }
      return lastLoss
    },
    insertOrder: function(order) {
      let roundedOrder = {}
      for (let property in order) {
        roundedOrder[property] = this.round2(order[property])
      }
      this.orders.push(roundedOrder)
    },
    doOrder: function(options) {
      let order = this.orders.shift()
      if (options.win) {
        this.bankroll += order.gain
        this.doOrders()
      } else {
        this.bankroll -= order.order
      }
      this.bankroll = this.round2(this.bankroll)
      this.addToHistory(order, options.win)
    },
    addToHistory: function(order, win) {
      this.history.push({
        id: this.history.length,
        bankroll: this.bankroll,
        win: win,
        order: order,
      })
    },
    round2: function(number) {
      return Number(Number(number).toFixed(2))
    },
    payoutPercent: function() {
      return (this.payout / 100)
    },
    gainPercent: function() {
      return (this.gain / 100)
    },
    lastLossOrZeroPercent: function() {
      return (this.lastLossOrZero() / 100)
    },
  }
}
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
</style>
