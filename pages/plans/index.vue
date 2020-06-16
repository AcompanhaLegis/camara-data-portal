<template>
  <main id="plans">
    <header class="title-holder">
      <h1>
        Planos de acesso
      </h1>
      <h3>Escolha o melhor plano para você ou sua empresa!</h3>
    </header>

    <section class="plans-holder">
      <subscription-plan-card
        v-for="p in plans"
        :key="p.id"
        :price="p.price"
        :title="p.title"
        :description="p.description"
      />
    </section>
  </main>
</template>

<script>
import SubscriptionPlanCard from '@/components/website/SubscriptionPlanCard';

export default {
  auth: false,
  components: {
    SubscriptionPlanCard
  },
  data() {
    return {
      plans: [
        {
          id: 1,
          price: 99,
          title: 'Plano mensal',
          description: 'Plano de assinatura mensal'
        },
        {
          id: 2,
          price: 79,
          title: 'Plano anual',
          description:
            'Plano de assinatura anual, receba um desconto de  R$ 240 neste plano'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.plans-holder {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-holder {
  text-align: center;
  margin-bottom: 40px;
  h1 {
    color: #1890ff;
    font-size: 3rem;
  }
}
</style>
