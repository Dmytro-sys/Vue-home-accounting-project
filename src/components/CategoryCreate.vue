<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Створити</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
          <label for="name">Назва</label>
          <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">
            Введіть назву категорії</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
          <label for="limit">Ліміт</label>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Мінімальна величина
            {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Створити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {
    required,
    minValue
  } from 'vuelidate/lib/validators'

  export default {
    data: () => ({
      title: '',
      limit: 50
    }),
    validations: {
      title: {
        required
      },
      limit: {
        minValue: minValue(50)
      }
    },
    mounted() {
      window.M.updateTextFields()
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          const category = await this.$store.dispatch('createCategory', {
            title: this.title,
            limit: this.limit
          })
          
          this.title = ''
          this.limit = 50
          this.$v.$reset()
          this.$message('Категорія створена')
          this.$emit('created', category)
          
        } catch (error) {
          console.log(error);
        }

      }
    },
  }
</script>