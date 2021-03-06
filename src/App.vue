<template>
  <div id="app">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">BO Entries Calculator</h3>
            <ts-form @doOrders="doOrders">
            </ts-form>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <vue-tabs
              v-model="actualTab"
              activeTabColor="#e5cc6a"
              activeTextColor="#013a57"
            >
              <v-tab title="Ordens">
                <ts-orders :orders="orders" @order="doOrder">
                </ts-orders>
              </v-tab>
              <v-tab title="Histórico" v-if="history.length > 0">
                <ts-history :history="history" @clear="clearHistory()">
                </ts-history>
              </v-tab>
            </vue-tabs>
          </div>
        </div>
      </div>
    </div>
    <p class="github">
      See on
      <a
        class="github__link"
        href="//github.com/mracos/bo-entries-calculator"
        target="_blank"
      >
        github
      </a>
    </p>
  </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs/dist/vue-tabs.js'
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
      martingale: {
        is: false,
        quantity: 3,
      },
      orders: [],
      history: [],
      actualTab: '',
    }
  },
  methods: {
    doOrders: function() {
      this.orders = []

      while (
        this.orders.length === 0
        || (
            this.martingale.is
            && this.orders.length < (this.martingale.quantity)
        )
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
    clearHistory: function() {
      this.actualTab = 'Ordens'
      this.history = []
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
  @import 'src/assets/fa/scss/font-awesome';

  @import "node_modules/bootstrap/scss/functions";
  @import "node_modules/bootstrap/scss/variables";
  @import "node_modules/bootstrap/scss/mixins";

  @import "node_modules/bootstrap/scss/reboot";
  @import "node_modules/bootstrap/scss/grid";
  @import "node_modules/bootstrap/scss/card";
  @import "node_modules/bootstrap/scss/tables";
  @import "node_modules/bootstrap/scss/buttons";
  @import "node_modules/bootstrap/scss/utilities";

  $primary: #013a57;
  $secondary: #e5cc6a;

  kbd.money {
    color: $primary;
    background-color: $secondary;
  }
  .btn-primary,
  .thead-primary {
    background-color: $primary;
    border-color: $primary;
    color: white;
  }

  .btn-primary:hover,
  .custom-control-input:checked {
    border-color: $secondary;
    background-color: $secondary;
    color: $primary;
  }

  .github {
    display: block;
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
  }

  .github__link {
    color: $primary;

    &:hover {
      color: $secondary;
      text-decoration: none;
    }
  }
</style>
