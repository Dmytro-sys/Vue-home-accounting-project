<template>
  <div>
    <div class="page-title">
      <h3>Історія записів</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Немає створених записів.
      <router-link to="/record">Добавити новий запис</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords')
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Дохід' : 'Розхід',
      }
    })
    
    this.loading = false
  },
  components: {
    HistoryTable
  },
}
</script>