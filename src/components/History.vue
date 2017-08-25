<template>
  <div>
    <table class="table table-responsive text-center">
      <thead class="thead-primary">
        <tr>
          <th>
            <i class="fa fa-line-chart"></i>
          </th>
          <th>Banca</th>
          <th>Retorno</th>
          <th>
            Win <i class="fa fa-angle-up"></i>
            Loss <i class="fa fa-angle-down"></i>
          </th>
          <th>
            Martingale?
            <i class="fa fa-refresh"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <paginate
          name="history"
          :list="this.history"
          :per="6"
          tag=""
          ></paginate>
        <tr
          v-for="order in paginated('history')"
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
            <td>
              <div v-if="order.order.id > 0">
                <span class="badge badge-success">
                  Sim
                </span>
                <span class="badge badge-warning">
                  {{ order.order.id | plusOne }}º
                </span>
              </div>
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
      <paginate-links
        for="history"
        :hide-single-page="true"
        :limit="3"
        :classes="{
          'ul': ['pagination', 'justify-content-center'],
          'ul > li': 'page-item',
          'ul > li > a': 'page-link',
        }"
        ></paginate-links>
      <span v-if="$refs.paginator">
        Vendo {{ $refs.paginator.pageItemCount }} ordens
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)

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
      },
      paginate: ['history']
    }
  }
}
</script>

<style>
</style>
