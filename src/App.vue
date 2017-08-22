<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="card-block">
              <h3 class="card-title">Trading System</h3>
              <div class="form">
                <div class="form-group">
                  <label>Banca</label>
                  <div class="input-group">
                    <div class="input-group-addon">$</div>
                    <input class="form-control" type="number" min="0" placeholder="100" v-model.number="bankroll">
                  </div>
                  <label>Payout</label>
                  <div class="input-group">
                    <input class="form-control" type="number" min="1" max="100" placeholder="91" v-model.number="payout">
                    <div class="input-group-addon">%</div>
                  </div>
                  <label>Retorno</label>
                  <div class="input-group">
                    <input class="form-control" type="number" min="1" placeholder="1" v-model.number="gain">
                    <div class="input-group-addon">%</div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="custom-control custom-checkbox">
                    <input class="custom-control-input" type="checkbox" v-model="isMartingale">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">Martingale</span>
                  </label>
                </div>
                <button class="btn btn-primary btn-block" v-on:click="doOrders">Calcular Ordens</button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-block">
              <table class="table table-responsive text-center">
                <thead class="thead-inverse">
                  <tr>
                    <th>Ordem</th>
                    <th>Retorno</th>
                    <th>Win / Loss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders">
                    <td>
                      ${{ order.order | round }}
                    </td>
                    <td>
                      ${{ order.gain | round }}
                    </td>
                    <template v-if="isActualOrder(order.id)">
                      <td class="btn-group">
                        <button class="btn btn-sm btn-outline-success" v-on:click="winOrder">
                          +{{ order.win | round }}%
                        </button>
                        <button class="btn btn-sm btn-outline-danger" v-on:click="loseOrder">
                          -{{ order.loss | round }}%
                        </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <span class="badge badge-success">+{{ order.win | round }}%</span>
                        <span class="badge badge-danger">-{{ order.loss | round }}%</span>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      payout: 90,
      gain: 1,
      isMartingale: false,
      orders: []
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
          (this.gainPercent() + (this.lastLossOrZero() / 100)) / this.payoutPercent()
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
    isActualOrder: function(idOrder) {
      return (
        idOrder === this.orders[0].id
      )
    },
    insertOrder: function(order) {
      let roundedOrder = {}
      for (let property in order) {
        roundedOrder[property] = this.round2(order[property])
      }
      this.orders.push(roundedOrder)
    },
    winOrder: function() {
      let order = this.orders.shift()
      this.bankroll += order.gain
      this.bankroll = this.round2(
        this.bankroll
      )
      this.doOrders()
    },
    loseOrder: function() {
      let order = this.orders.shift()
      this.bankroll -= order.order
      this.bankroll = this.round2(
        this.bankroll
      )
    },
    round2: function(number) {
      return Number(Number(number).toFixed(2))
    },
    payoutPercent: function() {
      return (this.payout / 100)
    },
    gainPercent: function() {
      return (this.gain / 100)
    }
  }
}
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
</style>
