<template>
  <div>
    <div class="page-title">
      <h3>Категорії</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>

        <CategoryCreate @created="addNewCategory"/>

       <CategoryEdit
       v-if="categories.length" 
       :categories="categories"
       :key="categories.length + updateCount"
       @updated="updatedCategory"
       />

      <p v-else class="center">Нема створених категорій</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate, CategoryEdit
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updatedCategory(category) {
      const catIndex = this.categories.findIndex(cat => cat.id === category.id)
      this.categories[catIndex].title = category.title
      this.categories[catIndex].limit = category.limit
      this.updateCount++
    }
  }
}
</script>