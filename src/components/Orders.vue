<template>
  <table class="table table-responsive text-center">
    <thead class="thead-inverse">
      <tr>
        <th>Entrada</th>
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
          <td class="btn-group">
            <template v-if="isActualOrder(order.id)">
              <button class="btn btn-sm btn-success" v-on:click="doOrder({win:true})">
                +{{ order.win | round }}%
              </button>
              <button class="btn btn-sm btn-danger" v-on:click="doOrder({win:false})">
                -{{ order.loss | round }}%
              </button>
            </template>
            <template v-else>
              <button class="btn btn-sm btn-outline-success text-success" disabled>
                +{{ order.win | round }}%
              </button>
              <button class="btn btn-sm btn-outline-danger text-danger" disabled>
                -{{ order.loss | round }}%
              </button>
            </template>
          </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ts-orders',
  props: {
    orders: Array
  },
  methods: {
    doOrder: function(options) {
      if (options.win) {
        this.$emit('win')
      } else {
        this.$emit('lose')
      }
    },
    isActualOrder: function(idOrder) {
      return (
        idOrder === this.orders[0].id
      )
    },

  }
}
</script>
