<template>
  <a-card hoverable class="subscription-plan-card">
    <section class="prices">
      <h3>R$</h3>
      <h2>{{ price }}</h2>
    </section>
    <a-card-meta :title="title">
      <div class="description" slot="description">
        {{ description }}
      </div>
    </a-card-meta>
    <a-button block type="primary">Assine agora!</a-button>
  </a-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.subscription-plan-card {
  width: 300px;
  height: 320px;
  text-align: center;
  margin: 20px;
  .prices {
    display: flex;
    align-items: flex-end;
    margin: 20px auto;
    width: fit-content;
    h3 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    h2 {
      font-size: 4rem;
      margin: 0;
    }
  }
  .description {
    height: 50px;
  }
  button {
    margin-top: 30px;
  }
}
</style>
