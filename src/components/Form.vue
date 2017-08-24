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
      <div v-if="$parent.martingale.is">
        <label>Quantidade ordens?</label>
        <input class="form-control" type="number" v-model.number="$parent.martingale.quantity">
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
      this.$emit('doOrders')
    }
  }
}
</script>
