<template>
  <div>

    <Loader v-if="loading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">Історія</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Дохід' : 'Розхід'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div 
          class="card"
          :class="{
            'green': record.type === 'income',
            'red': record.type === 'outcome'
          }">
            <div class="card-content white-text">
              <p>Опис: {{record.description}}</p>
              <p>Сума: {{record.amount | currency}}</p>
              <p>Категорія: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else >Запис не знайдено.</p>

  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    record: null,
    category: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  },
}
</script>