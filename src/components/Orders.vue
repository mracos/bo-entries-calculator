<template>
  <table class="table table-responsive text-center">
    <thead class="thead-primary">
      <tr>
        <th>
          <i class="fa fa-line-chart"></i>
        </th>
        <th>Ordem</th>
        <th>Retorno</th>
        <th>
          Win
          <i class="fa fa-angle-up"></i>
        </th>
        <th>
          Loss
          <i class="fa fa-angle-down"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders">
        <td>
          {{ order.id | plusOne }}
        </td>
        <td v-clipboard:copy="order.order">
          <strong>
            <kbd>$ {{ order.order }}</kbd>
          </strong>
          <button class="btn btn-sm btn-outline-dark" title="Clique para copiar!">
            <i class="fa fa-clipboard"></i>
          </button>
        </td>
        <td>
          <strong>
            <kbd>
              ${{ order.gain }}
            </kbd>
          </strong>
        </td>
        <template v-if="isActualOrder(order.id)">
          <td>
            <button class="btn btn-sm btn-success" @click="doOrder({win:true})">
              +{{ order.win }}%
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click="doOrder({win:false})">
              -{{ order.loss }}%
            </button>
          </td>
        </template>
        <template v-else>
          <td>
            <button class="btn btn-sm btn-outline-success text-success" disabled>
              +{{ order.win }}%
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-danger text-danger" disabled>
              -{{ order.loss }}%
            </button>
          </td>
        </template>
        </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

export default {
  name: 'ts-orders',
  props: {
    orders: Array
  },
  methods: {
    doOrder: function(options) {
      this.$emit('order', options)
    },
    isActualOrder: function(idOrder) {
      return (
        idOrder === this.orders[0].id
      )
    },

  }
}
</script>
