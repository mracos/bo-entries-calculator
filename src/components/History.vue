<template>
  <table class="table table-responsive text-center">
    <thead class="thead-primary">
      <tr>
        <th>Operação</th>
        <th>Banca</th>
        <th>Retorno</th>
        <th>Win / Loss</th>
        <th>Martingale?</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order in history"
        :class="orderClass(order)"
      >
        <td>
          <strong>
            {{ order.id | plusOne }}
          </strong>
        </td>
        <td>
          ${{ order.bankroll }}
        </td>
        <template v-if="order.win">
          <td>
            +${{ order.order.gain }}
          </td>
          <td>
            +{{ order.order.win }}%
          </td>
          <td v-if="order.order.id > 0">
            <span class="badge badge-success">
              Sim
            </span>
            <span class="badge badge-warning">
              {{ order.order.id | plusOne }}º
            </span>
          </td>
        </template>
        <template v-else>
          <td>
            -${{ order.order.order }}
          </td>
          <td>
            -{{ order.order.loss }}%
          </td>
          <td>
            <span class="badge badge-danger" v-if="order.order.id === 2">
              HIT
            </span>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ts-history',
  props: {
    history: Array,
  },
  data() {
    return {
      orderClass: (order) => {
        return {
          'text-success': order.win,
          'text-danger': !order.win
        }
      }
    }
  }
}
</script>

<style>
</style>
