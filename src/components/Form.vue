<template>
  <div class="form">
    <div class="form-group">
      <label>Banca</label>
      <div class="input-group">
        <div class="input-group-addon">$</div>
        <input class="form-control" type="number" min="0" placeholder="100" v-model.number="$parent.bankroll">
      </div>
      <label>Payout</label>
      <div class="input-group">
        <input class="form-control" type="number" min="1" max="100" placeholder="91" v-model.number="$parent.payout">
        <div class="input-group-addon">%</div>
      </div>
      <label>Retorno</label>
      <div class="input-group">
        <input class="form-control" type="number" min="1" placeholder="1" v-model.number="$parent.gain">
        <div class="input-group-addon">%</div>
      </div>
    </div>
    <div class="form-group">
      <label class="custom-control custom-checkbox">
        <input class="custom-control-input" type="checkbox" v-model.boolean="$parent.martingale.is">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">Martingale</span>
      </label>
      <div class="input-group" v-if="$parent.martingale.is" >
        <div class="input-group-addon">
          Qnt
        </div>
        <select
          class="custom-select form-control"
          v-model="$parent.martingale.quantity"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
    </div>
    <button class="btn btn-primary btn-block" @click="doOrders">Calcular Ordens</button>
  </div>
</template>

<script>
export default {
  name: 'ts-form',
  methods: {
    doOrders: function() {
      if (this.$parent.bankroll > 0) {
        this.$emit('doOrders')
      }
    }
  }
}
</script>
<style lang="scss">
  @import "node_modules/bootstrap/scss/functions";
  @import "node_modules/bootstrap/scss/variables";
  @import "node_modules/bootstrap/scss/mixins";

  @import "node_modules/bootstrap/scss/forms";
  @import "node_modules/bootstrap/scss/input-group";
  @import "node_modules/bootstrap/scss/custom-forms";
</style>
