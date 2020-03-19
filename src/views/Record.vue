<template>
  <div>
    <div class="page-title">
      <h3>Новий запис</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">Немає створених категорій.<router-link to="/categories">Добавити категорію</router-link></p>

    <form class="form" @submit.prevent="handleSubmit" v-else>
      <div class="input-field">
        <select 
        ref="select"
        v-model="category"
        >
          <option 
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
          >{{cat.title}}</option>
        </select>
        <label>Виберіть категорію</label>
      </div>

      <p>
        <label>
          <input 
          class="with-gap" 
          name="type" 
          type="radio" 
          value="income"
          v-model="type"
           />
          <span>Дохід</span>
        </label>
      </p>

      <p>
        <label>
          <input 
          class="with-gap" 
          name="type" 
          type="radio" 
          value="outcome" 
          v-model="type"/>
          <span>Розхід</span>
        </label>
      </p>

      <div class="input-field">
        <input 
        id="amount" 
        type="number"
        v-model.number="amount"
        :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сума</label>
        <span class="helper-text invalid" 
        v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Мінімальна величина
            {{$v.amount.$params.minValue.min}}
          </span>
      </div>

      <div class="input-field">
        <input 
        id="description" 
        type="text"
        v-model="description"
        :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Опис</label>
        <span class="helper-text invalid" 
        v-if="$v.description.$dirty && !$v.description.required">
            Введіть опис</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Створити
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
 import {required, minValue} from 'vuelidate/lib/validators'
 import {mapGetters} from 'vuex'

export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    category: null,
    categories: [],
    type: 'income',
    amount: 1,
    description: ''
  }),
  validations: {
      amount: {minValue: minValue(1)},
      description: {required}
    },
  computed: {
      ...mapGetters(['info']),
      canCreateRecord() {
        if (this.type === 'income') {
          return true
        }

        return this.info.bill >= this.amount
      }
    },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
      window.M.updateTextFields()
    }, 0)
    
  },
  methods: {
    async handleSubmit() {
       if(this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        if (this.canCreateRecord) {
          try {
            await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Створено новий запис')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
          } catch (e) {
            console.log(e)
          }
        } else {
          this.$message(`Недостатньо коштів на рахунку (${this.amount - this.info.bill})`)
        }
    }

    
  },
   destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }

}
</script>